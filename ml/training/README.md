# AarogyaShree Model Optimization

This folder contains a reproducible optimization script for the trained models.

Run from the repository root:

```powershell
python ml/training/optimize_models.py --target pcos
python ml/training/optimize_models.py --target breast --image-sample-limit 300
python ml/training/optimize_models.py --target cervical --image-sample-limit 300
```

Use `--target all` to optimize PCOS and calibrate both image model thresholds in one run.

The script improves deployment metrics by:

- tuning PCOS classifiers with stratified cross-validation
- optimizing decision thresholds for F1, with recall and precision as tie-breakers
- writing calibrated thresholds to `ml/models/inference_config.json`
- saving refreshed PCOS model artifacts locally as `ml/models/pcos_pcod_model.pkl` and `ml/models/pcos_scaler.pkl`

Model binaries and datasets are intentionally ignored by Git, so rerun this script after pulling the repository on a new machine.
