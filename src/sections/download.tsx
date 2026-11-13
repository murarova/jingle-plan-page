import type { ReactNode } from "react";
import { track } from "@/analytics/track";
import { Reveal } from "@/components/reveal";
import { AndroidButton, AppStoreButton } from "@/components/store-buttons";
import { withPrice } from "@/config/site";
import { useI18n } from "@/hooks/use-i18n";
import { useSiteData } from "@/hooks/use-site-data";
import { useTrackOnceInView } from "@/hooks/use-track-once-in-view";

function formatMegabytes(bytes: number, unit: string): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} ${unit}`;
}

function Platform({
  id,
  label,
  text,
  children,
}: {
  id?: string;
  label: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="grid scroll-mt-6 content-start gap-4 rounded-3xl border border-ivory-line bg-ivory-page p-5 md:p-7">
      <div>
        <span className="mb-2 inline-block rounded-full bg-ivory-badge px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.04em] text-muted">
          {label}
        </span>
        <p className="text-[17px] font-semibold">{text}</p>
      </div>
      {children}
    </div>
  );
}

function ApkDetails() {
  const { t } = useI18n();
  const { apk } = useSiteData();
  const copy = t.download.apk;

  if (!apk.available) {
    return <p className="text-[13px] text-muted">{copy.unavailable}</p>;
  }

  return (
    <div className="grid gap-2 text-[13.5px] text-muted">
      <p>
        <b className="text-ink">{copy.version}:</b> {apk.version} ·{" "}
        <b className="text-ink">{copy.size}:</b>{" "}
        {formatMegabytes(apk.sizeBytes, copy.mb)}
      </p>
      <details
        onToggle={(event) => {
          if (event.currentTarget.open) track("open_apk_instructions");
        }}
      >
        <summary className="cursor-pointer py-1 font-semibold text-ink">
          {copy.installTitle}
        </summary>
        <ol className="mt-1.5 grid list-decimal gap-1 pl-5">
          {copy.installSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </details>
      <details>
        <summary className="cursor-pointer py-1 font-semibold text-ink">
          {copy.sha}
        </summary>
        <code className="mt-1.5 block break-all font-mono text-xs text-ink">
          {apk.sha256}
        </code>
      </details>
    </div>
  );
}

export function Download() {
  const { t } = useI18n();
  const { links } = useSiteData();
  const isApk = links.android.type === "apk";
  const platforms = t.download.platforms;
  const sectionRef = useTrackOnceInView<HTMLElement>("view_download");

  return (
    <section id="download" ref={sectionRef} className="py-[72px]">
      <div className="wrap">
        <Reveal className="relative overflow-hidden rounded-[32px] border-2 border-ivory-line bg-ivory-card px-5 pb-8 pt-12 md:px-12 md:pb-12 md:pt-16">
          <div
            className="candy-thin absolute inset-x-0 top-0"
            aria-hidden="true"
          />
          <div className="mx-auto mb-8 max-w-[640px] text-center md:mb-10">
            <h2 className="mb-3 text-[clamp(28px,5.6vw,44px)] font-bold leading-[1.1] tracking-[-0.02em]">
              {t.download.title}
            </h2>
            <p className="text-[17px] text-muted">
              {withPrice(t.download.text)}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <Platform label={platforms.ios.label} text={platforms.ios.text}>
              <div className="flex">
                <AppStoreButton placement="download" />
              </div>
            </Platform>
            <Platform
              id="android"
              label={platforms.android.label}
              text={platforms.android.text}
            >
              <div className="flex">
                <AndroidButton tone="page" placement="download" withApkLabel />
              </div>
              {isApk ? <ApkDetails /> : null}
            </Platform>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
