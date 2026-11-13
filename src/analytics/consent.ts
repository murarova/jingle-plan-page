export type ConsentState = "granted" | "denied" | null;

const STORAGE_KEY = "jp_consent";

type Listener = () => void;

const listeners = new Set<Listener>();

let current: ConsentState = null;
let hydrated = false;

function readStored(): ConsentState {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function hydrateConsent(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  current = readStored();
  listeners.forEach((listener) => listener());
}

export function getConsent(): ConsentState {
  return current;
}

export function getServerConsent(): ConsentState {
  return null;
}

export function setConsent(state: ConsentState): void {
  current = state;
  try {
    if (state) window.localStorage.setItem(STORAGE_KEY, state);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    current = state;
  }
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
