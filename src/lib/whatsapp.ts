// Every WhatsApp chat button opens with this message already typed.

export const WHATSAPP_MESSAGE =
  "Hello Kynta Wellness 🌸\n\nI’d love to explore your wellness and spa experiences. Could you please share the available treatments, pricing, and appointment availability?";

export const WHATSAPP_NUMBER = "917250333494";

/** A wa.me chat link to `number` (default: Kynta reservations) with the message. */
export function whatsappChatUrl(number?: string | null): string {
  const digits = (number ?? "").replace(/\D/g, "") || WHATSAPP_NUMBER;
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

/**
 * Adds the message to a WhatsApp chat link typed in Sanity (wa.me or
 * api.whatsapp.com). Other links, such as a WhatsApp channel, are unchanged.
 */
export function withWhatsappMessage(url: string): string {
  try {
    const parsed = new URL(url);
    const isChat =
      parsed.hostname === "wa.me" ||
      (parsed.hostname.endsWith("whatsapp.com") &&
        parsed.pathname.startsWith("/send"));
    if (!isChat) return url;
    parsed.searchParams.set("text", WHATSAPP_MESSAGE);
    return parsed.toString();
  } catch {
    return url;
  }
}
