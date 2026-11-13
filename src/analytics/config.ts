export const GA_ID: string = import.meta.env.VITE_GA_ID ?? "";

export const META_PIXEL_ID: string = import.meta.env.VITE_META_PIXEL_ID ?? "";

export const TRACKING_ENABLED = Boolean(GA_ID || META_PIXEL_ID);
