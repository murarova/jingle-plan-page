import { GA_ID } from "@/analytics/config";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let loaded = false;

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
  return window.gtag;
}

export function initGa4Defaults(): void {
  if (!GA_ID || typeof window === "undefined") return;
  const gtag = ensureGtag();
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function grantGa4(lang: string): void {
  if (!GA_ID || typeof window === "undefined") return;
  const gtag = ensureGtag();
  gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  if (loaded) return;
  loaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false, language: lang });
}

export function denyGa4(): void {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function sendGa4Event(name: string, params: Record<string, unknown>): void {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", name, { transport_type: "beacon", ...params });
}
