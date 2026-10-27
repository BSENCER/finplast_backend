import os

os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///./test_finplast.db"
os.environ["SECRET_KEY"] = "test-secret"

from fastapi.testclient import TestClient

from app.main import app
from seed import seed


def test_core_api():
    import asyncio

    asyncio.run(seed())
    with TestClient(app) as client:
        assert client.get("/api/v1/health").status_code == 200
        assert client.get("/api/v1/languages").status_code == 200
        login = client.post("/api/v1/auth/login", json={"username": "admin", "password": "finplast2026"})
        assert login.status_code == 200
        headers = {"Authorization": f"Bearer {login.json()['access_token']}"}
        assert client.get("/api/v1/auth/me", headers=headers).status_code == 200
        assert client.get("/api/v1/navigation?lang=ru").status_code == 200
        assert client.get("/api/v1/categories?lang=en").json()
        assert client.get("/api/v1/products?lang=en").json()
        assert client.get("/api/v1/settings?lang=az").json()["settings"]["companyName"]
        assert client.get("/api/v1/admin/products", headers=headers).status_code == 200
        lead = client.post("/api/v1/leads?lang=en", json={"name": "Test", "phone": "+994000000000"})
        assert lead.status_code == 201
        lead_id = lead.json()["id"]
        assert client.patch(f"/api/v1/admin/leads/{lead_id}/status", headers=headers, json={"status": "contacted"}).status_code == 200
