import { track } from "@/analytics/track";
import { Reveal } from "@/components/reveal";
import { fillLife, lifeConfig } from "@/config/life";
import { useI18n } from "@/hooks/use-i18n";
import { lifePath } from "@/routes";

export function LifePromo() {
  const { lang, t } = useI18n();
  const copy = t.lifePromo;

  return (
    <section className="pt-14" aria-labelledby="life-promo-title">
      <div className="wrap">
        <Reveal className="flex flex-col gap-5 rounded-[28px] border border-[#d3e7b4] bg-[#e7f3d4] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-7">
          <div className="max-w-[680px]">
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.04em] text-leaf-deep">
              <span className="mr-1.5 text-gold" aria-hidden="true">
                ✦
              </span>
              {fillLife(copy.eyebrow, lang)}
            </p>
            <h2 id="life-promo-title" className="mb-2 text-[clamp(22px,4vw,30px)] font-bold leading-[1.15] tracking-[-0.02em]">
              {copy.title}
            </h2>
            <p className="text-[16px] text-muted">{copy.text}</p>
          </div>
          <a
            href={lifePath(lang)}
            className="btn-lift inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border-2 border-leaf-deep px-5 font-bold text-leaf-deep no-underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy hover:bg-leaf-deep hover:text-white"
            onClick={() => track("life_promo_click", { season: lifeConfig.season, source: "home_page" })}
          >
            {copy.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
