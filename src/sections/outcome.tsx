import plans from "@/assets/plans.webp";
import progress from "@/assets/progress.webp";
import summary from "@/assets/summary.webp";
import { Phone } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { useI18n } from "@/hooks/use-i18n";

export function Outcome() {
  const { t } = useI18n();

  return (
    <section
      id="result"
      className="border-y border-ivory-line bg-ivory-card py-[72px]"
    >
      <div className="wrap grid items-center gap-8 md:grid-cols-2">
        <Reveal>
          <h2 className="mb-3 text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">
            {t.outcome.title}
          </h2>
          <p className="text-[17px] text-muted">{t.outcome.text}</p>
        </Reveal>
        <Reveal
          delay={150}
          className="relative mx-auto h-[460px] w-full max-w-[440px] md:h-[560px] md:max-w-[520px]"
        >
          <Phone
            src={summary}
            alt={t.outcome.screens.summary}
            className="absolute left-1 top-9 -rotate-[5deg] [--w:175px] md:left-3 md:-rotate-6 md:[--w:230px]"
          />
          <Phone
            src={plans}
            alt={t.outcome.screens.plans}
            className="absolute right-1 top-9 rotate-[5deg] [--w:175px] md:right-3 md:rotate-6 md:[--w:230px]"
          />
          <Phone
            src={progress}
            alt={t.outcome.screens.progress}
            className="absolute left-1/2 top-0 z-[2] -translate-x-1/2 [--w:200px] md:[--w:250px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
