import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");
const siteUrl = (process.env.SITE_URL ?? "https://jingle-plan.app").replace(/\/$/, "");

const { render, buildHead, LANGS } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

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
  const dir = resolve(dist, lang);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`prerender: /${lang}/`);
}

const alternates = LANGS.map(
  (lang) => `<link rel="alternate" hreflang="${lang}" href="${siteUrl}/${lang}/" />`,
).join("\n    ");

const redirect = `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Jingle Plan</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${siteUrl}/uk/" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
    <script>
      (function () {
        var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "uk"];
        var enabled = ${JSON.stringify(LANGS)};
        var target = "uk";
        for (var i = 0; i < langs.length; i += 1) {
          var code = String(langs[i]).toLowerCase().slice(0, 2);
          if (enabled.indexOf(code) !== -1) { target = code; break; }
        }
        location.replace("/" + target + "/" + location.search + location.hash);
      })();
    </script>
  </head>
  <body>
    <noscript>
      <p>${LANGS.map((code) => `<a href="/${code}/">${code === "uk" ? "Українською" : "English"}</a>`).join(" · ")}</p>
    </noscript>
  </body>
</html>
`;
writeFileSync(resolve(dist, "index.html"), redirect);

const lastmod = new Date().toISOString().slice(0, 10);
const urls = LANGS.map((lang) => {
  const alt = LANGS.map(
    (code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${siteUrl}/${code}/" />`,
  ).join("\n");
  return `  <url>\n    <loc>${siteUrl}/${lang}/</loc>\n    <lastmod>${lastmod}</lastmod>\n${alt}\n  </url>`;
}).join("\n");

writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
);
writeFileSync(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

rmSync(ssrDir, { recursive: true, force: true });
console.log("prerender: done");
