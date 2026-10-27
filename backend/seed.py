import asyncio
import json

from sqlalchemy import select

from app.core.config import get_settings
from app.core.security import hash_password
from app.db import Base, SessionLocal, engine
from app.models import Category, CategoryTranslation, Language, NavItem, NavTranslation, Product, ProductTranslation, SiteSetting, UiString, User


async def seed() -> None:
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    async with SessionLocal() as db:
        for code, name, native, is_default, order in [
            ("az", "Azerbaijani", "Azərbaycan dili", True, 1),
            ("en", "English", "English", False, 2),
            ("ru", "Russian", "Русский", False, 3),
        ]:
            language = await db.get(Language, code)
            if not language:
                db.add(Language(code=code, name=name, native_name=native, is_default=is_default, display_order=order))
        settings = get_settings()
        user = await db.scalar(select(User).where(User.username == settings.admin_username))
        if not user:
            db.add(User(username=settings.admin_username, password_hash=hash_password(settings.admin_password), role="admin"))
        existing_nav = await db.scalar(select(NavItem).limit(1))
        if not existing_nav:
            navigation = [
                ("catalog.html", 1), ("#workflow", 2), ("#certificates", 3),
                ("#contact", 4), ("#quoteSection", 5),
            ]
            titles = {
                "az": ["Məhsullar", "İstehsal və Keyfiyyət", "Sertifikatlar", "Bizimlə əlaqə (Haqqımızda)", "Sifariş blankı"],
                "en": ["Products", "Manufacturing & Quality", "Certificates", "Contact Us (About)", "Order Form"],
                "ru": ["Продукты", "Производство и качество", "Сертификаты", "Связаться с нами", "Форма заказа"],
            }
            for index, (url, order) in enumerate(navigation):
                item = NavItem(url=url, display_order=order, location="header")
                item.translations = [NavTranslation(lang=lang, title=values[index]) for lang, values in titles.items()]
                db.add(item)
        existing_category = await db.scalar(select(Category).limit(1))
        if not existing_category:
            category_data = [
                ("transport", "assets/images/finplast_direction_transport.jpg", {"az": ("Nəqliyyat Qablaşdırması", "Streç plyonkalar və qoruyucu logistika materialları."), "en": ("Transport Packaging", "Stretch films and protective logistics materials."), "ru": ("Транспортная упаковка", "Стретч-пленки и защитные материалы для логистики.")}),
                ("consumer", "assets/images/finplast_direction_consumer.jpg", {"az": ("İstehlakçı Qablaşdırması", "Qida və gündəlik məhsullar üçün çoxqatlı paketlər."), "en": ("Consumer Packaging", "Multi-layer pouches for food and consumer goods."), "ru": ("Потребительская упаковка", "Многослойные пакеты для продуктов и товаров народного потребления.")}),
                ("chemical", "assets/images/finplast_direction_chemical.jpg", {"az": ("Kimyəvi Həllər", "Texniki polimer və mastika qablaşdırmaları."), "en": ("Chemical Solutions", "Technical polymer and sealant packaging."), "ru": ("Химические решения", "Техническая полимерная упаковка и упаковка герметиков.")}),
                ("labels", "assets/images/finplast_direction_labels.jpg", {"az": ("Etiket və Şrink", "PET və şüşə qablar üçün termo-şrink həlləri."), "en": ("Labels and Sleeves", "Shrink sleeve solutions for PET and glass containers."), "ru": ("Этикетки и термоусадка", "Термоусадочные решения для ПЭТ и стеклянной тары.")}),
            ]
            for slug, image, translations in category_data:
                category = Category(slug=slug, image=image)
                category.translations = [CategoryTranslation(lang=lang, title=title, description=description) for lang, (title, description) in translations.items()]
                db.add(category)
        await db.flush()
        existing_product = await db.scalar(select(Product).limit(1))
        if not existing_product:
            product_data = [
                ("finplast-transport-stretch", "transport", "assets/images/finplast_direction_transport.jpg", {"az": ("Finplast Super-Stretch 23µm Palet Plyonkası", "Avtomat və əl ilə qablaşdırma üçün yüksək dartılmalı şəffaf polietilen streç film.", ["Qalınlıq: 17-23 mikron", "Dartılma: 300%-ə qədər"]), "en": ("Finplast Super-Stretch 23µm Pallet Film", "High-performance transparent polyethylene stretch film for automated and manual wrapping.", ["Thickness: 17-23 micron", "Stretch: up to 300%"]), "ru": ("Finplast Super-Stretch 23 мкм", "Прозрачная полиэтиленовая стретч-пленка для ручной и автоматической упаковки.", ["Толщина: 17-23 мкм", "Растяжение: до 300%"])}),
                ("finplast-doypack", "consumer", "assets/images/products/finplast_standup_pouch_white.jpg", {"az": ("Finplast Doypack Zip-Lock Paket", "Qida məhsulları üçün hermetik zip-lock və yüksək baryerli çoxqatlı paket.", ["3 qatlı laminasiya", "Zip-lock və lazer açılma"]), "en": ("Finplast Doypack Zip-Lock Pouch", "High-barrier multi-layer pouch with hermetic zip-lock for food products.", ["3-ply lamination", "Zip-lock and easy tear"]), "ru": ("Пакет Finplast Doypack Zip-Lock", "Многослойный пакет с высоким барьером и герметичным zip-lock для продуктов.", ["3-слойная ламинация", "Zip-lock и легкое открытие"])}),
                ("finplast-shrink-label", "labels", "assets/images/finplast_direction_labels.jpg", {"az": ("Finplast 360° Termo-Şrink Etiket", "PET və plastik şüşələr üçün canlı rəngli 360 dərəcə termo-şrink etiket.", ["8 rəngli HD flekso", "PET-G / PVC film"]), "en": ("Finplast 360° Shrink Sleeve Label", "Vivid 360-degree shrink sleeve labels for PET and plastic bottles.", ["8-color HD flexo", "PET-G / PVC film"]), "ru": ("Термоусадочная этикетка Finplast 360°", "Яркая термоусадочная этикетка для ПЭТ и пластиковых бутылок.", ["8-цветная HD флексопечать", "PET-G / PVC пленка"])}),
            ]
            categories = {category.slug: category for category in (await db.scalars(select(Category))).all()}
            for slug, category_slug, image, translations in product_data:
                product = Product(slug=slug, category_id=categories[category_slug].id, image=image, is_featured=True)
                product.translations = [ProductTranslation(lang=lang, title=title, description=description, specs=json.dumps(specs)) for lang, (title, description, specs) in translations.items()]
                db.add(product)
        ui_values = {
            "navProducts": {"az": "Məhsullar", "en": "Products", "ru": "Продукты"},
            "navMfg": {"az": "İstehsal və Keyfiyyət", "en": "Manufacturing & Quality", "ru": "Производство и качество"},
            "navCert": {"az": "Sertifikatlar", "en": "Certificates", "ru": "Сертификаты"},
            "btnQuoteNav": {"az": "Fərdi Təklif Al", "en": "Get Quote", "ru": "Получить предложение"},
        }
        for key, values in ui_values.items():
            for lang, value in values.items():
                if not await db.scalar(select(UiString).where(UiString.key == key, UiString.lang == lang)):
                    db.add(UiString(key=key, lang=lang, value=value))
        settings_data = {"companyName": "Fin-Plast International MMC", "email": "office@finplast.az", "phonePrimary": "+994 12 585 11 91", "whatsapp": "994502511454"}
        for key, value in settings_data.items():
            if not await db.scalar(select(SiteSetting).where(SiteSetting.key == key, SiteSetting.lang == "az")):
                db.add(SiteSetting(key=key, lang="az", value=value))
        await db.commit()
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
