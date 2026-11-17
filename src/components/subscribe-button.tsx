import { track } from "@/analytics/track";
import { GiftIcon } from "@/components/icons";
import { useI18n } from "@/hooks/use-i18n";
import { subscribePath } from "@/routes";

export function SubscribeButton() {
  const { lang, t } = useI18n();

  return (
    <a
      href={subscribePath(lang)}
      className="btn-lift inline-flex h-14 items-center gap-2.5 rounded-xl bg-ivory-card px-3.5 no-underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-candy"
      onClick={() => track("click_buy_subscription", { placement: "hero" })}
    >
      <GiftIcon className="h-7 w-7 text-candy" />
      <span className="grid leading-none">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-leaf-deep">
          {t.hero.subscribeBrand}
        </span>
        <span className="mt-1 text-[16px] font-extrabold tracking-[-0.02em] text-ink">{t.hero.subscribeCta}</span>
      </span>
    </a>
  );
}
