import type { Lang } from "@/types/lang";

export const lifeConfig = {
  season: 2027,
  reflectionYear: 2026,
  planningYear: 2027,

  startDate: "2026-12-01",
  endDate: "2026-12-31",

  price: 2027,
  currency: "UAH",

  host: "Станіслава Орловська",

  registrationUrl: "https://forms.gle/t6yfwnDDdFJfB8geA",

  contactUrl: "mailto:stanislavaorlovska@gmail.com",
  instagramUrl: "https://www.instagram.com/stanislava_orlovska",
  facebookUrl: "https://www.facebook.com/stanislavaorlovska",

  registrationOpen: true,
  appAccessIncluded: true,
};

const MONTHS: Record<Lang, { nominative: string[]; genitive: string[] }> = {
  uk: {
    nominative: [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ],
    genitive: [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ],
  },
  en: {
    nominative: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    genitive: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
};

interface DateParts {
  y: number;
  m: number;
  d: number;
}

function parseIsoDate(iso: string): DateParts {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

export function formatLifePrice(amount = lifeConfig.price, currency = lifeConfig.currency): string {
  const number = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return currency === "UAH" ? `${number} грн` : `${number} ${currency}`;
}

function lifeTokens(lang: Lang): Record<string, string> {
  const start = parseIsoDate(lifeConfig.startDate);
  const end = parseIsoDate(lifeConfig.endDate);
  const months = MONTHS[lang];
  const sameMonth = start.y === end.y && start.m === end.m;
  const startGen = months.genitive[start.m - 1];
  const endGen = months.genitive[end.m - 1];
  const dateRange = sameMonth ? `${start.d}–${end.d} ${startGen}` : `${start.d} ${startGen} – ${end.d} ${endGen}`;
  const daySpan = sameMonth
    ? lang === "uk"
      ? `${start.d} по ${end.d} ${startGen}`
      : `${start.d}–${end.d} ${startGen}`
    : lang === "uk"
      ? `${start.d} ${startGen} ${start.y} по ${end.d} ${endGen} ${end.y}`
      : `${start.d} ${startGen} ${start.y} – ${end.d} ${endGen} ${end.y}`;

  return {
    season: String(lifeConfig.season),
    reflectionYear: String(lifeConfig.reflectionYear),
    planningYear: String(lifeConfig.planningYear),
    host: lifeConfig.host,
    price: formatLifePrice(),
    dateRange,
    daySpan,
    monthYear: `${months.nominative[start.m - 1]} ${start.y}`,
    startYear: String(start.y),
  };
}

export function fillLife(text: string, lang: Lang): string {
  const tokens = lifeTokens(lang);
  return text.replace(/\{(season|reflectionYear|planningYear|host|price|dateRange|daySpan|monthYear|startYear)\}/g, (match, key: string) => tokens[key] ?? match);
}

export type LifeCtaLocation = "hero" | "pricing" | "sticky";
