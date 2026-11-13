import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/nunito";
import "@/index.css";
import { App } from "@/App";
import { DEFAULT_SITE_DATA } from "@/config/defaults";
import { DEFAULT_LANG, isLang, type Lang } from "@/types/lang";
import type { SiteData } from "@/types/site-data";

declare global {
  interface Window {
    __SITE_DATA__?: SiteData;
  }
}

function detectLang(): Lang {
  const fromHtml = document.documentElement.lang;
  if (isLang(fromHtml)) return fromHtml;
  const fromPath = window.location.pathname.split("/").filter(Boolean)[0];
  return isLang(fromPath) ? fromPath : DEFAULT_LANG;
}

const container = document.getElementById("root");

if (container) {
  const app = (
    <StrictMode>
      <App lang={detectLang()} data={window.__SITE_DATA__ ?? DEFAULT_SITE_DATA} />
    </StrictMode>
  );
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
