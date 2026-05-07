from io import BytesIO
import json
from pathlib import Path
from typing import Any

import cv2
import h5py
import joblib
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from pydantic import BaseModel, Field, validator
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import BatchNormalization, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Sequential


APP_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = APP_DIR.parent
MODEL_DIR = PROJECT_ROOT / "ml" / "models"
IMAGE_SIZE = (128, 128)
DEFAULT_THRESHOLDS = {
    "breast": 0.5,
    "cervical": 0.5,
    "pcos": 0.5,
}


app = FastAPI(
    title="AarogyaShree AI Inference API",
    description="Inference endpoints for breast cancer, cervical cancer, and PCOS/PCOD screening models.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FixDepthwiseConv2D(tf.keras.layers.DepthwiseConv2D):
    """Compatibility shim for older Keras MobileNet-style saved models."""

    def __init__(self, **kwargs: Any):
        kwargs.pop("groups", None)
        super().__init__(**kwargs)


class PCOSInput(BaseModel):
    features: list[float] = Field(
        ...,
        min_length=1,
        description="Numeric feature vector in the same order used while training the PCOS model.",
        examples=[[28, 62, 1, 0, 14.2, 2.1, 1, 0]],
    )

    @validator("features")
    def features_must_be_finite(cls, value: list[float]) -> list[float]:
        if not np.isfinite(value).all():
            raise ValueError("All PCOS features must be finite numeric values.")
        return value


class ImagePrediction(BaseModel):
    probability: float
    prediction: int
    result: str
    note: str


class PCOSPrediction(BaseModel):
    prediction: int
    result: str


def require_file(path: Path) -> Path:
    if not path.exists():
        raise RuntimeError(f"Required model file was not found: {path}")
    return path


def build_breast_model() -> Sequential:
    base_model = ResNet50(weights=None, include_top=False, input_shape=(128, 128, 3))
    base_model.trainable = False
    model = Sequential(
        [
            base_model,
            GlobalAveragePooling2D(),
            BatchNormalization(),
            Dense(256, activation="relu"),
            Dropout(0.5),
            Dense(1, activation="sigmoid"),
        ]
    )
    load_legacy_h5_weights_by_path(model, require_file(MODEL_DIR / "breast_cancer_cnn.h5"))
    return model


def load_legacy_h5_weights_by_path(model: tf.keras.Model, model_path: Path) -> None:
    """Load older Keras H5 weights into Keras 3 by matching variable paths."""

    with h5py.File(model_path, "r") as h5_file:
        model_weights = h5_file["model_weights"]
        saved_weights: dict[str, np.ndarray] = {}

        for layer_name in model_weights.attrs["layer_names"]:
            layer_group = model_weights[layer_name]
            for weight_name in layer_group.attrs.get("weight_names", []):
                normalized_name = str(weight_name).replace(":0", "")
                saved_weights[normalized_name] = layer_group[weight_name][()]

        loaded_count = 0
        for weight in model.weights:
            weight_path = getattr(weight, "path", weight.name).replace("sequential/", "")
            saved_value = saved_weights.get(weight_path)
            if saved_value is None or tuple(weight.shape) != saved_value.shape:
                raise RuntimeError(f"Could not load breast model weight: {weight_path}")
            weight.assign(saved_value)
            loaded_count += 1

    if loaded_count != len(model.weights):
        raise RuntimeError("Breast model weights were not fully loaded.")


def load_models() -> dict[str, Any]:
    return {
        "breast": build_breast_model(),
        "cervical": tf.keras.models.load_model(
            require_file(MODEL_DIR / "cervical_cancer_cnn.h5"),
            compile=False,
            custom_objects={"DepthwiseConv2D": FixDepthwiseConv2D},
        ),
        "pcos": joblib.load(require_file(MODEL_DIR / "pcos_pcod_model.pkl")),
        "pcos_scaler": joblib.load(require_file(MODEL_DIR / "pcos_scaler.pkl")),
    }


models = load_models()


def load_inference_config() -> dict[str, Any]:
    config_path = MODEL_DIR / "inference_config.json"
    if not config_path.exists():
        return {"score_transforms": {}, "thresholds": DEFAULT_THRESHOLDS}

    with config_path.open("r", encoding="utf-8") as config_file:
        config = json.load(config_file)

    thresholds = DEFAULT_THRESHOLDS | config.get("thresholds", {})
    return {**config, "score_transforms": config.get("score_transforms", {}), "thresholds": thresholds}


inference_config = load_inference_config()


def threshold_for(model_name: str) -> float:
    return float(inference_config["thresholds"].get(model_name, DEFAULT_THRESHOLDS[model_name]))


def calibrated_score(model_name: str, score: float) -> float:
    transform = inference_config.get("score_transforms", {}).get(model_name, "identity")
    if transform == "inverse":
        return 1.0 - score
    return score


def model_score(predictions: np.ndarray) -> float:
    values = np.asarray(predictions)
    if values.ndim > 1 and values.shape[-1] > 1:
        return float(np.mean(values[..., 1]))
    return float(np.mean(values))


def apply_tta(image: np.ndarray, model: Any) -> float:
    batch = np.asarray(
        [
            image,
            cv2.flip(image, 1),
            cv2.flip(image, 0),
            cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE),
        ],
        dtype=np.float32,
    )
    return model_score(model.predict(batch, verbose=0))


async def read_image(file: UploadFile) -> np.ndarray:
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Upload must be an image file.")

    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Uploaded image is empty.")

    try:
        image = Image.open(BytesIO(contents)).convert("RGB")
    except UnidentifiedImageError as exc:
        raise HTTPException(status_code=400, detail="Could not read uploaded image.") from exc

    image_array = np.array(image)
    resized = cv2.resize(image_array, IMAGE_SIZE)
    return resized.astype(np.float32) / 255.0


def image_response(score: float, threshold: float, positive_label: str, negative_label: str) -> ImagePrediction:
    prediction = int(score > threshold)
    return ImagePrediction(
        probability=round(score, 6),
        prediction=prediction,
        result=positive_label if prediction else negative_label,
        note=f"Evaluated with test-time augmentation at threshold {threshold:.3f}.",
    )


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "AarogyaShree AI API is running. Open /docs to test the inference endpoints."}


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "models_loaded": {
            "breast": models["breast"] is not None,
            "cervical": models["cervical"] is not None,
            "pcos": models["pcos"] is not None and models["pcos_scaler"] is not None,
        },
        "thresholds": inference_config["thresholds"],
    }


@app.post("/predict/pcos", response_model=PCOSPrediction, tags=["PCOS Assessment"])
def predict_pcos(data: PCOSInput) -> PCOSPrediction:
    features = np.asarray(data.features, dtype=np.float32).reshape(1, -1)

    try:
        scaled_features = models["pcos_scaler"].transform(features)
        if hasattr(models["pcos"], "predict_proba"):
            score = calibrated_score("pcos", float(models["pcos"].predict_proba(scaled_features)[0][1]))
            prediction = int(score > threshold_for("pcos"))
        else:
            prediction = int(models["pcos"].predict(scaled_features)[0])
    except ValueError as exc:
        expected = getattr(models["pcos_scaler"], "n_features_in_", "the trained feature count")
        raise HTTPException(
            status_code=422,
            detail=f"Invalid PCOS feature vector. Expected {expected} features.",
        ) from exc

    return PCOSPrediction(
        prediction=prediction,
        result="PCOS Detected" if prediction == 1 else "No PCOS",
    )


@app.post("/predict/breast", response_model=ImagePrediction, tags=["Breast Cancer Screening"])
async def predict_breast(file: UploadFile = File(...)) -> ImagePrediction:
    image = await read_image(file)
    score = calibrated_score("breast", apply_tta(image, models["breast"]))
    return image_response(
        score,
        threshold=threshold_for("breast"),
        positive_label="Malignant",
        negative_label="Benign",
    )


@app.post("/predict/cervical", response_model=ImagePrediction, tags=["Cervical Cancer Screening"])
async def predict_cervical(file: UploadFile = File(...)) -> ImagePrediction:
    image = await read_image(file)
    score = calibrated_score("cervical", apply_tta(image, models["cervical"]))
    return image_response(
        score,
        threshold=threshold_for("cervical"),
        positive_label="Abnormal",
        negative_label="Normal",
    )
