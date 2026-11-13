export const ALL_LANGS = ["uk", "en"] as const;

export type Lang = (typeof ALL_LANGS)[number];

export const LANGS: readonly Lang[] = ["uk"];

export const DEFAULT_LANG: Lang = "uk";

export function isLang(value: string | undefined | null): value is Lang {
  return LANGS.some((code) => code === value);
}
