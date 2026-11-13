# Jingle Plan — лендинг

React + Vite + TypeScript + Tailwind CSS v4. Статичний пререндер сторінок за мовами з `LANGS` у `src/types/lang.ts` (зараз лише `uk`; щоб повернути англійську, додай `"en"` у `LANGS` і поклади англійські скриншоти), хостинг на Firebase Hosting.

## Команди

| Команда | Що робить |
| --- | --- |
| `npm run dev` | Dev-сервер (`http://localhost:5173/uk/`) |
| `npm run typecheck` | Перевірка типів |
| `npm run build` | `apk:meta` → клієнтська збірка → SSR-збірка → пререндер у `dist/` |
| `npm run preview` | Перегляд `dist/` |
| `npm run deploy` | Збірка та `firebase deploy --only hosting` |

Змінні середовища (створити `.env.local`):

```
VITE_GA_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=
SITE_URL=https://jingle-plan.app
```

Без `VITE_GA_ID` та `VITE_META_PIXEL_ID` аналітика й cookie-банер вимкнені. `SITE_URL` потрібен під час збірки для canonical, hreflang, Open Graph та sitemap.

## Події аналітики

Події надсилаються лише після згоди на cookies (Google Consent Mode).

| Подія | Коли | Параметри |
| --- | --- | --- |
| `page_view` | відкриття сторінки | `page_path` |
| `click_app_store` | клік по App Store | `placement` (hero, download, sticky) |
| `click_android_download` | клік по Android | `placement`, `source`, `action` (`scroll` для героя, `download` для решти) |
| `apk_download_started` | APK справді доступний для завантаження | `placement`, `version` |
| `view_download` | користувач дійшов до секції завантаження (один раз) | |
| `open_apk_instructions` | розгорнув «Як встановити APK» | |
| `click_support_email` | клік «Написати нам» | `placement` |
| `click_privacy_policy` | клік по політиці конфіденційності | `placement` |
| `select_language` | зміна мови | `from`, `to` |

До кожної події додаються `language` та UTM-мітки (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`), якщо вони були в посиланні.

## Посилання без редеплою фронтенду

Усе керується файлом `public/config/links.json`. Клієнт читає його при кожному відкритті сторінки (`Cache-Control: no-cache`), тому достатньо замінити файл на хостингу.

```json
{
  "ios": { "url": "https://apps.apple.com/app/idXXXXXXXXX" },
  "android": { "type": "apk", "url": "/downloads/jingle-plan.apk" },
  "privacy": { "uk": "https://…", "en": "https://…" },
  "terms": { "uk": "https://…", "en": "https://…" },
  "supportEmail": "support@…",
  "instagram": "https://instagram.com/…"
}
```

Порожнє значення: кнопка стає неактивною («Незабаром»), а email та Instagram не показуються.

Після публікації в Google Play: `"android": { "type": "play", "url": "https://play.google.com/store/apps/details?id=com.murarova.jingleplan" }`. Блок APK з версією, розміром та SHA-256 зникне автоматично.

## Android APK

1. Покласти підписаний release APK у `public/downloads/jingle-plan.apk` (файл не потрапляє в git).
2. За потреби вказати версію: `public/downloads/version.txt` або змінна `APK_VERSION`.
3. `npm run build` сам порахує розмір та SHA-256 і запише `public/config/apk.json`.
4. `firebase.json` віддає APK з `Content-Type: application/vnd.android.package-archive` та `Content-Disposition: attachment`.

Поки APK немає, кнопка Android неактивна й показує «Незабаром».

## Структура

```
src/
  sections/     hero, how-it-works, benefits, outcome, download, footer, sticky-cta
  components/   brand, calendar, phone, store-buttons, lang-switch, consent-banner, icons
  analytics/    consent, ga4, meta-pixel, utm, track
  hooks/        use-i18n, use-site-data, use-consent
  i18n/         uk.ts, en.ts
  seo/          head.ts (title, description, hreflang, canonical, Open Graph, JSON-LD)
scripts/        build-apk-meta.mjs, prerender.mjs
mockups/        статичні макети (для довідки)
docs/PLAN.md    план та рішення
```

## Аналітика

Події GA4: `page_view`, `click_app_store`, `click_android_download`, `apk_download_started`, `click_privacy_policy`, `select_language`. До кожної додаються `language` та `utm_source/medium/campaign/content`.

Скрипти GA4 та Meta Pixel завантажуються лише після згоди. Події до відповіді на банер стоять у черзі й відправляються після «Прийняти», а після «Відхилити» відкидаються.
