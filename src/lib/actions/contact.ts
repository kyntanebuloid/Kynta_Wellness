"use server";

import {
  getBookingOwnerEmail,
  sendTransactionalEmail,
} from "@/lib/email/mailer";
import {
  buildContactEnquiryHtml,
  type ContactEnquiryPayload,
} from "@/lib/email/templates";

// Emails the team when someone sends the Contact page form. Goes to
// CONTACT_EMAIL, or BOOKING_OWNER_EMAIL when that isn't set; "Reply" in the
// inbox answers the sender directly.

export type ContactResult = { ok: true } | { ok: false; error: string };

const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  location: 160,
  property: 160,
  city: 80,
  service: 160,
  message: 4000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Real people take a few seconds to fill the form in; bots post instantly.
const MIN_FILL_MS = 2500;

export async function sendContactEnquiry(
  formData: FormData,
): Promise<ContactResult> {
  const value = (key: keyof typeof LIMITS) =>
    String(formData.get(key) ?? "")
      .trim()
      .slice(0, LIMITS[key]);

  // Bots fill the hidden "website" field and post instantly; act as if sent.
  const startedAt = Number(formData.get("startedAt"));
  if (
    String(formData.get("website") ?? "") ||
    (startedAt && Date.now() - startedAt < MIN_FILL_MS)
  ) {
    return { ok: true };
  }

  const payload: ContactEnquiryPayload = {
    type: formData.get("type") === "hotel" ? "hotel" : "guest",
    name: value("name"),
    email: value("email"),
    phone: value("phone"),
    location: value("location"),
    property: value("property"),
    city: value("city"),
    service: value("service"),
    message: value("message"),
  };

  if (!payload.name || !EMAIL_PATTERN.test(payload.email)) {
    return { ok: false, error: "Please enter your name and a valid email." };
  }
  if (payload.type === "hotel" && !payload.property) {
    return { ok: false, error: "Please enter the hotel or property name." };
  }

  const to = process.env.CONTACT_EMAIL?.trim() || getBookingOwnerEmail();
  if (!to) {
    console.error("[contact] Set CONTACT_EMAIL or BOOKING_OWNER_EMAIL");
    return { ok: false, error: "send" };
  }

  const subject =
    payload.type === "hotel"
      ? `Hotel enquiry: ${payload.property}${payload.city ? `, ${payload.city}` : ""}`
      : `Guest enquiry from ${payload.name}`;

  const result = await sendTransactionalEmail({
    to,
    subject,
    html: buildContactEnquiryHtml(payload),
    replyTo: payload.email,
  });
  if (!result.ok) {
    console.error(`[contact] email failed: ${result.error}`);
    return { ok: false, error: "send" };
  }
  return { ok: true };
}
