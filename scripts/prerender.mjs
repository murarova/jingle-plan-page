import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");
const siteUrl = (process.env.SITE_URL ?? "https://jingle-plan.app").replace(/\/$/, "");

const { render, buildHead, buildLifeHead, buildContactsHead, buildOfferHead, buildPrivacyHead, buildSubscribeHead, LANGS, homePath, lifePath, contactsPath, offerPath, privacyPath, subscribePath } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

const template = readFileSync(resolve(dist, "index.html"), "utf8");

function readJson(name, fallback) {
  const file = resolve(dist, "config", name);
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : fallback;
}

const links = readJson("links.json", null);
const apk = readJson("apk.json", { available: false, version: "", sizeBytes: 0, sha256: "" });

if (!links) throw new Error("dist/config/links.json is missing");

const data = { links, apk };
const dataScript = `<script>window.__SITE_DATA__=${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

for (const lang of LANGS) {
  const html = template
    .replace("%LANG%", lang)
    .replace("<!--head-->", buildHead(lang, siteUrl))
    .replace("<!--app-->", render(lang, data))
    .replace("<!--data-->", dataScript);
  const route = homePath(lang);
  if (route === "/") {
    writeFileSync(resolve(dist, "index.html"), html);
  } else {
    const dir = resolve(dist, route.replace(/^\/|\/$/g, ""));
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "index.html"), html);
  }
  console.log(`prerender: ${route}`);
}

for (const lang of LANGS) {
  const route = lifePath(lang);
  const html = template
    .replace("%LANG%", lang)
    .replace("<!--head-->", buildLifeHead(lang, siteUrl))
    .replace("<!--app-->", render(lang, data, "life"))
    .replace("<!--data-->", dataScript);
  const dir = resolve(dist, route.replace(/^\/|\/$/g, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`prerender: ${route}`);
}

for (const lang of LANGS) {
  const route = subscribePath(lang);
  const html = template
    .replace("%LANG%", lang)
    .replace("<!--head-->", buildSubscribeHead(lang, siteUrl))
    .replace("<!--app-->", render(lang, data, "subscribe"))
    .replace("<!--data-->", dataScript);
  const dir = resolve(dist, route.replace(/^\/|\/$/g, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`prerender: ${route}`);
}

for (const lang of LANGS) {
  const route = contactsPath(lang);
  const html = template
    .replace("%LANG%", lang)
    .replace("<!--head-->", buildContactsHead(lang, siteUrl))
    .replace("<!--app-->", render(lang, data, "contacts"))
    .replace("<!--data-->", dataScript);
  const dir = resolve(dist, route.replace(/^\/|\/$/g, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`prerender: ${route}`);
}

for (const lang of LANGS) {
  const route = offerPath(lang);
  const html = template
    .replace("%LANG%", lang)
    .replace("<!--head-->", buildOfferHead(lang, siteUrl))
    .replace("<!--app-->", render(lang, data, "offer"))
    .replace("<!--data-->", dataScript);
  const dir = resolve(dist, route.replace(/^\/|\/$/g, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`prerender: ${route}`);
}

for (const lang of LANGS) {
  const route = privacyPath(lang);
  const html = template
    .replace("%LANG%", lang)
    .replace("<!--head-->", buildPrivacyHead(lang, siteUrl))
    .replace("<!--app-->", render(lang, data, "privacy"))
    .replace("<!--data-->", dataScript);
  const dir = resolve(dist, route.replace(/^\/|\/$/g, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`prerender: ${route}`);
}

const lastmod = new Date().toISOString().slice(0, 10);

function sitemapUrl(path, hrefFor) {
  const alt = LANGS.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${hrefFor(code)}" />`).join("\n");
  return `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alt}\n  </url>`;
}

const urls = [
  ...LANGS.map((lang) => sitemapUrl(homePath(lang), (code) => `${siteUrl}${homePath(code)}`)),
  ...LANGS.map((lang) => sitemapUrl(lifePath(lang), (code) => `${siteUrl}${lifePath(code)}`)),
  ...LANGS.map((lang) => sitemapUrl(subscribePath(lang), (code) => `${siteUrl}${subscribePath(code)}`)),
  ...LANGS.map((lang) => sitemapUrl(privacyPath(lang), (code) => `${siteUrl}${privacyPath(code)}`)),
  ...LANGS.map((lang) => sitemapUrl(offerPath(lang), (code) => `${siteUrl}${offerPath(code)}`)),
  ...LANGS.map((lang) => sitemapUrl(contactsPath(lang), (code) => `${siteUrl}${contactsPath(code)}`)),
].join("\n");

writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
);
writeFileSync(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

rmSync(ssrDir, { recursive: true, force: true });
console.log("prerender: done");
