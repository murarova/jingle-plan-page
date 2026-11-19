/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_WAYFORPAY_CHECKOUT_URL?: string;
  readonly VITE_WAYFORPAY_STATUS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
