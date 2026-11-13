import { track } from "@/analytics/track";
import badge from "@/assets/app-store-badge.svg";
import { AndroidIcon } from "@/components/icons";
import { useI18n } from "@/hooks/use-i18n";
import { useSiteData } from "@/hooks/use-site-data";

type Tone = "hero" | "page";
type Placement = "hero" | "download" | "sticky";

const base =
  "btn-lift inline-flex items-center rounded-xl border-2 border-transparent font-semibold leading-[1.15] no-underline";

const androidToneClass: Record<Tone, string> = {
  hero: "border-white/70 bg-transparent text-white",
  page: "border-[#a6a6a6] bg-black text-white",
};

const disabledClass = "cursor-not-allowed opacity-70 hover:translate-y-0";

const regularClass = "min-h-14 gap-3 px-[22px] py-2.5 text-base";

const compactClass = "h-12 w-36 justify-center gap-2 justify-self-center px-2 text-[15px]";

function Label({ small, name, compact }: { small: string; name: string; compact: boolean }) {
  if (compact) return <span>{name}</span>;
  return (
    <span>
      <small className="block text-[11px] font-medium uppercase tracking-[0.04em] opacity-90">{small}</small>
      {name}
    </span>
  );
}

export function AppStoreButton({ placement, compact = false }: { placement: Placement; compact?: boolean }) {
  const { t } = useI18n();
  const { links } = useSiteData();
  const url = links.ios.url;

  const image = (
    <img
      src={badge}
      alt={t.stores.appStoreAlt}
      width={168}
      height={56}
      className={`block ${compact ? "h-12 w-36" : "h-14 w-auto"}`}
    />
  );
  const wrapperClass = compact ? "justify-self-center" : "";

  if (!url) {
    return (
      <span aria-disabled="true" className={`inline-flex cursor-not-allowed opacity-60 ${wrapperClass}`}>
        {image}
      </span>
    );
  }

  return (
    <a
      href={url}
      rel="noopener"
      className={`btn-lift inline-flex rounded-xl focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy ${wrapperClass}`}
      onClick={() => track("click_app_store", { placement })}
    >
      {image}
    </a>
  );
}

export function AndroidButton({
  tone,
  placement,
  withApkLabel = false,
  compact = false,
}: {
  tone: Tone;
  placement: Placement;
  withApkLabel?: boolean;
  compact?: boolean;
}) {
  const { t } = useI18n();
  const { links, apk } = useSiteData();
  const android = links.android;
  const isApk = android.type === "apk";
  const name = compact ? t.stores.androidShort : isApk && withApkLabel ? t.stores.androidApkName : t.stores.androidName;

  if (isApk && !apk.available) {
    return (
      <span aria-disabled="true" className={`${base} ${androidToneClass[tone]} ${disabledClass} ${compact ? compactClass : regularClass}`}>
        <AndroidIcon className={`${compact ? "h-6 w-6" : "h-8 w-8"} ${tone === "page" ? "text-[#3ddc84]" : "text-white"}`} />
        <Label small={t.stores.comingSoon} name={name} compact={compact} />
      </span>
    );
  }

  const scrollsToInstructions = isApk && placement === "hero";

  const onClick = () => {
    track("click_android_download", {
      placement,
      source: android.type,
      action: scrollsToInstructions ? "scroll" : "download",
    });
    if (isApk && !scrollsToInstructions) {
      fetch(android.url, { method: "HEAD" })
        .then((response) => {
          if (response.ok) track("apk_download_started", { placement, version: apk.version });
        })
        .catch(() => undefined);
    }
  };

  return (
    <a
      href={scrollsToInstructions ? "#android" : android.url}
      rel="noopener"
      {...(isApk && !scrollsToInstructions ? { download: "jingle-plan.apk" } : {})}
      className={`${base} ${androidToneClass[tone]} ${compact ? compactClass : regularClass}`}
      onClick={onClick}
    >
      <AndroidIcon className={`${compact ? "h-6 w-6" : "h-8 w-8"} ${tone === "page" ? "text-[#3ddc84]" : "text-white"}`} />
      <Label small={t.stores.androidSmall} name={name} compact={compact} />
    </a>
  );
}
