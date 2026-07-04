# EduPress API

FastAPI backend for EduPress v2.

## Setup

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

Default API URL: http://localhost:8000

## PostgreSQL

Create a local database named `edupress`, then update `DATABASE_URL` in `.env` if your credentials differ.
