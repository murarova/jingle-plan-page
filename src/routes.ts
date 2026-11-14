import { DEFAULT_LANG, type Lang } from "@/types/lang";

export type SitePage = "home" | "life";

export function isLifePath(pathname: string): boolean {
  return pathname.split("/").filter(Boolean).includes("life");
}

export function homePath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/" : `/${lang}/`;
}

export function lifePath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/life/" : `/${lang}/life/`;
}
