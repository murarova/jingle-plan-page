import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/nunito";
import "@/index.css";
import { App } from "@/App";
import { DEFAULT_SITE_DATA } from "@/config/defaults";
import { isContactsPath, isLifePath, isOfferPath, isPrivacyPath, isSubscribePath, isSubscribeResultPath, type SitePage } from "@/routes";
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

function detectPage(): SitePage {
  if (isContactsPath(window.location.pathname)) return "contacts";
  if (isOfferPath(window.location.pathname)) return "offer";
  if (isPrivacyPath(window.location.pathname)) return "privacy";
  if (isSubscribeResultPath(window.location.pathname)) return "subscribe-result";
  if (isSubscribePath(window.location.pathname)) return "subscribe";
  if (isLifePath(window.location.pathname)) return "life";
  return "home";
}

const path = window.location.pathname;
const legacyHome = path === "/uk" || path === "/uk/";
if (legacyHome) {
  window.location.replace(`/${window.location.search}${window.location.hash}`);
}

const container = document.getElementById("root");

if (container && !legacyHome) {
  const app = (
    <StrictMode>
      <App lang={detectLang()} data={window.__SITE_DATA__ ?? DEFAULT_SITE_DATA} page={detectPage()} />
    </StrictMode>
  );
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
