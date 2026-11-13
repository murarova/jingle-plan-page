import { META_PIXEL_ID } from "@/analytics/config";

interface FbqFunction {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: FbqFunction;
}

let loaded = false;

export function grantMetaPixel(): void {
  if (!META_PIXEL_ID || loaded || typeof window === "undefined") return;
  loaded = true;
  const fbq = function stub(...args: unknown[]) {
    const self = fbq;
    if (self.callMethod) self.callMethod(...args);
    else self.queue.push(args);
  } as FbqFunction;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

export function sendMetaEvent(name: string, params: Record<string, unknown>): void {
  if (!META_PIXEL_ID || !window.fbq) return;
  window.fbq("trackCustom", name, params);
}
