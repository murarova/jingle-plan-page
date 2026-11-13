import { renderToString } from "react-dom/server";
import { App } from "@/App";
import type { Lang } from "@/types/lang";
import type { SiteData } from "@/types/site-data";

export { buildHead, langUrl } from "@/seo/head";
export { LANGS } from "@/types/lang";

export function render(lang: Lang, data: SiteData): string {
  return renderToString(<App lang={lang} data={data} />);
}
