export const WAYFORPAY_CHECKOUT_URL =
  import.meta.env.VITE_WAYFORPAY_CHECKOUT_URL ||
  "https://us-central1-advent-calendar-12.cloudfunctions.net/createWayforpayCheckout";

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
