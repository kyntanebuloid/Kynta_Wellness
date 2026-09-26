import { getExperiencePricing } from "@/lib/sanity/data";
import type { Booking, Payment } from "@/types/database";
import { getBookingOwnerEmail, sendTransactionalEmail } from "./resend";
import {
  type BookingEmailPayload,
  buildCustomerConfirmationHtml,
  buildOwnerNotificationHtml,
} from "./templates";

export type BookingConfirmationEmailInput = {
  booking: Pick<
    Booking,
    | "id"
    | "status"
    | "experience_id"
    | "booking_date"
    | "start_time"
    | "end_time"
    | "notes"
    | "guest_name"
    | "guest_email"
    | "guest_phone"
    | "created_at"
    | "updated_at"
  >;
  payment: Pick<
    Payment,
    | "amount_cents"
    | "currency"
    | "status"
    | "razorpay_order_id"
    | "razorpay_payment_id"
    | "updated_at"
  >;
  experienceName?: string | null;
};

function parseBookingNotes(notes: string | null): {
  sanctuary: string;
  partySize: string;
  specialRequests: string;
} {
  if (!notes) {
    return { sanctuary: "Not specified", partySize: "", specialRequests: "" };
  }

  const lines = notes.split(/\r?\n/);
  const getPrefixed = (prefix: string): string => {
    const line = lines.find((l) =>
      l.trim().toLowerCase().startsWith(prefix.toLowerCase()),
    );
    if (!line) return "";
    return line.slice(prefix.length).trim();
  };

  const sanctuary = getPrefixed("Destination:");
  const partySize = getPrefixed("Party size:");
  const notesValue = getPrefixed("Notes:");

  return {
    sanctuary: sanctuary || "Not specified",
    partySize,
    specialRequests: notesValue,
  };
}

async function resolveExperienceName(
  booking: BookingConfirmationEmailInput["booking"],
  fallback?: string | null,
): Promise<string> {
  if (fallback?.trim()) {
    return fallback.trim();
  }

  if (!booking.experience_id) {
    return "Kynta Experience";
  }

  try {
    const pricing = await getExperiencePricing(booking.experience_id);
    if (pricing?.title) {
      return pricing.title;
    }
  } catch (err) {
    console.warn(
      "[booking-emails] experience title lookup failed:",
      err instanceof Error ? err.message : err,
    );
  }

  return "Kynta Experience";
}

export async function sendBookingConfirmationEmails(
  input: BookingConfirmationEmailInput,
): Promise<void> {
  try {
    const { booking, payment } = input;

    if (booking.status !== "confirmed") {
      console.warn(
        `[booking-emails] skip bookingId=${booking.id} status=${booking.status} (not confirmed)`,
      );
      return;
    }

    if (payment.status !== "completed") {
      console.warn(
        `[booking-emails] skip bookingId=${booking.id} paymentStatus=${payment.status} (not completed)`,
      );
      return;
    }

    const parsed = parseBookingNotes(booking.notes);
    const experienceName = await resolveExperienceName(
      booking,
      input.experienceName,
    );

    const payload: BookingEmailPayload = {
      guestName: booking.guest_name?.trim() || "Guest",
      guestEmail: booking.guest_email?.trim() || null,
      guestPhone: booking.guest_phone?.trim() || null,
      experienceName,
      amountCents: payment.amount_cents,
      currency: payment.currency,
      sanctuary: parsed.sanctuary,
      bookingDate: booking.booking_date,
      startTime: booking.start_time,
      endTime: booking.end_time,
      partySize: parsed.partySize,
      specialRequests: parsed.specialRequests,
      bookingId: booking.id,
      paymentId: payment.razorpay_payment_id || "",
      orderId: payment.razorpay_order_id || "",
      paymentStatus: "Paid / Confirmed",
      bookingStatus: booking.status,
      confirmedAt: payment.updated_at || booking.updated_at,
      createdAt: booking.created_at,
    };

    const idempotencyBase = `kynta-booking-${booking.id}-payment-${payment.razorpay_payment_id || payment.razorpay_order_id || "unknown"}`;

    if (payload.guestEmail) {
      const customerResult = await sendTransactionalEmail({
        to: payload.guestEmail,
        subject: "Kynta Wellness — Your Experience Reservation is Confirmed",
        html: buildCustomerConfirmationHtml(payload),
        idempotencyKey: `${idempotencyBase}-customer`,
      });

      if (customerResult.ok) {
        console.log(
          `[booking-emails] customer email sent bookingId=${booking.id} to=${payload.guestEmail} messageId=${customerResult.id}`,
        );
      } else {
        console.error(
          `[booking-emails] customer email failed bookingId=${booking.id} to=${payload.guestEmail}: ${customerResult.error}`,
        );
      }
    } else {
      console.warn(
        `[booking-emails] customer email skipped bookingId=${booking.id}: missing guest_email`,
      );
    }

    const ownerEmail = getBookingOwnerEmail();
    if (!ownerEmail) {
      console.warn(
        `[booking-emails] owner email skipped bookingId=${booking.id}: missing BOOKING_OWNER_EMAIL`,
      );
    } else {
      const ownerResult = await sendTransactionalEmail({
        to: ownerEmail,
        subject: `New Kynta Wellness Booking — ${experienceName}`,
        html: buildOwnerNotificationHtml(payload),
        idempotencyKey: `${idempotencyBase}-owner`,
      });

      if (ownerResult.ok) {
        console.log(
          `[booking-emails] owner email sent bookingId=${booking.id} to=${ownerEmail} messageId=${ownerResult.id}`,
        );
      } else {
        console.error(
          `[booking-emails] owner email failed bookingId=${booking.id} to=${ownerEmail}: ${ownerResult.error}`,
        );
      }
    }
  } catch (err) {
    console.error(
      "[booking-emails] unexpected failure (payment remains successful):",
      err instanceof Error ? err.message : err,
    );
  }
}
