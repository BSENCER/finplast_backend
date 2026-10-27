import hashlib
import json
from datetime import timedelta
from pathlib import Path
from typing import Annotated

from fastapi import Depends, FastAPI, File, HTTPException, Query, Request, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import delete, func, select
from sqlalchemy.orm import selectinload
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.core.config import get_settings
from app.core.deps import DbSession, admin_user, current_user, resolve_language
from app.core.security import create_token, decode_token, hash_password, verify_password
from app.db import Base, engine
from app.models import Category, CategoryTranslation, Language, Lead, NavItem, NavTranslation, Product, ProductTranslation, SiteSetting, UiString, User
from app.schemas import CategoryIn, LanguageOut, LeadCreate, LeadOut, LeadStatusIn, LoginRequest, NavItemIn, NavReorderIn, NavigationOut, ProductAdminOut, ProductIn, ProductOut, SettingIn, TokenResponse, TranslationResponse, UiStringIn, UserCreate, UserOut, UserUpdate

settings = get_settings()
app = FastAPI(title="Fin-Plast International API", version="1.0.0")
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origin_list, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

upload_path = Path(settings.upload_dir)
upload_path.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=upload_path), name="uploads")


@app.on_event("startup")
async def startup() -> None:
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)


def localized_translation(translations: list, lang: str, default: str):
    return next((item for item in translations if item.lang == lang), next((item for item in translations if item.lang == default), None))


@app.exception_handler(HTTPException)
async def http_error_handler(_, exc: HTTPException) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail, "code": "http_error"})


@app.get("/api/v1/health", tags=["system"])
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/v1/languages", response_model=list[LanguageOut], tags=["i18n"])
async def languages(db: DbSession):
    return (await db.scalars(select(Language).where(Language.is_active.is_(True)).order_by(Language.display_order))).all()


@app.get("/api/v1/translations", response_model=TranslationResponse, tags=["i18n"])
async def translations(db: DbSession, language: Annotated[tuple[str, str], Depends(resolve_language)]):
    lang, default = language
    rows = (await db.scalars(select(UiString).where(UiString.lang.in_([lang, default])))).all()
    values = {row.key: row.value for row in rows if row.lang == default}
    values.update({row.key: row.value for row in rows if row.lang == lang})
    response = JSONResponse({"lang": lang, "translations": values})
    response.headers["Cache-Control"] = "public, max-age=60"
    response.headers["ETag"] = hashlib.sha256(json.dumps(values, sort_keys=True).encode()).hexdigest()
    return response


@app.post("/api/v1/auth/login", response_model=TokenResponse, tags=["auth"])
@limiter.limit(settings.login_rate_limit)
async def login(request: Request, payload: LoginRequest, db: DbSession):
    user = await db.scalar(select(User).where(User.username == payload.username, User.is_active.is_(True)))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return TokenResponse(
        access_token=create_token(user.username, "access", timedelta(minutes=settings.access_token_minutes)),
        refresh_token=create_token(user.username, "refresh", timedelta(days=settings.refresh_token_days)),
    )


@app.post("/api/v1/auth/refresh", response_model=TokenResponse, tags=["auth"])
async def refresh(token: str, db: DbSession):
    username = decode_token(token, "refresh")
    user = await db.scalar(select(User).where(User.username == username, User.is_active.is_(True))) if username else None
    if not user:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    return TokenResponse(access_token=create_token(user.username, "access", timedelta(minutes=settings.access_token_minutes)), refresh_token=token)


@app.post("/api/v1/auth/logout", status_code=204, tags=["auth"])
async def logout(_: Annotated[User, Depends(current_user)]):
    return None


@app.get("/api/v1/auth/me", response_model=UserOut, tags=["auth"])
async def me(user: Annotated[User, Depends(current_user)]):
    return user


@app.get("/api/v1/navigation", response_model=list[NavigationOut], tags=["navigation"])
async def navigation(db: DbSession, location: str = "header", language: Annotated[tuple[str, str], Depends(resolve_language)] = None):
    lang, default = language
    items = (await db.scalars(select(NavItem).options(selectinload(NavItem.translations)).where(NavItem.location == location, NavItem.is_visible.is_(True)).order_by(NavItem.display_order))).all()
    flat = []
    for item in items:
        translation = localized_translation(item.translations, lang, default)
        if translation:
            flat.append(NavigationOut(id=item.id, url=item.url, title=translation.title, parent_id=item.parent_id, order=item.display_order, is_visible=item.is_visible, location=item.location, open_in_new_tab=item.open_in_new_tab))
    by_parent: dict[int | None, list[NavigationOut]] = {}
    for item in flat:
        by_parent.setdefault(item.parent_id, []).append(item)
    def tree(parent_id: int | None) -> list[NavigationOut]:
        result = []
        for item in by_parent.get(parent_id, []):
            item.children = tree(item.id)
            result.append(item)
        return result
    return tree(None)


@app.get("/api/v1/categories", tags=["catalog"])
async def categories(db: DbSession, language: Annotated[tuple[str, str], Depends(resolve_language)]):
    lang, default = language
    rows = (await db.scalars(select(Category).options(selectinload(Category.translations)).where(Category.is_active.is_(True)).order_by(Category.id))).all()
    result = []
    for category in rows:
        translation = localized_translation(category.translations, lang, default)
        if translation:
            result.append({"id": category.id, "slug": category.slug, "title": translation.title, "description": translation.description, "image": category.image, "lang": lang})
    return result


@app.post("/api/v1/admin/navigation", status_code=201, tags=["admin"], dependencies=[Depends(admin_user)])
async def create_navigation(payload: NavItemIn, db: DbSession):
    item = NavItem(url=payload.url, parent_id=payload.parent_id, display_order=payload.order, is_visible=payload.is_visible, location=payload.location, open_in_new_tab=payload.open_in_new_tab)
    item.translations = [NavTranslation(lang=lang, title=translation.title) for lang, translation in payload.translations.items()]
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return {"id": item.id, **payload.model_dump()}


@app.put("/api/v1/admin/navigation/{item_id}", tags=["admin"], dependencies=[Depends(admin_user)])
async def update_navigation(item_id: int, payload: NavItemIn, db: DbSession):
    item = await db.scalar(select(NavItem).options(selectinload(NavItem.translations)).where(NavItem.id == item_id))
    if not item:
        raise HTTPException(status_code=404, detail="Navigation item not found")
    item.url, item.parent_id, item.display_order = payload.url, payload.parent_id, payload.order
    item.is_visible, item.location, item.open_in_new_tab = payload.is_visible, payload.location, payload.open_in_new_tab
    item.translations.clear()
    item.translations.extend(NavTranslation(lang=lang, title=translation.title) for lang, translation in payload.translations.items())
    await db.commit()
    return {"id": item.id, **payload.model_dump()}


@app.delete("/api/v1/admin/navigation/{item_id}", status_code=204, tags=["admin"], dependencies=[Depends(admin_user)])
async def delete_navigation(item_id: int, db: DbSession):
    item = await db.get(NavItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Navigation item not found")
    await db.delete(item)
    await db.commit()


@app.patch("/api/v1/admin/navigation/reorder", status_code=204, tags=["admin"], dependencies=[Depends(admin_user)])
async def reorder_navigation(payload: NavReorderIn, db: DbSession):
    items = (await db.scalars(select(NavItem).where(NavItem.id.in_(payload.ids)))).all()
    by_id = {item.id: item for item in items}
    for order, item_id in enumerate(payload.ids):
        if item_id in by_id:
            by_id[item_id].display_order = order
    await db.commit()


@app.post("/api/v1/admin/categories", status_code=201, tags=["admin"], dependencies=[Depends(admin_user)])
async def create_category(payload: CategoryIn, db: DbSession):
    category = Category(slug=payload.slug, image=payload.image, is_active=payload.is_active)
    category.translations = [CategoryTranslation(lang=lang, title=data.get("title", ""), description=data.get("description", "")) for lang, data in payload.translations.items()]
    db.add(category)
    await db.commit()
    await db.refresh(category)
    return {"id": category.id, **payload.model_dump()}


@app.put("/api/v1/admin/categories/{category_id}", tags=["admin"], dependencies=[Depends(admin_user)])
async def update_category(category_id: int, payload: CategoryIn, db: DbSession):
    category = await db.scalar(select(Category).options(selectinload(Category.translations)).where(Category.id == category_id))
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    category.slug, category.image, category.is_active = payload.slug, payload.image, payload.is_active
    category.translations.clear()
    category.translations.extend(CategoryTranslation(lang=lang, title=data.get("title", ""), description=data.get("description", "")) for lang, data in payload.translations.items())
    await db.commit()
    return {"id": category.id, **payload.model_dump()}


@app.delete("/api/v1/admin/categories/{category_id}", status_code=204, tags=["admin"], dependencies=[Depends(admin_user)])
async def delete_category(category_id: int, db: DbSession):
    category = await db.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    await db.delete(category)
    await db.commit()


@app.get("/api/v1/settings", tags=["settings"])
async def settings_public(db: DbSession, language: Annotated[tuple[str, str], Depends(resolve_language)]):
    lang, default = language
    rows = (await db.scalars(select(SiteSetting).where(SiteSetting.lang.in_([lang, default])))).all()
    values = {row.key: row.value for row in rows if row.lang == default}
    values.update({row.key: row.value for row in rows if row.lang == lang})
    return {"lang": lang, "settings": values}


@app.get("/api/v1/products", response_model=list[ProductOut], tags=["catalog"])
async def products(db: DbSession, language: Annotated[tuple[str, str], Depends(resolve_language)], search: str | None = None, category: str | None = None, skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=100)):
    lang, default = language
    query = select(Product).options(selectinload(Product.translations), selectinload(Product.category)).where(Product.is_active.is_(True), Product.deleted_at.is_(None))
    if category:
        query = query.join(Category).where(Category.slug == category)
    rows = (await db.scalars(query.order_by(Product.id).offset(skip).limit(limit))).all()
    result = []
    for product in rows:
        translation = localized_translation(product.translations, lang, default)
        if translation and (not search or search.lower() in translation.title.lower() or search.lower() in translation.description.lower()):
            result.append(ProductOut(id=product.id, slug=product.slug, category=product.category.slug if product.category else None, title=translation.title, description=translation.description, specs=json.loads(translation.specs or "[]"), price=product.price, image=product.image, is_featured=product.is_featured, lang=lang))
    return result


@app.get("/api/v1/products/{slug}", response_model=ProductOut, tags=["catalog"])
async def product(slug: str, db: DbSession, language: Annotated[tuple[str, str], Depends(resolve_language)]):
    lang, default = language
    item = await db.scalar(select(Product).options(selectinload(Product.translations), selectinload(Product.category)).where(Product.slug == slug, Product.deleted_at.is_(None)))
    if not item:
        raise HTTPException(status_code=404, detail="Product not found")
    translation = localized_translation(item.translations, lang, default)
    if not translation:
        raise HTTPException(status_code=404, detail="Product translation not found")
    return ProductOut(id=item.id, slug=item.slug, category=item.category.slug if item.category else None, title=translation.title, description=translation.description, specs=json.loads(translation.specs or "[]"), price=item.price, image=item.image, is_featured=item.is_featured, lang=lang)


@app.post("/api/v1/leads", response_model=LeadOut, status_code=201, tags=["leads"])
@limiter.limit(settings.public_form_rate_limit)
async def create_lead(request: Request, payload: LeadCreate, db: DbSession, language: Annotated[tuple[str, str], Depends(resolve_language)]):
    lead = Lead(**payload.model_dump(), lang=language[0])
    db.add(lead)
    await db.commit()
    await db.refresh(lead)
    return lead


@app.get("/api/v1/admin/leads", response_model=list[LeadOut], tags=["admin"], dependencies=[Depends(admin_user)])
async def admin_leads(db: DbSession):
    return (await db.scalars(select(Lead).order_by(Lead.created_at.desc()))).all()


@app.delete("/api/v1/admin/leads/{lead_id}", status_code=204, tags=["admin"], dependencies=[Depends(admin_user)])
async def delete_lead(lead_id: int, db: DbSession):
    result = await db.execute(delete(Lead).where(Lead.id == lead_id))
    if not result.rowcount:
        raise HTTPException(status_code=404, detail="Lead not found")
    await db.commit()


@app.patch("/api/v1/admin/leads/{lead_id}/status", response_model=LeadOut, tags=["admin"], dependencies=[Depends(admin_user)])
async def update_lead_status(lead_id: int, payload: LeadStatusIn, db: DbSession):
    lead = await db.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    lead.status = payload.status
    await db.commit()
    await db.refresh(lead)
    return lead


@app.get("/api/v1/admin/users", response_model=list[UserOut], tags=["admin"], dependencies=[Depends(admin_user)])
async def admin_users(db: DbSession):
    return (await db.scalars(select(User).order_by(User.username))).all()


@app.post("/api/v1/admin/users", response_model=UserOut, status_code=201, tags=["admin"], dependencies=[Depends(admin_user)])
async def create_user(payload: UserCreate, db: DbSession):
    if await db.scalar(select(User).where(User.username == payload.username)):
        raise HTTPException(status_code=409, detail="Username already exists")
    user = User(username=payload.username, password_hash=hash_password(payload.password), role=payload.role)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@app.patch("/api/v1/admin/users/{user_id}", response_model=UserOut, tags=["admin"], dependencies=[Depends(admin_user)])
async def update_user(user_id: int, payload: UserUpdate, db: DbSession):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    data = payload.model_dump(exclude_unset=True)
    if data.get("password"):
        user.password_hash = hash_password(data.pop("password"))
    for key, value in data.items():
        setattr(user, key, value)
    await db.commit()
    await db.refresh(user)
    return user


@app.post("/api/v1/admin/products", response_model=ProductAdminOut, status_code=201, tags=["admin"], dependencies=[Depends(admin_user)])
async def create_product(payload: ProductIn, db: DbSession):
    product = Product(slug=payload.slug, category_id=payload.category_id, price=payload.price, image=payload.image, is_active=payload.is_active, is_featured=payload.is_featured)
    for lang, translation in payload.translations.items():
        product.translations.append(ProductTranslation(lang=lang, title=translation.title, description=translation.description, specs=json.dumps(translation.specs), seo_title=translation.seo_title, seo_description=translation.seo_description))
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return ProductAdminOut(id=product.id, **payload.model_dump())


@app.get("/api/v1/admin/products", response_model=list[ProductAdminOut], tags=["admin"], dependencies=[Depends(admin_user)])
async def admin_products(db: DbSession):
    rows = (await db.scalars(select(Product).options(selectinload(Product.translations)).where(Product.deleted_at.is_(None)).order_by(Product.id))).all()
    result = []
    for product in rows:
        result.append(ProductAdminOut(id=product.id, slug=product.slug, category_id=product.category_id, price=product.price, image=product.image, is_active=product.is_active, is_featured=product.is_featured, translations={translation.lang: {"title": translation.title, "description": translation.description, "specs": json.loads(translation.specs or "[]"), "seo_title": translation.seo_title, "seo_description": translation.seo_description} for translation in product.translations}))
    return result


@app.put("/api/v1/admin/products/{product_id}", response_model=ProductAdminOut, tags=["admin"], dependencies=[Depends(admin_user)])
async def update_product(product_id: int, payload: ProductIn, db: DbSession):
    product = await db.scalar(select(Product).options(selectinload(Product.translations)).where(Product.id == product_id))
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.slug, product.category_id, product.price, product.image = payload.slug, payload.category_id, payload.price, payload.image
    product.is_active, product.is_featured = payload.is_active, payload.is_featured
    product.translations.clear()
    for lang, translation in payload.translations.items():
        product.translations.append(ProductTranslation(lang=lang, title=translation.title, description=translation.description, specs=json.dumps(translation.specs), seo_title=translation.seo_title, seo_description=translation.seo_description))
    await db.commit()
    return ProductAdminOut(id=product.id, **payload.model_dump())


@app.delete("/api/v1/admin/products/{product_id}", status_code=204, tags=["admin"], dependencies=[Depends(admin_user)])
async def delete_product(product_id: int, db: DbSession):
    product = await db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.deleted_at = func.now()
    product.is_active = False
    await db.commit()


@app.post("/api/v1/admin/languages", response_model=LanguageOut, status_code=201, tags=["admin"], dependencies=[Depends(admin_user)])
async def create_language(payload: LanguageOut, db: DbSession):
    language = Language(**payload.model_dump())
    db.add(language)
    await db.commit()
    return language


@app.put("/api/v1/admin/ui-strings", response_model=UiStringIn, tags=["admin"], dependencies=[Depends(admin_user)])
async def upsert_ui_string(payload: UiStringIn, db: DbSession):
    item = await db.scalar(select(UiString).where(UiString.key == payload.key, UiString.lang == payload.lang))
    if item:
        item.value = payload.value
    else:
        item = UiString(**payload.model_dump())
        db.add(item)
    await db.commit()
    return payload


@app.put("/api/v1/admin/settings", response_model=SettingIn, tags=["admin"], dependencies=[Depends(admin_user)])
async def upsert_setting(payload: SettingIn, db: DbSession):
    item = await db.scalar(select(SiteSetting).where(SiteSetting.key == payload.key, SiteSetting.lang == payload.lang))
    if item:
        item.value = payload.value
    else:
        item = SiteSetting(**payload.model_dump())
        db.add(item)
    await db.commit()
    return payload


@app.post("/api/v1/media/upload", tags=["media"], dependencies=[Depends(admin_user)])
async def upload_media(file: UploadFile = File(...)):
    allowed = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "model/gltf-binary": ".glb", "model/gltf+json": ".gltf", "application/octet-stream": ".obj"}
    extension = Path(file.filename or "").suffix.lower()
    if file.content_type not in allowed or extension not in {".jpg", ".jpeg", ".png", ".webp", ".glb", ".gltf", ".obj"}:
        raise HTTPException(status_code=415, detail="Unsupported media type")
    data = await file.read()
    if len(data) > settings.max_upload_bytes:
        raise HTTPException(status_code=413, detail="File is too large")
    filename = f"{hashlib.sha256(data).hexdigest()[:24]}{extension}"
    (upload_path / filename).write_bytes(data)
    return {"url": f"/uploads/{filename}", "filename": filename}


@app.get("/api/v1/media", tags=["media"], dependencies=[Depends(admin_user)])
async def list_media():
    return [{"filename": item.name, "url": f"/uploads/{item.name}", "size": item.stat().st_size} for item in sorted(upload_path.iterdir()) if item.is_file()]


@app.delete("/api/v1/media/{filename}", status_code=204, tags=["media"], dependencies=[Depends(admin_user)])
async def delete_media(filename: str):
    candidate = (upload_path / filename).resolve()
    if candidate.parent != upload_path.resolve() or not candidate.is_file():
        raise HTTPException(status_code=404, detail="Media not found")
    candidate.unlink()
