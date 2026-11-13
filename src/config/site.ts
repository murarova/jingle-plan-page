export const SITE_NAME = "Jingle Plan";

export const APP_VERSION_FALLBACK = "1.8.0";

export const APK_PATH = "/downloads/jingle-plan.apk";

export const ANDROID_PACKAGE = "com.murarova.jingleplan";

export const SUBSCRIPTION_PRICE = "$12.99";

export function withPrice(text: string): string {
  return text.replace("{price}", SUBSCRIPTION_PRICE);
}
