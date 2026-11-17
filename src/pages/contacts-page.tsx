import type { ReactNode } from "react";
import { track } from "@/analytics/track";
import { ShortHeader } from "@/components/short-header";
import { useI18n } from "@/hooks/use-i18n";
import { useSiteData } from "@/hooks/use-site-data";
import { Footer } from "@/sections/footer";

export function ContactsPage() {
  const { t } = useI18n();
  const { links } = useSiteData();
  const copy = t.subscribe.merchant;
  const phoneHref = `tel:${copy.phoneValue.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <header id="top" className="hero-bg text-white">
        <ShortHeader />
      </header>
      <main className="py-[72px]">
        <div className="wrap">
          <h1 className="mb-8 text-[clamp(32px,6vw,44px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink">
            {copy.contacts}
          </h1>
          <div className="rounded-[32px] border-2 border-ivory-line bg-ivory-card px-5 py-8 md:px-12 md:py-12">
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-x-16">
              <section className="min-w-0" aria-labelledby="contacts-reach">
                <h2 id="contacts-reach" className="mb-5 text-[17px] font-bold text-ink">
                  {copy.contacts}
                </h2>
                <div className="grid gap-5">
                  {links.supportEmail ? (
                    <Contact
                      icon={<MailIcon />}
                      label={copy.email}
                      value={links.supportEmail}
                      href={`mailto:${links.supportEmail}`}
                      onClick={() => track("click_support_email", { placement: "contacts" })}
                    />
                  ) : null}
                  <Contact icon={<PhoneIcon />} label={copy.phone} value={copy.phoneValue} href={phoneHref} />
                </div>
              </section>
              <section className="min-w-0" aria-labelledby="contacts-legal">
                <h2 id="contacts-legal" className="mb-5 text-[17px] font-bold text-ink">
                  {copy.legal}
                </h2>
                <div className="grid gap-5">
                  <Contact icon={<PersonIcon />} label={copy.entity} value={[copy.recipientCode, copy.iban]} />
                  <Contact icon={<PinIcon />} label={copy.location} value={copy.address} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Contact({
  icon,
  label,
  value,
  href,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  value: string | string[];
  href?: string;
  onClick?: () => void;
}) {
  const valueClass = "mt-0.5 text-pretty text-muted [overflow-wrap:anywhere]";
  const lines = Array.isArray(value) ? value : [value];
  const lineClass = (line: string) => (line.length > 28 ? `${valueClass} text-[13px] md:text-base` : valueClass);
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-leaf" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-bold text-ink">{label}</p>
        {lines.map((line) =>
          href ? (
            <a key={line} href={href} className={`${lineClass(line)} no-underline hover:text-ink`} onClick={onClick}>
              {line}
            </a>
          ) : (
            <p key={line} className={lineClass(line)}>
              {line}
            </p>
          ),
        )}
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 4h3l1.5 4-2 1.5a12 12 0 0 0 4 4L16 12l4 1.5V17a2 2 0 0 1-2 2A14 14 0 0 1 5 6a2 2 0 0 1 3-2z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.5c1.2-3 3.4-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}
