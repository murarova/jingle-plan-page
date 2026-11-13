import { useEffect, useState } from "react";
import { AndroidButton, AppStoreButton } from "@/components/store-buttons";

export function StickyCta() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const hidden = heroVisible || downloadVisible;

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.getElementById("top");
    const download = document.getElementById("download");
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0 });
    const downloadObserver = new IntersectionObserver(([entry]) => setDownloadVisible(entry.isIntersecting), { threshold: 0.2 });
    if (hero) heroObserver.observe(hero);
    else setHeroVisible(false);
    if (download) downloadObserver.observe(download);
    return () => {
      heroObserver.disconnect();
      downloadObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2.5 border-t border-ivory-line bg-ivory-card/95 px-3.5 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md transition-transform duration-200 lg:hidden ${
        hidden ? "pointer-events-none translate-y-full" : ""
      }`}
    >
      <AppStoreButton placement="sticky" compact />
      <AndroidButton tone="page" placement="sticky" compact />
    </div>
  );
}
