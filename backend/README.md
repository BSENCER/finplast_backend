# Fin-Plast backend

FastAPI backend for the existing static Fin-Plast frontend. The frontend markup and CSS remain unchanged. The public API uses `az`, `en`, and `ru` and falls back to the default language (`az`) when a translation is missing.

## Run

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python seed.py
uvicorn app.main:app --reload
```

API docs: `http://127.0.0.1:8000/docs`. Set `DATABASE_URL` only in `.env`; SQLite is the development default and PostgreSQL can be enabled with `postgresql+asyncpg://...` after installing `asyncpg`.

## API

All endpoints are under `/api/v1`. Public endpoints include health, languages, translations, navigation, categories, settings, products, product details, and lead creation. Admin endpoints require a JWT bearer token from `/auth/login` and cover products, categories, navigation/reorder, leads/status, users, UI strings, settings, and media. Login and public lead creation are rate-limited. The first admin, navigation, catalog seed data, translations, and contact settings are created by `seed.py` from `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

Product slugs are shared across languages because the existing frontend routes use one `product.html?id=...` identifier. Product and navigation translations are stored in separate tables. Language selection priority is query `?lang=`, then `Accept-Language`, then the default language.

## Migrations and media

The initial Alembic revision creates all tables. Run `alembic upgrade head` for deployments; `python seed.py` remains the convenient local bootstrap. Uploaded media is written to `uploads/`, uses content hashes for names, and is served from `/uploads/...`.
