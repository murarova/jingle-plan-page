import { BrandWordmark } from "@/components/brand-wordmark";
import { LangSwitch } from "@/components/lang-switch";
import { useI18n } from "@/hooks/use-i18n";
import { homePath, lifePath, type SitePage } from "@/routes";

export function SiteHeader({ page }: { page: SitePage }) {
  const { lang, t } = useI18n();
  const home = homePath(lang);
  const cross =
    page === "home"
      ? { href: lifePath(lang), label: t.nav.lifeLink }
      : { href: home, label: t.nav.app };

  return (
    <div className="wrap">
      <div className="flex items-center justify-between gap-3 py-[18px]">
        <BrandWordmark
          height={50}
          href={page === "home" ? "#top" : home}
          imageClassName="h-9 w-auto sm:h-[50px]"
        />
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={cross.href}
            className="btn-lift inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-white px-3.5 py-1.5 text-[15px] font-bold text-white no-underline hover:bg-white/15 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy sm:px-5 sm:text-[17px]"
          >
            {cross.label}
          </a>
          <LangSwitch page={page} />
        </div>
      </div>
    </div>
  );
}
