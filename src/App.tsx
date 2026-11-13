import { useEffect } from "react";
import { startAnalytics } from "@/analytics/track";
import { ConsentBanner } from "@/components/consent-banner";
import { I18nProvider } from "@/hooks/use-i18n";
import { SiteDataProvider } from "@/hooks/use-site-data";
import { Benefits } from "@/sections/benefits";
import { Download } from "@/sections/download";
import { Footer } from "@/sections/footer";
import { Hero } from "@/sections/hero";
import { HowItWorks } from "@/sections/how-it-works";
import { Outcome } from "@/sections/outcome";
import { StickyCta } from "@/sections/sticky-cta";
import type { Lang } from "@/types/lang";
import type { SiteData } from "@/types/site-data";

export function App({ lang, data }: { lang: Lang; data: SiteData }) {
  useEffect(() => {
    startAnalytics(lang);
  }, [lang]);

  return (
    <I18nProvider lang={lang}>
      <SiteDataProvider initial={data}>
        <Hero />
        <main>
          <HowItWorks />
          <Benefits />
          <Outcome />
          <Download />
        </main>
        <Footer />
        <StickyCta />
        <ConsentBanner />
      </SiteDataProvider>
    </I18nProvider>
  );
}
