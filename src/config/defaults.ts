import type { SiteData } from "@/types/site-data";

export const DEFAULT_SITE_DATA: SiteData = {
  links: {
    ios: { url: "" },
    android: { type: "apk", url: "/downloads/jingle-plan.apk" },
    privacy: { uk: "", en: "" },
    terms: { uk: "", en: "" },
    supportEmail: "",
    instagram: "",
  },
  apk: { available: false, version: "", sizeBytes: 0, sha256: "" },
};
