from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware
# --------------------------------------------------
# FastAPI App
# --------------------------------------------------

app = FastAPI(
    title="AarogyaShree AI Inference API",
    description="ML APIs for Breast Cancer, Cervical Cancer, and PCOS/PCOD Detection",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (safe for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Base directory
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# --------------------------------------------------
# Load ML models
# --------------------------------------------------

# Breast Cancer (CNN)
BREAST_MODEL_PATH = os.path.join(BASE_DIR, "../ml/models/breast_cancer_cnn.h5")
breast_model = tf.keras.models.load_model(BREAST_MODEL_PATH, compile=False)

# Cervical Cancer (CNN)
CERVICAL_MODEL_PATH = os.path.join(BASE_DIR, "../ml/models/cervical_cancer_cnn.h5")
cervical_model = tf.keras.models.load_model(CERVICAL_MODEL_PATH, compile=False)

# PCOS / PCOD (ML)
PCOS_MODEL_PATH = os.path.join(BASE_DIR, "../ml/models/pcos_pcod_model.pkl")
PCOS_SCALER_PATH = os.path.join(BASE_DIR, "../ml/models/pcos_scaler.pkl")

pcos_model = joblib.load(PCOS_MODEL_PATH)
pcos_scaler = joblib.load(PCOS_SCALER_PATH)

# --------------------------------------------------
# Root Endpoint
# --------------------------------------------------

@app.get("/")
def root():
    return {"message": "AarogyaShree AI API is running"}

# --------------------------------------------------
# Request Schemas
# --------------------------------------------------

class PCOSInput(BaseModel):
    features: list  # numeric feature list

class ImageInput(BaseModel):
    image: list  # flattened image array

# --------------------------------------------------
# PCOS / PCOD Prediction API
# --------------------------------------------------

@app.post("/predict/pcos", tags=["PCOS/PCOD"])
def predict_pcos(data: PCOSInput):
    X = np.array(data.features).reshape(1, -1)
    X_scaled = pcos_scaler.transform(X)
    prediction = pcos_model.predict(X_scaled)[0]

    return {
        "PCOS_Prediction": int(prediction),
        "Result": "PCOS Detected" if prediction == 1 else "No PCOS"
    }

# --------------------------------------------------
# Breast Cancer Prediction API
# --------------------------------------------------

@app.post("/predict/breast", tags=["Breast Cancer"])
def predict_breast(data: ImageInput):
    img = np.array(data.image)
    img = img.reshape(1, *img.shape, 1) / 255.0

    prediction = breast_model.predict(img)[0][0]

    return {
        "Probability": float(prediction),
        "Result": "Malignant" if prediction > 0.5 else "Benign"
    }

# --------------------------------------------------
# Cervical Cancer Prediction API
# --------------------------------------------------

@app.post("/predict/cervical", tags=["Cervical Cancer"])
def predict_cervical(data: ImageInput):
    img = np.array(data.image)
    img = img.reshape(1, *img.shape, 1) / 255.0

    prediction = cervical_model.predict(img)[0][0]

    return {
        "Probability": float(prediction),
        "Result": "Cancer Detected" if prediction > 0.5 else "Normal"
    }
