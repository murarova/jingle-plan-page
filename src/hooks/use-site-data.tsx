import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_SITE_DATA } from "@/config/defaults";
import type { ApkMeta, SiteData, SiteLinks } from "@/types/site-data";

const SiteDataContext = createContext<SiteData>(DEFAULT_SITE_DATA);

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function SiteDataProvider({ initial, children }: { initial: SiteData; children: ReactNode }) {
  const [data, setData] = useState<SiteData>(initial);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchJson<SiteLinks>("/config/links.json"), fetchJson<ApkMeta>("/config/apk.json")]).then(
      ([links, apk]) => {
        if (cancelled) return;
        setData((current) => ({
          links: links ? { ...current.links, ...links } : current.links,
          apk: apk ? { ...current.apk, ...apk } : current.apk,
        }));
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteData {
  return useContext(SiteDataContext);
}
