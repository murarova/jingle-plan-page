import { BrandWordmark } from "@/components/brand-wordmark";
import { BookIcon, PhoneIcon } from "@/components/icons";
import { LangSwitch } from "@/components/lang-switch";
import { useI18n } from "@/hooks/use-i18n";
import { homePath, lifePath, type SitePage } from "@/routes";

const item =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-bold no-underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy sm:px-4 sm:text-[16px]";

export function SiteHeader({ page }: { page: SitePage }) {
  const { lang, t } = useI18n();
  const home = homePath(lang);
  const life = lifePath(lang);
  const onHome = page === "home";

  return (
    <div className="wrap">
      <div className="flex items-center justify-between gap-3 py-[18px]">
        <BrandWordmark
          height={50}
          href={onHome ? "#top" : home}
          imageClassName="h-9 w-auto sm:h-[50px]"
        />
        <div className="flex shrink-0 items-center gap-3">
          <nav aria-label={t.nav.primary} className="inline-flex items-center rounded-full bg-forest p-1">
            <a
              href={onHome ? "#top" : home}
              aria-current={onHome ? "page" : undefined}
              className={`${item} ${onHome ? "bg-white text-leaf-deep" : "text-white hover:bg-white/15"}`}
            >
              <PhoneIcon className="hidden h-4 w-4 min-[420px]:block" />
              {t.nav.app}
            </a>
            <a
              href={page === "life" ? "#top" : life}
              aria-current={page === "life" ? "page" : undefined}
              className={`${item} ${page === "life" ? "bg-white text-leaf-deep" : "text-white hover:bg-white/15"}`}
            >
              <BookIcon className="hidden h-4 w-4 min-[420px]:block" />
              {t.nav.lifeLink}
            </a>
          </nav>
          <LangSwitch page={page} />
        </div>
      </div>
    </div>
  );
}
