# AI Interview Platform

A modern, scalable monorepo for an AI-powered mock interview and candidate evaluation platform.

---

## 🏗️ Architecture Overview

```
ai-interview-platform/
├── backend/                  # FastAPI + Python backend
│   ├── app/
│   │   ├── api/v1/          # REST API route handlers
│   │   │   ├── endpoints/   # Health check & interview endpoints
│   │   │   └── api.py       # Master API router
│   │   ├── core/            # Config, async database & Redis clients
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic validation schemas
│   │   └── main.py          # FastAPI application entrypoint
│   ├── Dockerfile           # Backend container definition
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Backend environment configuration
├── frontend/                 # React + TypeScript + Vite + Tailwind CSS
│   ├── src/                 # UI components, status dashboard, views
│   ├── Dockerfile           # Frontend container definition
│   ├── package.json         # Node dependencies & scripts
│   └── vite.config.ts       # Vite + Tailwind v4 build configuration
├── docker-compose.yml        # Multi-service orchestration (Postgres, Redis, Backend, Frontend)
├── .gitignore               # Multi-language ignore rules (Python, Node, Docker, IDEs)
└── README.md
```

---

## 🚀 One-Command Local Run (Recommended)

Run the entire platform (PostgreSQL, Redis, FastAPI backend, and React frontend) with a single command:

```bash
docker compose up --build
```

### 🌐 Service Endpoints

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend UI** | [http://localhost:5173](http://localhost:5173) | Interactive React + Tailwind Dashboard |
| **Backend API** | [http://localhost:8000](http://localhost:8000) | Root API endpoint |
| **API Docs (Swagger)** | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive OpenAPI documentation |
| **API Docs (ReDoc)** | [http://localhost:8000/redoc](http://localhost:8000/redoc) | Alternative API documentation |
| **Health Check** | [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health) | Live DB & Redis connectivity status |
| **PostgreSQL** | `localhost:5432` | Relational database (`ai_interview_db`) |
| **Redis** | `localhost:6379` | In-memory cache & queue |

To stop all services:
```bash
docker compose down
```

---

## 💻 Native Local Development (Without full Docker)

If you prefer developing natively with hot reloading:

### 1. Start Database & Cache Services
Run only PostgreSQL and Redis in Docker:
```bash
docker compose up postgres redis -d
```

### 2. Run Backend (FastAPI)
```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI with live reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Run Frontend (React + Vite)
```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

The frontend will be live at `http://localhost:5173` and automatically proxy/connect to the backend at `http://localhost:8000`.

---

## ⚙️ Environment Variables

Copy example configuration files if you need custom settings:

```bash
# Root
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

---

## 🧪 Testing API Endpoints

You can verify the backend is connected to Postgres and Redis using `curl` or PowerShell:

```bash
curl http://localhost:8000/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "app": "AI Interview Platform",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "redis": "connected"
  },
  "timestamp": "2026-09-01T15:45:00.000000+00:00"
}
```

---

## 📄 License
MIT
