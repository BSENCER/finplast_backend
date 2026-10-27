from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment or backend/.env."""

    database_url: str = "sqlite+aiosqlite:///./finplast.db"
    secret_key: str = "change-this-secret"
    access_token_minutes: int = 30
    refresh_token_days: int = 14
    cors_origins: str = "http://localhost:5501,http://127.0.0.1:5501"
    admin_username: str = "admin"
    admin_password: str = "finplast2026"
    serve_frontend: bool = False
    upload_dir: str = "uploads"
    max_upload_bytes: int = 10 * 1024 * 1024
    login_rate_limit: str = "5/minute"
    public_form_rate_limit: str = "10/minute"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
