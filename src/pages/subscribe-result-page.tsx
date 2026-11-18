import { Reveal } from "@/components/reveal";
import { ShortHeader } from "@/components/short-header";
import { useI18n } from "@/hooks/use-i18n";
import { homePath } from "@/routes";
import { Footer } from "@/sections/footer";

const heading =
  "text-[clamp(26px,5.4vw,40px)] font-bold leading-[1.12] tracking-[-0.02em]";

export function SubscribeResultPage() {
  const { lang, t } = useI18n();
  const copy = t.subscribe.result;

  return (
    <>
      <header id="top" className="hero-bg text-white">
        <ShortHeader />
      </header>
      <main>
        <section className="py-[72px]" aria-labelledby="payment-result-title">
          <div className="wrap">
            <Reveal>
              <div className="relative overflow-hidden rounded-[32px] border-2 border-ivory-line bg-ivory-card px-5 py-12 text-center md:px-12 md:py-16">
                <div className="candy-thin absolute inset-x-0 top-0" aria-hidden="true" />
                <div className="mx-auto max-w-[640px]">
                  <h1 id="payment-result-title" className={`mb-4 ${heading}`}>
                    {copy.title}
                  </h1>
                  <p className="text-[17px] leading-relaxed text-muted">{copy.body}</p>
                  <a
                    href={homePath(lang)}
                    className="btn-lift mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-candy px-7 text-[17px] font-bold text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy"
                  >
                    {copy.home}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
