import { useEffect, useState } from "react";
import { track } from "@/analytics/track";
import { useI18n } from "@/hooks/use-i18n";
import { contactsPath, homePath, lifePath, offerPath, privacyPath, subscribePath, type SitePage } from "@/routes";
import { LANGS, type Lang } from "@/types/lang";

export function LangSwitch({ page = "home" }: { page?: SitePage }) {
  const { lang, t } = useI18n();
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    setSuffix(`${window.location.search}${window.location.hash}`);
  }, []);

  if (LANGS.length < 2) return null;

  return (
    <nav aria-label={t.nav.language} className="inline-flex rounded-full bg-white/20 p-[3px] text-[13px] font-semibold">
      {LANGS.map((code: Lang) => {
        const active = code === lang;
        return (
          <a
            key={code}
            href={`${page === "life" ? lifePath(code) : page === "subscribe" ? subscribePath(code) : page === "privacy" ? privacyPath(code) : page === "offer" ? offerPath(code) : page === "contacts" ? contactsPath(code) : homePath(code)}${suffix}`}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              if (!active) track("select_language", { from: lang, to: code });
            }}
            className={`rounded-full px-3 py-[5px] no-underline ${
              active ? "bg-white text-leaf-deep shadow-sm" : "text-white/90 hover:text-white"
            }`}
          >
            {code.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
}
