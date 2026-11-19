export const WAYFORPAY_CHECKOUT_URL =
  import.meta.env.VITE_WAYFORPAY_CHECKOUT_URL ||
  "https://us-central1-advent-calendar-12.cloudfunctions.net/createWayforpayCheckout";

export const WAYFORPAY_STATUS_URL =
  import.meta.env.VITE_WAYFORPAY_STATUS_URL ||
  "https://us-central1-advent-calendar-12.cloudfunctions.net/wayforpayOrderStatus";

const CHECKOUT_MEMORY_KEY = "jingle-plan-wayforpay-order";

export type RememberedCheckout = {
  orderReference: string;
  email: string;
};

export function rememberCheckout(fields: Record<string, string>) {
  const orderReference = fields.orderReference;
  const email = fields.clientEmail;
  if (!orderReference || !email) return;
  sessionStorage.setItem(
    CHECKOUT_MEMORY_KEY,
    JSON.stringify({ orderReference, email }),
  );
}

export function readRememberedCheckout(): RememberedCheckout | null {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_MEMORY_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as { orderReference?: unknown; email?: unknown };
    if (typeof value.orderReference !== "string" || typeof value.email !== "string") {
      return null;
    }
    return { orderReference: value.orderReference, email: value.email };
  } catch {
    return null;
  }
}

export async function readOrderStatus(
  orderReference: string,
): Promise<"pending" | "approved" | "declined" | "refunded" | null> {
  const url = new URL(WAYFORPAY_STATUS_URL);
  url.searchParams.set("orderReference", orderReference);
  const response = await fetch(url);
  if (!response.ok) return null;
  const payload = (await response.json().catch(() => null)) as { status?: unknown } | null;
  const status = payload?.status;
  if (
    status === "pending" ||
    status === "approved" ||
    status === "declined" ||
    status === "refunded"
  ) {
    return status;
  }
  return null;
}

export const WAYFORPAY_PAY_ORIGIN = "https://secure.wayforpay.com";

export type WayforpayCheckoutPayload = {
  action: string;
  fields: Record<string, string>;
};

export function readCheckoutPayload(value: unknown): WayforpayCheckoutPayload | null {
  if (!value || typeof value !== "object") return null;
  const record = value as { action?: unknown; fields?: unknown };
  if (typeof record.action !== "string") return null;
  let action: URL;
  try {
    action = new URL(record.action);
  } catch {
    return null;
  }
  if (action.origin !== WAYFORPAY_PAY_ORIGIN) return null;
  if (!record.fields || typeof record.fields !== "object") return null;
  const fields: Record<string, string> = {};
  for (const [name, field] of Object.entries(record.fields)) {
    if (typeof field !== "string") return null;
    fields[name] = field;
  }
  return { action: action.toString(), fields };
}

export function submitPaymentForm(action: string, fields: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;
  form.acceptCharset = "utf-8";
  form.hidden = true;
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.append(input);
  }
  document.body.append(form);
  form.submit();
}
