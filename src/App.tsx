import { useEffect } from "react";
import { startAnalytics } from "@/analytics/track";
import { ConsentBanner } from "@/components/consent-banner";
import { I18nProvider } from "@/hooks/use-i18n";
import { SiteDataProvider } from "@/hooks/use-site-data";
import { HomePage } from "@/pages/home-page";
import { LifePage } from "@/pages/life-page";
import type { SitePage } from "@/routes";
import type { Lang } from "@/types/lang";
import type { SiteData } from "@/types/site-data";

export function App({ lang, data, page }: { lang: Lang; data: SiteData; page: SitePage }) {
  useEffect(() => {
    startAnalytics(lang);
  }, [lang]);

  return (
    <I18nProvider lang={lang}>
      <SiteDataProvider initial={data}>
        {page === "life" ? <LifePage /> : <HomePage />}
        <ConsentBanner />
      </SiteDataProvider>
    </I18nProvider>
  );
}
