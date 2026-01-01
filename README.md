# AarogyaShree Project

## Overview  
AarogyaShree is a full-stack health-screening web/mobile application designed to provide early risk detection for diseases (via image + questionnaire), enable referrals, and support low-resource environments.  
It supports image capture (camera), questionnaire submission, model-based inference (local or server), and risk reporting — aiming to make screening accessible even in low-connectivity or rural settings.

## Tech Stack  
- **Frontend:** React (or React Native / PWA), React Router, Axios / fetch, i18n (for multilingual support), optional TFJS or ONNX Web for on-device inference.  
- **Backend:** FastAPI (or Express.js), REST API endpoints (inference, upload, questionnaire, report), PostgreSQL (or MongoDB), storage for images (S3 / MinIO), JWT-based auth, background task handling optional.  
- **Model:** CNN-based (or lightweight model) — stored in `model/`, exportable for server-side or optional client-side inference.  
- **Dev / Infra:** Docker & docker-compose for reproducible environment, linting & formatting tools (ESLint / Prettier / black / flake8), unit & integration tests, CI (GitHub Actions).

## Repository Structure  
AarogyaShree/
├─ README.md
├─ docs/ # documentation: architecture, setup, viva-talk script
├─ frontend/ # React (or RN) application
├─ backend/ # API server + business logic
├─ model/ # ML model, preprocessing & export artifacts
├─ infra/ # Docker / deployment / config
├─ tests/ # automated tests (frontend & backend)
└─ scripts/ # helper scripts (e.g. seed DB, run demo)


## Features (so far / planned)  
- Camera-based image capture (for screening)  
- Questionnaire UI (multilingual)  
- REST APIs: image upload, inference, questionnaire submission, result retrieval  
- Combined risk report (image + questionnaire) with referral suggestion  
- (Future) Offline-first support + sync for rural/low-connectivity areas  
- (Future) Client-side inference (TFJS or ONNX) for on-device screening  
- Admin dashboard with logs, referrals, image history, anonymization & privacy compliance  

