import { useEffect, useLayoutEffect, useRef, useState } from "react";
import hostPhoto from "@/assets/host.webp";
import { track } from "@/analytics/track";
import { CandyPanel } from "@/components/candy-panel";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { RegisterButton, registrationAvailable } from "@/components/register-button";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { fillLife, lifeConfig } from "@/config/life";
import { useI18n } from "@/hooks/use-i18n";
import { useSiteData } from "@/hooks/use-site-data";
import { homePath } from "@/routes";
import { Footer } from "@/sections/footer";

export function LifePage() {
  useEffect(() => {
    track("life_page_view", { season: lifeConfig.season, source: "life_page" });
  }, []);

  return (
    <>
      <LifeHero />
      <main>
        <About />
        <How />
        <Host />
        <Together />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
      <LifeSticky />
    </>
  );
}

function LifeHero() {
  const { lang, t } = useI18n();
  const copy = t.life.hero;

  return (
    <>
      <header id="top" className="hero-bg relative pb-12 text-white lg:pb-16">
        <SiteHeader page="life" />
        <div className="wrap grid items-center gap-8 pt-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-6">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.16] px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[0.04em]">
              <span className="text-[#ffd86b]" aria-hidden="true">
                ✦
              </span>
              {fillLife(copy.eyebrow, lang)}
            </span>
            <h1 className="mb-3.5 text-[clamp(32px,7.6vw,58px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              {copy.titleBefore}
              <mark className="bg-transparent text-white shadow-[inset_0_-0.28em_0_var(--color-candy)]">
                {copy.titleHighlight}
              </mark>
              {copy.titleAfter}
            </h1>
            <p className="mb-3 max-w-[540px] text-[clamp(17px,4.2vw,21px)] text-white/95">{fillLife(copy.lead, lang)}</p>
            <p className="mb-6 max-w-[520px] text-[15px] text-white/85">{copy.mood}</p>
            <RegisterButton location="hero" />
            <p className="mt-3 text-[13px] text-white/90">{fillLife(copy.priceNote, lang)}</p>
          </div>
          <div className="mx-auto w-full max-w-[260px] lg:mx-0 lg:max-w-[440px] lg:justify-self-start" aria-hidden="true">
            <img src="/tree.svg" alt="" width={180} height={175} className="h-auto w-full" />
          </div>
        </div>
      </header>
      <div className="candy" aria-hidden="true" />
    </>
  );
}

function About() {
  const { lang, t } = useI18n();
  const copy = t.life.about;

  return (
    <section className="py-[72px]" aria-labelledby="life-about-title">
      <div className="wrap">
        <Reveal className="mx-auto mb-10 max-w-[740px] text-center">
          <h2 id="life-about-title" className="mb-4 text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">
            {copy.title}
          </h2>
          <p className="text-[17px] text-muted">{copy.lead}</p>
          <p className="mt-3 text-[17px] text-muted">{copy.more}</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 90} className="rounded-[28px] border border-ivory-line bg-ivory-card px-6 py-7 text-center">
              <AboutIcon index={index} />
              <h3 className="mb-2 text-[21px] font-bold">{fillLife(card.title, lang)}</h3>
              <p className="text-muted">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function How() {
  const { lang, t } = useI18n();
  const copy = t.life.how;
  const columns = [copy.app, copy.community];

  return (
    <section className="pb-[72px]" aria-labelledby="life-how-title">
      <div className="wrap">
        <Reveal className="mb-8 text-center">
          <h2 id="life-how-title" className="text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">
            {copy.title}
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {columns.map((column, index) => (
            <Reveal key={column.title} delay={index * 100} className="rounded-[28px] border border-ivory-line bg-ivory-card p-6 md:p-8">
              <p className={`text-[13px] font-bold uppercase tracking-[0.04em] ${index === 0 ? "text-candy-deep" : "text-leaf-deep"}`}>
                {fillLife(column.when, lang)}
              </p>
              <h3 className="mb-4 mt-1.5 text-[22px] font-bold">{column.title}</h3>
              <ul className="grid gap-3">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-leaf" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-6 max-w-[680px] text-center">
          <p className="text-muted">{copy.note}</p>
          <a
            href={homePath(lang)}
            className="mt-3 inline-flex font-bold text-leaf-deep underline decoration-candy decoration-2 underline-offset-4"
          >
            {copy.appLink}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Host() {
  const { t } = useI18n();
  const copy = t.life.host;
  const profiles = [
    { href: lifeConfig.instagramUrl, label: copy.instagram, Icon: InstagramIcon },
    { href: lifeConfig.facebookUrl, label: copy.facebook, Icon: FacebookIcon },
  ];

  return (
    <section className="pb-[72px]" aria-labelledby="life-host-title">
      <div className="wrap">
        <Reveal className="grid items-center gap-8 rounded-[28px] border border-ivory-line bg-ivory-card p-6 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12 md:p-10">
          <img
            src={hostPhoto}
            alt={copy.photoAlt}
            width={1800}
            height={1200}
            className="mx-auto aspect-[4/5] w-full max-w-[320px] rounded-[24px] object-cover object-[72%_22%] md:max-w-none"
          />
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.04em] text-leaf-deep">{copy.role}</p>
            <h2 id="life-host-title" className="mt-1.5 text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">
              {copy.name}
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {copy.facts.map((fact) => (
                <li key={fact} className="flex gap-3 text-[17px]">
                  <span className="mt-[9px] h-2 w-2 flex-none rounded-full bg-leaf" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-3">
              {profiles.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lift inline-flex min-h-11 items-center gap-2 rounded-full border border-ivory-line bg-ivory-page px-4 text-[15px] font-bold text-ink no-underline hover:border-leaf hover:text-leaf-deep focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy"
                  >
                    <Icon />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Together() {
  const { t } = useI18n();
  const copy = t.life.together;

  return (
    <section className="bg-[#e7f3d4] py-[72px]" aria-labelledby="life-together-title">
      <div className="wrap">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <FestiveMark />
          <h2 id="life-together-title" className="mb-4 text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">
            {copy.title}
          </h2>
          <p className="text-[18px]">{copy.lead}</p>
          <p className="mt-3 text-[17px] text-muted">{copy.text}</p>
          <p className="mt-3 text-[17px] font-semibold">{copy.close}</p>
          <p className="mt-4 text-[17px] text-leaf-deep">{copy.choice}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useI18n();
  const copy = t.life.testimonials;
  const [showAll, setShowAll] = useState(false);
  const firstHidden = useRef<HTMLDivElement>(null);
  const focusHidden = useRef(false);

  useEffect(() => {
    if (!showAll || !focusHidden.current) return;
    focusHidden.current = false;
    firstHidden.current?.focus();
  }, [showAll]);

  return (
    <section className="py-[72px]" aria-labelledby="life-testimonials-title">
      <div className="wrap">
        <Reveal className="mb-8 text-center">
          <h2 id="life-testimonials-title" className="text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]">
            {copy.title}
          </h2>
        </Reveal>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {copy.items.map((item, index) => (
            <div
              key={item.paragraphs[0]}
              ref={index === 2 ? firstHidden : undefined}
              tabIndex={index === 2 ? -1 : undefined}
              className={`focus:outline-none ${index >= 2 && !showAll ? "max-md:hidden" : ""}`}
            >
              <TestimonialCard item={item} readMore={copy.readMore} />
            </div>
          ))}
        </div>
        {copy.items.length > 2 && !showAll ? (
          <div className="mt-6 text-center md:hidden">
            <button
              type="button"
              className="btn-lift inline-flex min-h-12 items-center justify-center rounded-full border-2 border-leaf-deep px-6 font-bold text-leaf-deep focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy"
              onClick={() => {
                focusHidden.current = true;
                setShowAll(true);
              }}
            >
              {copy.showMore}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  readMore,
}: {
  item: { paragraphs: readonly string[] };
  readMore: string;
}) {
  const [truncated, setTruncated] = useState(false);
  const previewRef = useRef<HTMLParagraphElement>(null);
  const preview = item.paragraphs.join(" ");

  useLayoutEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const measure = () => setTruncated(textIsClamped(el));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [preview, truncated]);

  if (!truncated) {
    return (
      <blockquote className="rounded-[28px] border border-ivory-line bg-ivory-card p-6 md:p-8">
        <QuoteMark />
        <p ref={previewRef} className="line-clamp-3 text-[17px] leading-[1.5]">
          {preview}
        </p>
      </blockquote>
    );
  }

  return (
    <details className="rounded-[28px] border border-ivory-line bg-ivory-card p-6 [&[open]_.more]:hidden [&[open]_.preview]:hidden md:p-8">
      <summary className="cursor-pointer list-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy [&::-webkit-details-marker]:hidden">
        <QuoteMark />
        <p className="preview line-clamp-3 text-[17px] leading-[1.5]">{preview}</p>
        <span className="more mt-4 inline-flex font-bold text-leaf-deep underline decoration-candy decoration-2 underline-offset-4">
          {readMore}
        </span>
      </summary>
      <div className="grid gap-4">
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[17px] leading-[1.5]">
            {paragraph}
          </p>
        ))}
      </div>
    </details>
  );
}

function QuoteMark() {
  return (
    <span className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-[#e7f3d4] text-leaf-deep" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M10.2 6.5H7.4C5.5 6.5 4 8 4 9.9V14.5h4.2v-3.2c0-.7.6-1.3 1.3-1.3h.7V6.5zm9.8 0h-2.8c-1.9 0-3.4 1.5-3.4 3.4V14.5H18v-3.2c0-.7.6-1.3 1.3-1.3h.7V6.5z" />
      </svg>
    </span>
  );
}

function textIsClamped(el: HTMLElement) {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.classList.remove("line-clamp-3");
  clone.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;display:block;height:auto;max-height:none;overflow:visible;-webkit-line-clamp:unset;width:${el.clientWidth}px;`;
  el.parentElement?.appendChild(clone);
  const clamped = clone.offsetHeight > el.offsetHeight + 1 || el.scrollHeight > el.clientHeight + 1;
  clone.remove();
  return clamped;
}

function Pricing() {
  const { lang, t } = useI18n();
  const { links } = useSiteData();
  const copy = t.life.pricing;
  const includes = copy.includes.filter((item) => lifeConfig.appAccessIncluded || !item.app);
  const contactHref = lifeConfig.contactUrl || (links.supportEmail ? `mailto:${links.supportEmail}` : "");
  const external = contactHref.startsWith("http");

  return (
    <section id="pricing" className="pb-[72px]" aria-labelledby="life-pricing-title">
      <div className="wrap">
        <Reveal>
          <CandyPanel>
            <div className="mx-auto max-w-[640px] text-center">
              <h2 id="life-pricing-title" className="mb-3 text-[clamp(28px,5.6vw,44px)] font-bold leading-[1.1] tracking-[-0.02em]">
                {copy.title}
              </h2>
              <p className="text-[17px] text-muted">{copy.text}</p>
              <p className="mt-6 text-[clamp(40px,8vw,64px)] font-extrabold leading-none tracking-[-0.03em] text-leaf-deep">
                {fillLife("{price}", lang)}
              </p>
              <p className="mt-2 text-muted">{copy.tradition}</p>
              <div className="mx-auto mt-8 max-w-[460px] text-left">
                <p className="mb-3 font-bold">{copy.includesTitle}</p>
                <ul className="grid gap-2.5">
                  {includes.map((item) => (
                    <li key={item.text} className="flex gap-3">
                      <span className="mt-0.5 text-leaf" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <RegisterButton location="pricing" />
              </div>
              <p className="mt-5 text-[15px] text-muted">
                {copy.contact}{" "}
                {contactHref ? (
                  <a
                    href={contactHref}
                    className="font-bold text-leaf-deep underline decoration-candy decoration-2 underline-offset-4"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={() => track("life_contact_click", { season: lifeConfig.season, source: "life_page" })}
                  >
                    {copy.contactCta}
                  </a>
                ) : (
                  <span className="font-bold text-ink">{copy.contactCta}</span>
                )}
              </p>
            </div>
          </CandyPanel>
        </Reveal>
      </div>
    </section>
  );
}

function LifeSticky() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [pricingVisible, setPricingVisible] = useState(false);
  const hidden = heroVisible || pricingVisible || !registrationAvailable();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.getElementById("top");
    const pricing = document.getElementById("pricing");
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0 });
    const pricingObserver = new IntersectionObserver(([entry]) => setPricingVisible(entry.isIntersecting), { threshold: 0.2 });
    if (hero) heroObserver.observe(hero);
    else setHeroVisible(false);
    if (pricing) pricingObserver.observe(pricing);
    return () => {
      heroObserver.disconnect();
      pricingObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ivory-line bg-ivory-card/95 px-3.5 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md transition-transform duration-200 lg:hidden ${
        hidden ? "pointer-events-none translate-y-full" : ""
      }`}
      aria-hidden={hidden}
      inert={hidden}
    >
      <RegisterButton location="sticky" />
    </div>
  );
}

function AboutIcon({ index }: { index: number }) {
  return (
    <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#e7f3d4] text-leaf-deep" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {index === 1 ? (
          <path d="M12 3.8l1.9 4 4.4.6-3.2 3.1.8 4.4L12 13.8 8.1 15.9l.8-4.4L5.7 8.4l4.4-.6z" />
        ) : index === 2 ? (
          <>
            <path d="M14.5 5.5l4 4" />
            <path d="M4.5 19.5l1-4.2L15.2 5.6a1.6 1.6 0 0 1 2.2 0l1 1a1.6 1.6 0 0 1 0 2.2L8.7 18.5z" />
          </>
        ) : (
          <>
            <path d="M7 3.5v3M17 3.5v3" />
            <rect x="4.5" y="6" width="15" height="14" rx="2" />
            <path d="M8 13.2l2.2 2.2 5-5.2" />
          </>
        )}
      </svg>
    </span>
  );
}

function FestiveMark() {
  return (
    <svg viewBox="0 0 120 64" className="mx-auto mb-4 h-16 w-[120px]" aria-hidden="true">
      <path d="M28 58V30a14 14 0 0 1 28 0" fill="none" stroke="#fc3848" strokeWidth="8" strokeLinecap="round" />
      <path d="M28 48v5M36 36v5M44 26v4" stroke="#fffdf8" strokeWidth="3" strokeLinecap="round" />
      <path d="M78 16l2.4 5 5.4.7-4 3.8.9 5.4L78 28.3 73.3 31l.9-5.4-4-3.8 5.4-.7z" fill="#d9a62e" />
      <path d="M100 34l1.6 3.4 3.7.5-2.7 2.6.6 3.7L100 42.5 96.8 44.3l.6-3.7-2.7-2.6 3.7-.5z" fill="#7eb344" />
      <circle cx="104" cy="18" r="4.5" fill="#fc3848" />
      <circle cx="104" cy="18" r="1.6" fill="#fffdf8" />
    </svg>
  );
}
