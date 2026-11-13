import { Reveal } from "@/components/reveal";
import { useI18n } from "@/hooks/use-i18n";

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how" className="py-[72px]">
      <div className="wrap">
        <Reveal className="mb-9 max-w-[640px]">
          <h2 className="mb-3 text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">{t.how.title}</h2>
          <p className="text-[17px] text-muted">{t.how.subtitle}</p>
        </Reveal>
        <ol className="timeline-line relative grid list-none gap-7 p-0 pl-[70px]">
          {t.how.steps.map((step, index) => (
            <Reveal as="li" key={step.title} className="relative" delay={index * 120}>
              <span className="ring-num absolute -left-[70px] top-0" aria-hidden="true">
                {index + 1}
              </span>
              <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-candy-deep">{step.when}</span>
              <h3 className="mb-1.5 mt-0.5 text-[21px] font-bold">{step.title}</h3>
              <p className="max-w-[520px] text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
