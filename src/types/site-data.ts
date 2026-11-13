import type { Lang } from "@/types/lang";

export type LocalizedUrl = Record<Lang, string>;

export type AndroidLink =
  | { type: "apk"; url: string }
  | { type: "play"; url: string };

export interface SiteLinks {
  ios: { url: string };
  android: AndroidLink;
  privacy: LocalizedUrl;
  terms: LocalizedUrl;
  supportEmail: string;
  instagram: string;
}

export interface ApkMeta {
  available: boolean;
  version: string;
  sizeBytes: number;
  sha256: string;
}

export interface SiteData {
  links: SiteLinks;
  apk: ApkMeta;
}
