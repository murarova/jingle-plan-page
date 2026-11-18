import { useEffect } from "react";
import { startAnalytics } from "@/analytics/track";
import { ConsentBanner } from "@/components/consent-banner";
import { I18nProvider } from "@/hooks/use-i18n";
import { SiteDataProvider } from "@/hooks/use-site-data";
import { ContactsPage } from "@/pages/contacts-page";
import { HomePage } from "@/pages/home-page";
import { LifePage } from "@/pages/life-page";
import { OfferPage } from "@/pages/offer-page";
import { PrivacyPage } from "@/pages/privacy-page";
import { SubscribePage } from "@/pages/subscribe-page";
import { SubscribeResultPage } from "@/pages/subscribe-result-page";
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
        {page === "life" ? (
          <LifePage />
        ) : page === "subscribe" ? (
          <SubscribePage />
        ) : page === "subscribe-result" ? (
          <SubscribeResultPage />
        ) : page === "privacy" ? (
          <PrivacyPage />
        ) : page === "offer" ? (
          <OfferPage />
        ) : page === "contacts" ? (
          <ContactsPage />
        ) : (
          <HomePage />
        )}
        <ConsentBanner />
      </SiteDataProvider>
    </I18nProvider>
  );
}
