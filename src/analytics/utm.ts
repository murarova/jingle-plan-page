const STORAGE_KEY = "jp_utm";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  const found: UtmParams = {};
  const search = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = search.get(key);
    if (value) found[key] = value.slice(0, 100);
  });
  try {
    if (Object.keys(found).length > 0) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      return found;
    }
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as UtmParams) : {};
  } catch {
    return found;
  }
}

export function getUtm(): UtmParams {
  return captureUtm();
}
