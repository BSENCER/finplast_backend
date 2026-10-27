from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import get_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_token(subject: str, token_type: str, expires_delta: timedelta) -> str:
    now = datetime.now(timezone.utc)
    payload = {"sub": subject, "type": token_type, "iat": now, "exp": now + expires_delta}
    return jwt.encode(payload, get_settings().secret_key, algorithm="HS256")


def decode_token(token: str, expected_type: str) -> str | None:
    try:
        payload = jwt.decode(token, get_settings().secret_key, algorithms=["HS256"])
        if payload.get("type") != expected_type:
            return None
        return str(payload["sub"])
    except (JWTError, KeyError, TypeError):
        return None
