import { track } from "@/analytics/track";
import { lifeConfig, type LifeCtaLocation } from "@/config/life";
import { useI18n } from "@/hooks/use-i18n";

const toneClass: Record<LifeCtaLocation, string> = {
  hero: "bg-white text-leaf-deep",
  pricing: "bg-candy text-white",
  sticky: "w-full bg-candy text-white",
};

export function registrationAvailable(): boolean {
  return lifeConfig.registrationOpen && lifeConfig.registrationUrl.length > 0;
}

export function RegisterButton({ location }: { location: LifeCtaLocation }) {
  const { t } = useI18n();
  const className =
    "btn-lift inline-flex min-h-14 items-center justify-center rounded-full px-7 text-[17px] font-bold no-underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy";

  if (!registrationAvailable()) {
    return (
      <p className={`${className} cursor-default bg-ivory-badge text-muted ${location === "sticky" ? "w-full" : ""}`} role="status">
        {t.life.closed}
      </p>
    );
  }

  return (
    <a
      href={lifeConfig.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} ${toneClass[location]}`}
      onClick={() =>
        track("life_register_click", {
          season: lifeConfig.season,
          cta_location: location,
          source: "life_page",
        })
      }
    >
      {t.life.cta}
    </a>
  );
}
