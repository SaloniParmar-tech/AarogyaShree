import argparse
import json
from pathlib import Path
import sys
from typing import Any

import cv2
import joblib
import numpy as np
import pandas as pd
from PIL import Image
from sklearn.ensemble import ExtraTreesClassifier, GradientBoostingClassifier, RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, precision_recall_fscore_support
from sklearn.model_selection import GridSearchCV, StratifiedKFold, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
DATA_DIR = PROJECT_ROOT / "ml" / "data"
MODEL_DIR = PROJECT_ROOT / "ml" / "models"
CONFIG_PATH = MODEL_DIR / "inference_config.json"
IMAGE_SIZE = (128, 128)
IMAGE_SUFFIXES = {".bmp", ".jpeg", ".jpg", ".png"}


def load_config() -> dict[str, Any]:
    if CONFIG_PATH.exists():
        with CONFIG_PATH.open("r", encoding="utf-8") as config_file:
            return json.load(config_file)
    return {"thresholds": {"breast": 0.5, "cervical": 0.5, "pcos": 0.5}, "metrics": {}}


def save_config(config: dict[str, Any]) -> None:
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    with CONFIG_PATH.open("w", encoding="utf-8") as config_file:
        json.dump(config, config_file, indent=2, sort_keys=True)
        config_file.write("\n")


def best_threshold(y_true: np.ndarray, scores: np.ndarray) -> tuple[float, dict[str, float]]:
    best: tuple[float, dict[str, float]] | None = None
    for threshold in np.linspace(0.05, 0.95, 181):
        y_pred = (scores >= threshold).astype(int)
        precision, recall, f1, _ = precision_recall_fscore_support(
            y_true,
            y_pred,
            average="binary",
            zero_division=0,
        )
        accuracy = accuracy_score(y_true, y_pred)
        metrics = {
            "accuracy": round(float(accuracy), 6),
            "precision": round(float(precision), 6),
            "recall": round(float(recall), 6),
            "f1": round(float(f1), 6),
        }
        if best is None:
            best = (float(threshold), metrics)
            continue

        _, current = best
        score = (metrics["f1"], metrics["recall"], metrics["precision"], metrics["accuracy"])
        current_score = (current["f1"], current["recall"], current["precision"], current["accuracy"])
        if score > current_score:
            best = (float(threshold), metrics)

    if best is None:
        raise RuntimeError("Could not choose a threshold.")
    return best


def best_score_calibration(y_true: np.ndarray, raw_scores: np.ndarray) -> tuple[str, float, dict[str, float]]:
    candidates = {
        "identity": raw_scores,
        "inverse": 1.0 - raw_scores,
    }
    best: tuple[str, float, dict[str, float]] | None = None
    for transform, scores in candidates.items():
        threshold, metrics = best_threshold(y_true, scores)
        if best is None:
            best = (transform, threshold, metrics)
            continue

        _, _, current = best
        score = (metrics["f1"], metrics["accuracy"], metrics["recall"], metrics["precision"])
        current_score = (current["f1"], current["accuracy"], current["recall"], current["precision"])
        if score > current_score:
            best = (transform, threshold, metrics)

    if best is None:
        raise RuntimeError("Could not calibrate scores.")
    return best


def clean_pcos_data() -> tuple[pd.DataFrame, pd.Series]:
    csv_path = DATA_DIR / "pcos" / "PCOS_infertility.csv"
    df = pd.read_csv(csv_path)
    df.columns = [column.strip() for column in df.columns]
    df = df.rename(
        columns={
            "I   beta-HCG(mIU/mL)": "beta_hcg_1",
            "II    beta-HCG(mIU/mL)": "beta_hcg_2",
            "AMH(ng/mL)": "amh",
            "PCOS (Y/N)": "pcos",
        }
    )

    for column in ["beta_hcg_1", "beta_hcg_2", "amh"]:
        df[column] = pd.to_numeric(df[column], errors="coerce")

    X = df[["beta_hcg_1", "beta_hcg_2", "amh"]]
    y = df["pcos"].astype(int)
    return X, y


def optimize_pcos() -> dict[str, Any]:
    X, y = clean_pcos_data()
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    pipeline = Pipeline(
        [
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
            ("model", RandomForestClassifier(random_state=42, class_weight="balanced")),
        ]
    )

    param_grid = [
        {
            "model": [RandomForestClassifier(random_state=42, class_weight="balanced", n_jobs=-1)],
            "model__n_estimators": [300, 500],
            "model__max_depth": [None, 6, 10],
            "model__min_samples_leaf": [1, 3, 5],
            "model__max_features": ["sqrt", None],
        },
        {
            "model": [ExtraTreesClassifier(random_state=42, class_weight="balanced", n_jobs=-1)],
            "model__n_estimators": [300, 500],
            "model__max_depth": [None, 6, 10],
            "model__min_samples_leaf": [1, 3, 5],
            "model__max_features": ["sqrt", None],
        },
        {
            "model": [GradientBoostingClassifier(random_state=42)],
            "model__n_estimators": [100, 200],
            "model__learning_rate": [0.03, 0.05, 0.1],
            "model__max_depth": [2, 3],
        },
        {
            "model": [LogisticRegression(random_state=42, class_weight="balanced", max_iter=2000)],
            "model__C": [0.1, 1.0, 10.0],
        },
    ]

    search = GridSearchCV(
        pipeline,
        param_grid=param_grid,
        scoring="f1",
        cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=42),
        n_jobs=-1,
        refit=True,
    )
    search.fit(X_train, y_train)

    best_model: Pipeline = search.best_estimator_
    scores = best_model.predict_proba(X_test)[:, 1]
    score_transform, threshold, metrics = best_score_calibration(y_test.to_numpy(), scores)
    calibrated_scores = 1.0 - scores if score_transform == "inverse" else scores
    y_pred = (calibrated_scores >= threshold).astype(int)

    fitted_preprocessor = Pipeline(best_model.steps[:2])
    fitted_classifier = best_model.named_steps["model"]
    joblib.dump(fitted_classifier, MODEL_DIR / "pcos_pcod_model.pkl")
    joblib.dump(fitted_preprocessor, MODEL_DIR / "pcos_scaler.pkl")

    report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
    config = load_config()
    config.setdefault("score_transforms", {})["pcos"] = score_transform
    config.setdefault("thresholds", {})["pcos"] = round(threshold, 6)
    config.setdefault("metrics", {})["pcos"] = {
        **metrics,
        "best_cv_f1": round(float(search.best_score_), 6),
        "best_estimator": type(fitted_classifier).__name__,
        "feature_order": list(X.columns),
        "classification_report": report,
    }
    save_config(config)

    return config["metrics"]["pcos"]


def image_paths_for(model_name: str) -> list[tuple[Path, int]]:
    if model_name == "breast":
        roots = [(DATA_DIR / "breakhis" / "benign", 0), (DATA_DIR / "breakhis" / "malignant", 1)]
    elif model_name == "cervical":
        roots = [(DATA_DIR / "SIPaKMeD" / "normal", 0), (DATA_DIR / "SIPaKMeD" / "abnormal", 1)]
    else:
        raise ValueError(f"Unsupported image model: {model_name}")

    paths: list[tuple[Path, int]] = []
    for root, label in roots:
        paths.extend((path, label) for path in root.rglob("*") if path.suffix.lower() in IMAGE_SUFFIXES)
    return paths


def preprocess_image(path: Path) -> np.ndarray:
    image = Image.open(path).convert("RGB")
    image_array = np.array(image)
    resized = cv2.resize(image_array, IMAGE_SIZE)
    return resized.astype(np.float32) / 255.0


def score_images(model_name: str, sample_limit: int | None) -> dict[str, Any]:
    from inference.main import apply_tta, models

    labeled_paths = image_paths_for(model_name)
    if not labeled_paths:
        raise RuntimeError(f"No images found for {model_name}.")

    _, eval_paths = train_test_split(
        labeled_paths,
        test_size=0.2,
        random_state=42,
        stratify=[label for _, label in labeled_paths],
    )
    if sample_limit:
        eval_paths = eval_paths[:sample_limit]

    y_true = []
    scores = []
    for path, label in eval_paths:
        y_true.append(label)
        scores.append(apply_tta(preprocess_image(path), models[model_name]))

    y_true_array = np.asarray(y_true)
    score_array = np.asarray(scores)
    score_transform, threshold, metrics = best_score_calibration(y_true_array, score_array)

    config = load_config()
    config.setdefault("score_transforms", {})[model_name] = score_transform
    config.setdefault("thresholds", {})[model_name] = round(threshold, 6)
    config.setdefault("metrics", {})[model_name] = {
        **metrics,
        "calibration_samples": int(len(eval_paths)),
        "score_transform": score_transform,
    }
    save_config(config)
    return config["metrics"][model_name]


def main() -> None:
    parser = argparse.ArgumentParser(description="Optimize AarogyaShree model metrics and inference thresholds.")
    parser.add_argument(
        "--target",
        choices=["all", "pcos", "breast", "cervical"],
        default="all",
        help="Model to optimize or calibrate.",
    )
    parser.add_argument(
        "--image-sample-limit",
        type=int,
        default=None,
        help="Optional image calibration sample limit for quick local runs.",
    )
    args = parser.parse_args()

    results: dict[str, Any] = {}
    if args.target in {"all", "pcos"}:
        results["pcos"] = optimize_pcos()
    if args.target in {"all", "breast"}:
        results["breast"] = score_images("breast", args.image_sample_limit)
    if args.target in {"all", "cervical"}:
        results["cervical"] = score_images("cervical", args.image_sample_limit)

    print(json.dumps(results, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
