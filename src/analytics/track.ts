import { TRACKING_ENABLED } from "@/analytics/config";
import { getConsent, hydrateConsent, setConsent, subscribeConsent } from "@/analytics/consent";
import { denyGa4, grantGa4, initGa4Defaults, sendGa4Event } from "@/analytics/ga4";
import { grantMetaPixel, sendMetaEvent } from "@/analytics/meta-pixel";
import { captureUtm, getUtm } from "@/analytics/utm";

export type AnalyticsEvent =
  | "page_view"
  | "click_app_store"
  | "click_android_download"
  | "apk_download_started"
  | "click_privacy_policy"
  | "click_support_email"
  | "view_download"
  | "open_apk_instructions"
  | "select_language";

type EventParams = Record<string, string | number | boolean>;

interface QueuedEvent {
  name: AnalyticsEvent;
  params: EventParams;
}

const queue: QueuedEvent[] = [];

let started = false;
let activeLang = "uk";

function dispatch(event: QueuedEvent): void {
  const params = { ...getUtm(), language: activeLang, ...event.params };
  sendGa4Event(event.name, params);
  if (event.name !== "page_view") sendMetaEvent(event.name, params);
}

function flush(): void {
  while (queue.length > 0) {
    const next = queue.shift();
    if (next) dispatch(next);
  }
}

function applyConsent(): void {
  const consent = getConsent();
  if (consent === "granted") {
    grantGa4(activeLang);
    grantMetaPixel();
    flush();
  } else {
    denyGa4();
    if (consent === "denied") queue.length = 0;
  }
}

export function startAnalytics(lang: string): void {
  if (!TRACKING_ENABLED || started || typeof window === "undefined") return;
  started = true;
  activeLang = lang;
  hydrateConsent();
  captureUtm();
  initGa4Defaults();
  subscribeConsent(applyConsent);
  track("page_view", { page_path: window.location.pathname });
  applyConsent();
}

export function track(name: AnalyticsEvent, params: EventParams = {}): void {
  if (!TRACKING_ENABLED || typeof window === "undefined") return;
  const event: QueuedEvent = { name, params };
  if (getConsent() === "granted") {
    dispatch(event);
    return;
  }
  if (getConsent() === null) queue.push(event);
}

export function acceptConsent(): void {
  setConsent("granted");
}

export function declineConsent(): void {
  setConsent("denied");
}

export function resetConsent(): void {
  setConsent(null);
}
