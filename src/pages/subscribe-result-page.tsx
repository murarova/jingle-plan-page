import { useEffect, useState } from "react";
import hourglass from "@/assets/result-page/loading-hourglass.svg";
import unconfirmedGift from "@/assets/result-page/payment-unconfirmed-gift.svg";
import successGift from "@/assets/result-page/success-gift.svg";
import { Spinner } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ShortHeader } from "@/components/short-header";
import {
  readOrderStatus,
  readRememberedCheckout,
  type RememberedCheckout,
} from "@/config/wayforpay";
import { useI18n } from "@/hooks/use-i18n";
import { homePath } from "@/routes";
import { Footer } from "@/sections/footer";

const heading =
  "text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]";

type Phase = "checking" | "approved" | "declined" | "waiting" | "unknown";

const POLL_MS = 2000;
const POLL_LIMIT = 15;

function withEmail(text: string, email: string) {
  return text.replaceAll("{email}", email);
}

function ResultCard({
  phase,
  email,
  titleId,
}: {
  phase: Phase;
  email: string;
  titleId?: string;
}) {
  const { lang, t } = useI18n();
  const copy = t.subscribe.result;
  const title =
    phase === "approved"
      ? copy.approvedTitle
      : phase === "declined"
        ? copy.declinedTitle
        : phase === "checking"
          ? copy.checkingTitle
          : copy.unconfirmedTitle;
  const body =
    phase === "approved"
      ? withEmail(copy.approvedBody, email)
      : phase === "declined"
        ? copy.declinedBody
        : phase === "checking"
          ? copy.checkingBody
          : copy.unconfirmedBody;
  const illustration =
    phase === "approved"
      ? successGift
      : phase === "checking"
        ? hourglass
        : unconfirmedGift;

  return (
    <div className="relative overflow-hidden rounded-[32px] border-2 border-ivory-line bg-ivory-card px-5 py-12 text-center md:px-12 md:py-16">
      <div className="candy-thin absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-[640px]">
        <div className="mb-6 flex flex-col items-center gap-4">
          <img src={illustration} alt="" className="h-36 w-36" />
          {phase === "checking" ? (
            <Spinner className="h-8 w-8 text-candy" />
          ) : null}
        </div>
        <h1 id={titleId} className={`mb-4 ${heading}`}>
          {title}
        </h1>
        <p className="whitespace-pre-line text-[17px] leading-relaxed text-muted">
          {body}
        </p>
        <a
          href={homePath(lang)}
          className="btn-lift mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-candy px-7 text-[17px] font-bold text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy"
        >
          {copy.home}
        </a>
      </div>
    </div>
  );
}

export function SubscribeResultPage() {
  const [saved, setSaved] = useState<RememberedCheckout | null>(null);
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    const remembered = readRememberedCheckout();
    if (!remembered) {
      setPhase("unknown");
      return;
    }
    setSaved(remembered);
    let stopped = false;
    let attempts = 0;
    let timer = 0;

    const tick = async () => {
      attempts += 1;
      const status = await readOrderStatus(remembered.orderReference).catch(
        () => null,
      );
      if (stopped) return;
      if (status === "approved") {
        setPhase("approved");
        return;
      }
      if (status === "declined" || status === "refunded") {
        setPhase("declined");
        return;
      }
      if (attempts >= POLL_LIMIT) {
        setPhase("waiting");
        return;
      }
      timer = window.setTimeout(() => {
        void tick();
      }, POLL_MS);
    };

    void tick();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, []);

  const email = saved?.email ?? "";

  return (
    <>
      <header id="top" className="hero-bg text-white">
        <ShortHeader />
      </header>
      <main>
        <section
          className="py-[72px]"
          aria-labelledby="payment-result-title"
          aria-busy={phase === "checking"}
        >
          <div className="wrap">
            <Reveal>
              <ResultCard
                phase={phase}
                email={email}
                titleId="payment-result-title"
              />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
