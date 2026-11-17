import { DEFAULT_LANG, type Lang } from "@/types/lang";

export type SitePage = "home" | "life" | "subscribe" | "privacy" | "offer" | "contacts";

export function isLifePath(pathname: string): boolean {
  return pathname.split("/").filter(Boolean).includes("life");
}

export function isSubscribePath(pathname: string): boolean {
  return pathname.split("/").filter(Boolean).includes("subscribe");
}

export function isPrivacyPath(pathname: string): boolean {
  return pathname.split("/").filter(Boolean).includes("privacy");
}

export function isOfferPath(pathname: string): boolean {
  return pathname.split("/").filter(Boolean).includes("offer");
}

export function isContactsPath(pathname: string): boolean {
  return pathname.split("/").filter(Boolean).includes("contacts");
}

export function homePath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/" : `/${lang}/`;
}

export function lifePath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/life/" : `/${lang}/life/`;
}

export function subscribePath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/subscribe/" : `/${lang}/subscribe/`;
}

export function privacyPath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/privacy/" : `/${lang}/privacy/`;
}

export function offerPath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/offer/" : `/${lang}/offer/`;
}

export function contactsPath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/contacts/" : `/${lang}/contacts/`;
}
