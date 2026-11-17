import { BrandWordmark } from "@/components/brand-wordmark";
import { BookIcon, PhoneIcon } from "@/components/icons";
import { useI18n } from "@/hooks/use-i18n";
import { homePath, lifePath } from "@/routes";

const pill =
  "btn-lift inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-white px-4 py-1 text-[16px] font-bold text-white no-underline hover:bg-white/15 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy";

export function ShortHeader() {
  const { lang, t } = useI18n();

  return (
    <div className="wrap">
      <div className="flex items-center justify-between gap-3 py-[18px]">
        <BrandWordmark height={50} href={homePath(lang)} imageClassName="h-9 w-auto sm:h-[50px]" />
        <nav className="flex shrink-0 items-center gap-2" aria-label={t.nav.primary}>
          <a href={homePath(lang)} className={pill}>
            <PhoneIcon className="hidden h-4 w-4 min-[420px]:block" />
            {t.nav.app}
          </a>
          <a href={lifePath(lang)} className={pill}>
            <BookIcon className="hidden h-4 w-4 min-[420px]:block" />
            {t.nav.lifeLink}
          </a>
        </nav>
      </div>
    </div>
  );
}
