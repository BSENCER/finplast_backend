from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class Language(Base):
    __tablename__ = "languages"
    code: Mapped[str] = mapped_column(String(10), primary_key=True)
    name: Mapped[str] = mapped_column(String(80))
    native_name: Mapped[str] = mapped_column(String(80))
    is_default: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0)


class UiString(Base):
    __tablename__ = "ui_strings"
    id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(String(160), index=True)
    lang: Mapped[str] = mapped_column(ForeignKey("languages.code"), index=True)
    value: Mapped[str] = mapped_column(Text)
    __table_args__ = (UniqueConstraint("key", "lang"),)


class SiteSetting(Base):
    __tablename__ = "site_settings"
    id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(String(160), index=True)
    lang: Mapped[str] = mapped_column(ForeignKey("languages.code"), index=True)
    value: Mapped[str] = mapped_column(Text, default="")
    __table_args__ = (UniqueConstraint("key", "lang"),)


class NavItem(Base):
    __tablename__ = "navigation"
    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[str] = mapped_column(String(500))
    parent_id: Mapped[int | None] = mapped_column(ForeignKey("navigation.id"), nullable=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0, index=True)
    is_visible: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    location: Mapped[str] = mapped_column(String(20), default="header", index=True)
    open_in_new_tab: Mapped[bool] = mapped_column(Boolean, default=False)
    translations: Mapped[list["NavTranslation"]] = relationship(cascade="all, delete-orphan")


class NavTranslation(Base):
    __tablename__ = "navigation_translations"
    id: Mapped[int] = mapped_column(primary_key=True)
    nav_id: Mapped[int] = mapped_column(ForeignKey("navigation.id", ondelete="CASCADE"), index=True)
    lang: Mapped[str] = mapped_column(ForeignKey("languages.code"), index=True)
    title: Mapped[str] = mapped_column(String(200))
    __table_args__ = (UniqueConstraint("nav_id", "lang"),)


class Category(Base):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    image: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    translations: Mapped[list["CategoryTranslation"]] = relationship(cascade="all, delete-orphan")


class CategoryTranslation(Base):
    __tablename__ = "category_translations"
    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id", ondelete="CASCADE"), index=True)
    lang: Mapped[str] = mapped_column(ForeignKey("languages.code"), index=True)
    title: Mapped[str] = mapped_column(String(240))
    description: Mapped[str] = mapped_column(Text, default="")
    __table_args__ = (UniqueConstraint("category_id", "lang"),)


class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    category_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"), nullable=True, index=True)
    price: Mapped[float | None] = mapped_column(Float, nullable=True)
    image: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    category: Mapped[Category | None] = relationship()
    translations: Mapped[list["ProductTranslation"]] = relationship(cascade="all, delete-orphan")


class ProductTranslation(Base):
    __tablename__ = "product_translations"
    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), index=True)
    lang: Mapped[str] = mapped_column(ForeignKey("languages.code"), index=True)
    title: Mapped[str] = mapped_column(String(300))
    description: Mapped[str] = mapped_column(Text, default="")
    specs: Mapped[str] = mapped_column(Text, default="[]")
    seo_title: Mapped[str] = mapped_column(String(300), default="")
    seo_description: Mapped[str] = mapped_column(Text, default="")
    __table_args__ = (UniqueConstraint("product_id", "lang"),)


class Lead(Base):
    __tablename__ = "leads"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(160))
    company: Mapped[str] = mapped_column(String(200), default="")
    phone: Mapped[str] = mapped_column(String(60))
    source: Mapped[str] = mapped_column(String(200), default="website")
    note: Mapped[str] = mapped_column(Text, default="")
    lang: Mapped[str] = mapped_column(String(10), default="az")
    status: Mapped[str] = mapped_column(String(40), default="new", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(20), default="manager")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
