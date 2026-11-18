import { useState, type FormEvent, type ReactNode } from "react";
import applePay from "@/assets/payments/apple-pay.svg";
import googlePay from "@/assets/payments/google-pay.svg";
import mastercard from "@/assets/payments/mastercard.svg";
import visa from "@/assets/payments/visa.svg";
import { Reveal } from "@/components/reveal";
import { ShortHeader } from "@/components/short-header";
import { readCheckoutPayload, submitPaymentForm, WAYFORPAY_CHECKOUT_URL } from "@/config/wayforpay";
import { useI18n } from "@/hooks/use-i18n";
import { offerPath, privacyPath } from "@/routes";
import { Footer } from "@/sections/footer";

const heading =
  "text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]";
const card = "rounded-[28px] border border-ivory-line bg-ivory-card";

export function SubscribePage() {
  return (
    <>
      <header id="top" className="hero-bg text-white">
        <ShortHeader />
      </header>
      <main>
        <Offer />
        <Steps />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

function Offer() {
  const { lang, t } = useI18n();
  const copy = t.subscribe;
  const terms = offerPath(lang);
  const privacy = privacyPath(lang);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const consent = form.elements.namedItem("consent");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.emailInvalid);
      return;
    }
    if (!(consent instanceof HTMLInputElement) || !consent.checked) {
      setError(copy.consentRequired);
      return;
    }
    setError(null);
    setPending(true);
    try {
      const response = await fetch(WAYFORPAY_CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = readCheckoutPayload(await response.json().catch(() => null));
      if (!response.ok || !payload) {
        setError(copy.payError);
        setPending(false);
        return;
      }
      submitPaymentForm(payload.action, payload.fields);
    } catch {
      setError(copy.payError);
      setPending(false);
    }
  };

  return (
    <section className="py-[72px]" aria-labelledby="offer-title">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border-2 border-ivory-line bg-ivory-card px-5 pb-8 pt-12 md:px-12 md:pb-12 md:pt-16">
            <div className="candy-thin absolute inset-x-0 top-0" aria-hidden="true" />
            <div className="mx-auto max-w-[640px] text-center">
              <h2 id="offer-title" className={`mb-3 ${heading}`}>
                {copy.planTitle}
              </h2>
              <p className="text-[clamp(40px,8vw,64px)] font-extrabold leading-none tracking-[-0.03em] text-leaf-deep">
                {copy.price}
              </p>
              <p className="mt-2 text-[17px] text-muted">{copy.priceNote}</p>
              <p className="text-muted">{copy.priceMonth}</p>
              <ul className="mx-auto mt-8 grid max-w-[460px] gap-3 text-left">
                {copy.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-leaf" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <form
                className="mx-auto mt-8 max-w-[460px] text-left"
                onSubmit={onSubmit}
              >
                <label
                  className="grid gap-1.5 font-bold"
                  htmlFor="subscribe-email"
                >
                  {copy.email}
                  <input
                    id="subscribe-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder={copy.emailPlaceholder}
                    className="min-h-12 rounded-2xl border border-ivory-line bg-ivory-page px-4 text-[16px] font-semibold outline-none placeholder:font-medium placeholder:text-muted/70 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy"
                  />
                </label>
                <p className="mt-1.5 text-[13px] text-muted">
                  {copy.emailHint}
                </p>
                <label className="mt-4 flex items-start gap-2.5 text-[14px] leading-snug text-muted">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={accepted}
                    onChange={(event) => setAccepted(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-leaf-deep"
                  />
                  <span>
                    {copy.consentLead}
                    <ConsentLink href={terms}>{copy.terms}</ConsentLink>
                    {copy.consentMid}
                    <ConsentLink href={privacy}>{copy.privacy}</ConsentLink>.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!accepted || pending}
                  className="btn-lift mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-candy px-7 text-[17px] font-bold text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {pending ? copy.paying : copy.pay}
                </button>
                <PaymentMarks label={copy.paymentMarks} />
                {error ? (
                  <p className="mt-3 text-[14px] font-bold text-candy" role="alert">
                    {error}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Steps() {
  const { t } = useI18n();
  const copy = t.subscribe;

  return (
    <section className="pb-[72px]" aria-labelledby="activate-title">
      <div className="wrap">
        <Reveal className="mb-8 text-center">
          <h2 id="activate-title" className={heading}>
            {copy.activateTitle}
          </h2>
        </Reveal>
        <ol className="grid list-none gap-4 p-0 md:grid-cols-3">
          {copy.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step}
              delay={index * 90}
              className={`${card} flex h-full flex-col items-center px-6 py-7 text-center`}
            >
              <span className="ring-num mx-auto mb-4" aria-hidden="true">
                {index + 1}
              </span>
              <p className="text-[17px] font-bold">{step}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useI18n();
  const copy = t.subscribe;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="pb-[72px]" aria-labelledby="faq-title">
      <div className="wrap">
        <Reveal className="mb-8 text-center">
          <h2 id="faq-title" className={heading}>
            {copy.faqTitle}
          </h2>
        </Reveal>
        <Reveal className={`${card} px-5 md:px-10`}>
          {copy.faq.map((item, index) => {
            const expanded = open === index;
            return (
              <div
                key={item.q}
                className="border-b border-ivory-line last:border-b-0"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-bold"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  {item.q}
                  <Chevron open={expanded} />
                </button>
                {expanded ? (
                  <div className="grid gap-3 pb-5 pr-8 text-muted">
                    {item.before.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.ways ? (
                      <ul className="grid list-disc gap-2 pl-5">
                        {item.ways.map((way) => (
                          <li key={way.label}>
                            <span className="font-bold text-ink">
                              {way.label}
                            </span>{" "}
                            {way.text}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.after?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.warning ? (
                      <p>
                        <mark className="bg-transparent font-bold text-ink shadow-[inset_0_-0.28em_0_var(--color-candy)]">
                          {item.warning.label}
                        </mark>{" "}
                        {item.warning.text}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function ConsentLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (!href) return <span className="font-bold text-ink">{children}</span>;
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-bold text-leaf-deep underline decoration-candy decoration-2 underline-offset-4"
    >
      {children}
    </a>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const paymentMarks = [
  { src: applePay, name: "Apple Pay", className: "h-6" },
  { src: googlePay, name: "Google Pay", className: "h-6" },
  { src: visa, name: "Visa", className: "h-[18px]" },
  { src: mastercard, name: "Mastercard", className: "h-[26px]" },
] as const;

function PaymentMarks({ label }: { label: string }) {
  return (
    <ul className="mt-6 flex list-none items-center justify-center gap-6 px-2 py-0" aria-label={label}>
      {paymentMarks.map((mark) => (
        <li key={mark.name} className="flex items-center">
          <img src={mark.src} alt={mark.name} className={`${mark.className} w-auto`} />
        </li>
      ))}
    </ul>
  );
}
