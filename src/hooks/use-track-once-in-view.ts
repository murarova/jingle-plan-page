import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/analytics/track";

export function useTrackOnceInView<T extends HTMLElement>(event: AnalyticsEvent, threshold = 0.4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        track(event);
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [event, threshold]);

  return ref;
}
