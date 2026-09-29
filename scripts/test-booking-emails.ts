import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import {
  getBookingOwnerEmail,
  sendTransactionalEmail,
} from "../src/lib/email/resend";
import {
  type BookingEmailPayload,
  buildCustomerConfirmationHtml,
  buildOwnerNotificationHtml,
} from "../src/lib/email/templates";

async function main() {
  const to = process.env.TEST_EMAIL_TO || process.env.BOOKING_OWNER_EMAIL;
  if (!to) {
    console.error(
      "Set TEST_EMAIL_TO or BOOKING_OWNER_EMAIL to choose a recipient.",
    );
    process.exit(1);
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.error(
      "Missing RESEND_API_KEY or RESEND_FROM_EMAIL. Add them to .env.local first.",
    );
    process.exit(1);
  }

  const stamp = Date.now();
  const payload: BookingEmailPayload = {
    guestName: "Aarav Mehta",
    guestEmail: to,
    guestPhone: "+91 98765 43210",
    experienceName: "Spa Sojourns",
    amountCents: 850000,
    currency: "INR",
    sanctuary: "Rishikesh Sanctuary",
    bookingDate: "2026-10-12",
    startTime: "10:00",
    endTime: "11:30",
    partySize: "2",
    specialRequests: "Quiet room preferred; light herbal tea after treatment.",
    bookingId: `test-booking-${stamp}`,
    paymentId: `test_payment_${stamp}`,
    orderId: `test_order_${stamp}`,
    paymentStatus: "Paid / Confirmed",
    bookingStatus: "confirmed",
    confirmedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  const customer = await sendTransactionalEmail({
    to,
    subject: "Kynta Wellness — Your Experience Reservation is Confirmed",
    html: buildCustomerConfirmationHtml(payload),
    idempotencyKey: `test-customer-${stamp}`,
  });

  console.log(
    "customer:",
    customer.ok ? `ok id=${customer.id}` : `FAIL ${customer.error}`,
  );

  const owner = getBookingOwnerEmail() || to;
  const ownerResult = await sendTransactionalEmail({
    to: owner,
    subject: `New Kynta Wellness Booking — ${payload.experienceName}`,
    html: buildOwnerNotificationHtml(payload),
    idempotencyKey: `test-owner-${stamp}`,
  });

  console.log(
    "owner:",
    ownerResult.ok ? `ok id=${ownerResult.id}` : `FAIL ${ownerResult.error}`,
  );

  if (!customer.ok || !ownerResult.ok) {
    process.exit(1);
  }

  console.log(`Sent to ${to} (customer) and ${owner} (owner).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
