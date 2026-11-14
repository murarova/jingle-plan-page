import { fillLife, lifeConfig } from "@/config/life";
import { SITE_NAME } from "@/config/site";
import { getDictionary } from "@/i18n";
import { homePath, lifePath } from "@/routes";
import { DEFAULT_LANG, LANGS, type Lang } from "@/types/lang";

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function langUrl(siteUrl: string, lang: Lang): string {
  return `${siteUrl}${homePath(lang)}`;
}

export function buildHead(lang: Lang, siteUrl: string): string {
  const { meta } = getDictionary(lang);
  const url = langUrl(siteUrl, lang);
  const image = `${siteUrl}/og-${lang}.jpg`;
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);

  const alternates = LANGS.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${langUrl(siteUrl, code)}" />`,
  ).join("\n    ");

  const otherLocales = LANGS.filter((code) => code !== lang)
    .map((code) => `<meta property="og:locale:alternate" content="${getDictionary(code).meta.ogLocale}" />`)
    .join("\n    ");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    operatingSystem: "iOS, Android",
    applicationCategory: "LifestyleApplication",
    description: meta.description,
    inLanguage: lang,
    url,
  });

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${meta.ogLocale}" />`,
    otherLocales,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${jsonLd.replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function lifeCanonical(siteUrl: string, lang: Lang): string {
  return `${siteUrl}${lifePath(lang)}`;
}

function lifeOgImage(siteUrl: string, lang: Lang): string {
  const file = lang === DEFAULT_LANG ? "/og-life-2.jpg" : `/og-life-${lang}.jpg`;
  return `${siteUrl}${file}`;
}

export function buildLifeHead(lang: Lang, siteUrl: string): string {
  const copy = getDictionary(lang).life.meta;
  const url = lifeCanonical(siteUrl, lang);
  const image = lifeOgImage(siteUrl, lang);
  const title = escapeAttr(fillLife(copy.title, lang));
  const description = escapeAttr(fillLife(copy.description, lang));
  const ogTitle = escapeAttr(fillLife(copy.ogTitle, lang));
  const imageAlt = escapeAttr(fillLife("{host}. {dateRange}. Jingle Plan {season}", lang));

  const alternates = LANGS.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${lifeCanonical(siteUrl, code)}" />`,
  ).join("\n    ");

  const otherLocales = LANGS.filter((code) => code !== lang)
    .map((code) => `<meta property="og:locale:alternate" content="${getDictionary(code).life.meta.ogLocale}" />`)
    .join("\n    ");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: fillLife(copy.title, lang),
    description: fillLife(copy.description, lang),
    startDate: lifeConfig.startDate,
    endDate: lifeConfig.endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    inLanguage: lang,
    url,
    image,
    organizer: { "@type": "Person", name: lifeConfig.host },
    location: { "@type": "VirtualLocation", url },
    offers: {
      "@type": "Offer",
      price: String(lifeConfig.price),
      priceCurrency: lifeConfig.currency,
      availability: lifeConfig.registrationOpen ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      url: lifeConfig.registrationOpen && lifeConfig.registrationUrl ? lifeConfig.registrationUrl : url,
    },
  });

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${lifeCanonical(siteUrl, DEFAULT_LANG)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${ogTitle}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${copy.ogLocale}" />`,
    otherLocales,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${ogTitle}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${jsonLd.replace(/</g, "\\u003c")}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}
