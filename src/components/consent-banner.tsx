import { TRACKING_ENABLED } from "@/analytics/config";
import { acceptConsent, declineConsent } from "@/analytics/track";
import { useConsent } from "@/hooks/use-consent";
import { useI18n } from "@/hooks/use-i18n";

export function ConsentBanner() {
  const { t } = useI18n();
  const { consent, ready } = useConsent();

  if (!TRACKING_ENABLED || !ready || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label={t.consent.label}
      className="fixed inset-x-3 bottom-[84px] z-[60] mx-auto flex max-w-[640px] flex-wrap items-center justify-between gap-3 rounded-2xl border border-ivory-line bg-ivory-card p-4 text-sm shadow-[0_12px_40px_rgba(0,0,0,0.2)] lg:bottom-4"
    >
      <p className="min-w-[200px] flex-1">{t.consent.text}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={declineConsent}
          className="min-h-11 cursor-pointer rounded-xl border border-ivory-line bg-ivory-card px-4 font-semibold"
        >
          {t.consent.decline}
        </button>
        <button
          type="button"
          onClick={acceptConsent}
          className="min-h-11 cursor-pointer rounded-xl bg-leaf-deep px-4 font-semibold text-white"
        >
          {t.consent.accept}
        </button>
      </div>
    </div>
  );
}
