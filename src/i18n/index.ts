import type { Lang } from "@/types/lang";
import { uk } from "@/i18n/uk";
import { en } from "@/i18n/en";

export type Dictionary = typeof uk;

export const dictionaries: Record<Lang, Dictionary> = { uk, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
