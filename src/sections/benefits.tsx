import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import album from "@/assets/album.webp";
import day from "@/assets/day.webp";
import home from "@/assets/home.webp";
import plans from "@/assets/plans.webp";
import progress from "@/assets/progress.webp";
import summary from "@/assets/summary.webp";
import { PhoneStack } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { useI18n } from "@/hooks/use-i18n";
import { BenefitsCarousel } from "@/sections/benefits-carousel";

const screens: Record<string, string> = {
  home,
  day,
  summary,
  progress,
  plans,
  album,
};

const SLIDE_INTERVAL_MS = 2000;

export function Benefits() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const items = t.benefits.items;
  const playing = visible && !hovered && !stopped && !reduceMotion;

  const select = (index: number, focus = false) => {
    setActive(index);
    if (focus) refs.current[index]?.focus({ preventScroll: true });
  };

  const stop = useCallback(() => setStopped(true), []);
  const choose = useCallback((index: number) => setActive(index), []);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [playing, items.length]);

  const onKeyDown = (event: KeyboardEvent) => {
    const last = items.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="pb-[72px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="wrap">
        <Reveal className="mb-7 max-w-[640px] md:mb-9">
          <h2 className="mb-3 text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">
            {t.benefits.title}
          </h2>
          <p className="text-[17px] text-muted">{t.benefits.subtitle}</p>
        </Reveal>

        <BenefitsCarousel
          items={items.map((entry) => ({
            id: entry.id,
            title: entry.title,
            text: entry.text,
            src: screens[entry.image],
            alt: `${t.benefits.screenAlt}: ${entry.title}`,
          }))}
          active={active}
          playing={playing}
          intervalMs={SLIDE_INTERVAL_MS}
          label={t.benefits.title}
          onSelect={choose}
          onUserInteract={stop}
        />

        <div className="hidden gap-7 md:grid md:grid-cols-2 md:items-center">
          <div
            role="tablist"
            aria-label={t.benefits.title}
            onKeyDown={(event) => {
              setStopped(true);
              onKeyDown(event);
            }}
            className="flex min-w-0 flex-col gap-2"
          >
            {items.map((entry, index) => {
              const selected = index === active;
              return (
                <button
                  key={entry.id}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`benefit-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="benefit-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => {
                    setStopped(true);
                    select(index);
                  }}
                  className={`relative grid cursor-pointer gap-px overflow-hidden rounded-2xl border px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy ${
                    selected
                      ? "border-leaf bg-ivory-card text-ink shadow-[inset_0_0_0_2px_var(--color-leaf)]"
                      : "border-ivory-line bg-ivory-card text-ink"
                  }`}
                >
                  <strong className="text-base font-semibold">{entry.title}</strong>
                  <span className="text-[13.5px] font-normal text-muted">{entry.text}</span>
                  {selected && playing ? (
                    <span
                      aria-hidden="true"
                      style={{ "--slide-ms": `${SLIDE_INTERVAL_MS}ms` } as CSSProperties}
                      className="tab-progress absolute inset-x-0 bottom-0 h-[3px] bg-leaf"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          <div
            id="benefit-panel"
            role="tabpanel"
            aria-labelledby={`benefit-tab-${active}`}
            className="grid items-center justify-items-center overflow-hidden rounded-[32px] bg-ivory-badge py-7"
          >
            <PhoneStack
              sources={items.map((entry) => screens[entry.image])}
              alts={items.map((entry) => `${t.benefits.screenAlt}: ${entry.title}`)}
              active={active}
              className="[--w:270px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
