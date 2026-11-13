import { getDictionary } from "@/i18n";
import { SITE_NAME } from "@/config/site";
import { LANGS, type Lang } from "@/types/lang";

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function langUrl(siteUrl: string, lang: Lang): string {
  return `${siteUrl}/${lang}/`;
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
