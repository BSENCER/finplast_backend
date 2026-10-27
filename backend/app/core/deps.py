from typing import Annotated

from fastapi import Depends, Header, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.models import Language, User
from app.core.security import decode_token

Bearer = HTTPBearer(auto_error=False)
DbSession = Annotated[AsyncSession, Depends(get_db)]


async def resolve_language(
    db: DbSession,
    requested: str | None = Query(default=None, alias="lang"),
    accept_language: str | None = Header(default=None),
) -> tuple[str, str]:
    active = (await db.scalars(select(Language).where(Language.is_active.is_(True)).order_by(Language.display_order))).all()
    if not active:
        return "az", "az"
    available = {language.code for language in active}
    default = next((language.code for language in active if language.is_default), active[0].code)
    candidates = [requested] if requested else []
    if accept_language:
        candidates.extend(part.split(";", 1)[0].strip().lower() for part in accept_language.split(","))
    for candidate in candidates:
        if candidate in available:
            return candidate, default
        if candidate and candidate.split("-", 1)[0] in available:
            return candidate.split("-", 1)[0], default
    return default, default


async def current_user(
    db: DbSession,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(Bearer)],
) -> User:
    subject = decode_token(credentials.credentials, "access") if credentials else None
    if not subject:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing access token")
    user = await db.scalar(select(User).where(User.username == subject, User.is_active.is_(True)))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not active")
    return user


async def admin_user(user: Annotated[User, Depends(current_user)]) -> User:
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin role required")
    return user
