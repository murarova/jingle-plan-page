import { BrandWordmark } from "@/components/brand-wordmark";
import { Calendar } from "@/components/calendar";
import { LangSwitch } from "@/components/lang-switch";
import { AndroidButton, AppStoreButton } from "@/components/store-buttons";
import { withPrice } from "@/config/site";
import { useI18n } from "@/hooks/use-i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <>
      <header id="top" className="hero-bg relative pb-12 text-white">
        <div className="wrap">
          <div className="flex items-center justify-between py-[18px]">
            <BrandWordmark height={50} />
            <LangSwitch />
          </div>
          <div className="grid items-center gap-8 pt-2 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.16] px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[0.04em]">
                <span className="text-[#ffd86b]" aria-hidden="true">
                  ✦
                </span>
                {t.hero.eyebrow}
              </span>
              <h1 className="mb-3.5 text-[clamp(32px,7.6vw,58px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
                {t.hero.titleBefore}
                <mark className="bg-transparent text-white shadow-[inset_0_-0.28em_0_var(--color-candy)]">
                  {t.hero.titleHighlight}
                </mark>
                {t.hero.titleAfter}
              </h1>
              <p className="mb-[22px] max-w-[520px] text-[clamp(17px,4.2vw,21px)] text-white/90">{t.hero.lead}</p>
              <div className="flex flex-wrap gap-3">
                <AppStoreButton placement="hero" />
                <AndroidButton tone="hero" placement="hero" />
              </div>
              <p className="mt-3 whitespace-pre-line text-[13px] text-white/90">{withPrice(t.hero.note)}</p>
            </div>
            <Calendar />
          </div>
        </div>
      </header>
      <div className="candy" aria-hidden="true" />
    </>
  );
}
