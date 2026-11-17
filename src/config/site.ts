export const SITE_NAME = "Jingle Plan";

export const APP_VERSION_FALLBACK = "1.8.0";

export const APK_PATH = "/downloads/jingle-plan.apk";

export const ANDROID_PACKAGE = "com.murarova.jingleplan";

export const YEAR_PASS_AMOUNT = 599.99;

export const YEAR_PASS_CURRENCY = "UAH";

export const SUBSCRIPTION_AMOUNT = 12.99;

export const SUBSCRIPTION_CURRENCY = "USD";

export const SUBSCRIPTION_PRICE = `$${SUBSCRIPTION_AMOUNT.toFixed(2)}`;

export function withPrice(text: string): string {
  return text.replace("{price}", SUBSCRIPTION_PRICE);
}
