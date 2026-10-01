"use server";

import { locationsPageDefaults } from "@/content/locations";
import { list } from "@/content/types";
import { locationSlugOf } from "@/lib/booking/menu";
import {
  getBookingOwnerEmail,
  sendTransactionalEmail,
} from "@/lib/email/mailer";
import {
  buildBookingRequestHtml,
  buildGuestAcknowledgementHtml,
} from "@/lib/email/templates";
import { getLocationsPage } from "@/lib/sanity/data";

// For spas without online prices: the guest's request is emailed to that
// spa's email (Pages → Locations → Email) and always to the Kynta booking
// inbox too, so a request is never lost. "Reply" answers the guest.

export type BookingRequestResult = { ok: true } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 2500;

const field = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);

export async function sendBookingRequest(
  formData: FormData,
): Promise<BookingRequestResult> {
  // Bots fill the hidden "website" field and post instantly; act as if sent.
  const startedAt = Number(formData.get("startedAt"));
  if (
    field(formData, "website", 200) ||
    (startedAt && Date.now() - startedAt < MIN_FILL_MS)
  ) {
    return { ok: true };
  }

  const name = field(formData, "guest-name", 120);
  const email = field(formData, "guest-email", 200);
  const phone = field(formData, "phone", 40);
  if (
    !name ||
    !EMAIL_PATTERN.test(email) ||
    phone.replace(/\D/g, "").length < 7
  ) {
    return {
      ok: false,
      error: "Please enter your name, a valid email and your phone number.",
    };
  }

  // The spa (and its email) is looked up here, never taken from the browser.
  const slug = field(formData, "location", 120);
  const page = await getLocationsPage();
  const location = list(page?.locations, locationsPageDefaults.locations).find(
    (l) => locationSlugOf(l) === slug,
  );
  if (!location) {
    return { ok: false, error: "Please choose a spa location." };
  }

  const spaEmail = location.email?.trim();
  const kyntaEmail =
    process.env.CONTACT_EMAIL?.trim() || getBookingOwnerEmail();
  const to = [
    ...new Set(
      [spaEmail, kyntaEmail].filter(
        (address): address is string =>
          !!address && EMAIL_PATTERN.test(address),
      ),
    ),
  ];
  if (to.length === 0) {
    console.error("[booking-request] no spa email and no BOOKING_OWNER_EMAIL");
    return { ok: false, error: "send" };
  }

  const request = {
    locationName: location.name,
    name,
    email,
    phone,
    treatment: field(formData, "request-treatment", 160),
    date: field(formData, "target-date", 10),
    time: field(formData, "time-slot", 8),
    guests: field(formData, "party-size", 2) || "1",
    message: field(formData, "special-requests", 4000),
  };

  const result = await sendTransactionalEmail({
    to,
    subject: `Booking request: ${location.name} (${name})`,
    html: buildBookingRequestHtml(request),
    replyTo: email,
  });
  if (!result.ok) {
    console.error(`[booking-request] email failed: ${result.error}`);
    return { ok: false, error: "send" };
  }

  // Let the guest know it arrived; replies go to the spa. Best effort only:
  // the spa already has the request.
  const guestCopy = await sendTransactionalEmail({
    to: email,
    subject: `We received your booking request – ${location.name}`,
    html: buildGuestAcknowledgementHtml({
      name,
      heading: "We received your booking request",
      intro: `thank you for your request to visit ${location.name}. Nothing has been paid yet. The spa team will call or email you soon to confirm the treatment, time and price.`,
      rows: [
        ["Spa", location.name],
        ["Treatment wanted", request.treatment || "Not specified"],
        ["Preferred date", request.date || "Flexible"],
        ["Preferred time", request.time || "Flexible"],
        ["Guests", request.guests],
        ["Your phone", phone],
      ],
    }),
    replyTo: to[0],
  });
  if (!guestCopy.ok) {
    console.warn(`[booking-request] guest copy failed: ${guestCopy.error}`);
  }
  return { ok: true };
}
