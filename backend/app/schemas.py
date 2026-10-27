from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class LanguageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    code: str
    name: str
    native_name: str
    is_default: bool
    is_active: bool
    display_order: int


class TranslationResponse(BaseModel):
    lang: str
    translations: dict[str, str]


class SettingIn(BaseModel):
    key: str = Field(min_length=1, max_length=160)
    lang: str = Field(min_length=2, max_length=10)
    value: str = Field(max_length=10000)


class LoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=80)
    password: str = Field(min_length=1, max_length=200)


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    role: str
    is_active: bool


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    company: str = Field(default="", max_length=200)
    phone: str = Field(min_length=3, max_length=60)
    source: str = Field(default="website", max_length=200)
    note: str = Field(default="", max_length=5000)


class LeadOut(LeadCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    lang: str
    status: str
    created_at: datetime


class ProductOut(BaseModel):
    id: int
    slug: str
    category: str | None
    title: str
    description: str
    specs: list[str]
    price: float | None
    image: str | None
    is_featured: bool
    lang: str


class ProductTranslationIn(BaseModel):
    title: str = Field(min_length=1, max_length=300)
    description: str = Field(default="", max_length=10000)
    specs: list[str] = Field(default_factory=list, max_length=30)
    seo_title: str = Field(default="", max_length=300)
    seo_description: str = Field(default="", max_length=10000)


class ProductIn(BaseModel):
    slug: str = Field(min_length=1, max_length=160, pattern=r"^[a-z0-9][a-z0-9-]*$")
    category_id: int | None = None
    price: float | None = Field(default=None, ge=0)
    image: str | None = Field(default=None, max_length=500)
    is_active: bool = True
    is_featured: bool = False
    translations: dict[str, ProductTranslationIn]


class ProductAdminOut(ProductIn):
    id: int


class CategoryIn(BaseModel):
    slug: str = Field(min_length=1, max_length=100, pattern=r"^[a-z0-9][a-z0-9-]*$")
    image: str | None = Field(default=None, max_length=500)
    is_active: bool = True
    translations: dict[str, dict[str, str]]


class NavTranslationIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)


class NavItemIn(BaseModel):
    url: str = Field(min_length=1, max_length=500)
    parent_id: int | None = None
    order: int = Field(default=0, ge=0)
    is_visible: bool = True
    location: str = Field(default="header", max_length=20)
    open_in_new_tab: bool = False
    translations: dict[str, NavTranslationIn]


class NavReorderIn(BaseModel):
    ids: list[int] = Field(min_length=1, max_length=500)


class LeadStatusIn(BaseModel):
    status: str = Field(pattern=r"^(new|contacted|completed)$")


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=80, pattern=r"^[a-zA-Z0-9_.-]+$")
    password: str = Field(min_length=8, max_length=200)
    role: str = Field(default="manager", pattern=r"^(admin|manager)$")


class UserUpdate(BaseModel):
    password: str | None = Field(default=None, min_length=8, max_length=200)
    role: str | None = Field(default=None, pattern=r"^(admin|manager)$")
    is_active: bool | None = None


class NavigationOut(BaseModel):
    id: int
    url: str
    title: str
    parent_id: int | None
    order: int
    is_visible: bool
    location: str
    open_in_new_tab: bool
    children: list["NavigationOut"] = []


class UiStringIn(BaseModel):
    key: str = Field(min_length=1, max_length=160)
    lang: str = Field(min_length=2, max_length=10)
    value: str = Field(max_length=10000)


class ErrorResponse(BaseModel):
    detail: str
    code: str = "error"
