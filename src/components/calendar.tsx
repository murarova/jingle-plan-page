import { CALENDAR_DAYS, CALENDAR_PARTIAL, CALENDAR_STARS, decemberFirstOffset } from "@/config/calendar";
import { useI18n } from "@/hooks/use-i18n";

export function Calendar() {
  const { t } = useI18n();
  const offset = decemberFirstOffset();
  const days = Array.from({ length: CALENDAR_DAYS }, (_, index) => index + 1);

  return (
    <div
      role="img"
      aria-label={t.calendar.label}
      className="relative z-[2] w-full max-w-[440px] justify-self-center rounded-[28px] border border-ivory-line bg-ivory-card px-3.5 pb-[22px] pt-[18px] text-ink shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
    >
      <div className="px-1.5 pb-3 font-bold">{t.calendar.title}</div>
      <div className="grid grid-cols-7 justify-items-center gap-2" aria-hidden="true">
        {t.calendar.weekdays.map((day) => (
          <span key={day} className="pb-1 text-xs text-muted">
            {day}
          </span>
        ))}
        {Array.from({ length: offset }, (_, index) => (
          <span key={`gap-${index}`} />
        ))}
        {days.map((day) => (
          <span
            key={day}
            className={`day${CALENDAR_STARS.includes(day) ? " star" : ""}`}
            style={{ "--p": CALENDAR_PARTIAL[day] ?? 100 } as React.CSSProperties}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}
