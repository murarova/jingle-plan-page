import { renderToString } from "react-dom/server";
import { App } from "@/App";
import type { SitePage } from "@/routes";
import type { Lang } from "@/types/lang";
import type { SiteData } from "@/types/site-data";

export { buildContactsHead, buildHead, buildLifeHead, buildOfferHead, buildPrivacyHead, buildSubscribeHead, buildSubscribeResultHead, langUrl, lifeCanonical } from "@/seo/head";
export { contactsPath, homePath, lifePath, offerPath, privacyPath, subscribePath, subscribeResultPath } from "@/routes";
export { LANGS } from "@/types/lang";

export function render(lang: Lang, data: SiteData, page: SitePage = "home"): string {
  return renderToString(<App lang={lang} data={data} page={page} />);
}
