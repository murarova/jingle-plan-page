export const CALENDAR_YEAR = 2026;

export const CALENDAR_DAYS = 31;

export const CALENDAR_PARTIAL: Record<number, number> = { 2: 0, 5: 0, 18: 40, 20: 25 };

export const CALENDAR_STARS: number[] = [6, 24, 25];

export function decemberFirstOffset(): number {
  const day = new Date(Date.UTC(CALENDAR_YEAR, 11, 1)).getUTCDay();
  return (day + 6) % 7;
}
