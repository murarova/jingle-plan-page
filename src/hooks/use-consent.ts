import { useEffect, useState, useSyncExternalStore } from "react";
import { getConsent, getServerConsent, hydrateConsent, subscribeConsent, type ConsentState } from "@/analytics/consent";

export function useConsent(): { consent: ConsentState; ready: boolean } {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrateConsent();
    setReady(true);
  }, []);

  return { consent, ready };
}
