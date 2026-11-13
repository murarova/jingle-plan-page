import { createContext, useContext, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Lang } from "@/types/lang";

interface I18nValue {
  lang: Lang;
  t: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <I18nContext.Provider value={{ lang, t: getDictionary(lang) }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("I18nProvider is missing");
  return value;
}
