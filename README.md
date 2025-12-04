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

## Setup & Running (Local)  
### Requirements  
- Node.js & npm (for frontend)  
- Python 3.x (for backend)  
- Docker & docker-compose (optional, but recommended)  

### Commands  

```bash
# Clone repo
git clone https://github.com/SaloniParmar-tech/AarogyaShree.git
cd AarogyaShree

# Run backend (with Python + FastAPI)  
cd backend  
python -m venv venv  
.\venv\Scripts\activate        # (Windows)  
pip install -r requirements.txt  
uvicorn app.main:app --reload  
cd ..

# Run frontend  
cd frontend  
npm install  
npm start

# (Optional) Run everything via docker  
docker-compose up --build

---

## 📘 docs/architecture.md (mini draft)  

```markdown
# Architecture — AarogyaShree

## High-Level Components

- **Frontend** — React / PWA / RN: UI for camera, questionnaire, result page.  
- **Backend API Server** — FastAPI (or Express): handles image uploads, inference requests, questionnaire submission, report generation, authentication.  
- **Model Module** — pre-trained / training code in `model/`, used by backend (or optionally exported for client-side inference).  
- **Database** — user & questionnaire data, image metadata, logs, referrals — PostgreSQL (or MongoDB).  
- **Storage** — images & model artifacts stored in S3 (or MinIO / local storage) for scalability & persistence.  
- **Infrastructure** — Docker / docker-compose for local dev & reproducible setup; config for deployment.  
- **Optional Extras** — background task queue for heavy processing (Celery / Redis), offline-first support on frontend (service worker / caching / sync), analytics & logging, authentication.

## Data / Request Flow (simplified)

User → Frontend (capture image + questionnaire) → Frontend uploads image → Backend stores image → Frontend sends inference request to backend → Backend loads model → Backend returns inference result → Frontend shows result + user fills questionnaire → Frontend sends questionnaire data → Backend computes combined risk + referral → Backend saves record → Frontend displays report + referral suggestion.

