function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAmount(amountCents: number, currency: string): string {
  const amount = amountCents / 100;
  if (currency === "INR") {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return `${currency} ${amount.toFixed(2)}`;
}

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  if (!time) return "";
  const parts = time.split(":");
  const hour = Number(parts[0]);
  const minute = parts[1] ?? "00";
  if (Number.isNaN(hour)) return time;
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const COLORS = {
  background: "#f7f5f1",
  card: "#ffffff",
  ink: "#1c1917",
  muted: "#57534e",
  border: "#e7e5e4",
  accent: "#0f766e",
  accentSoft: "#ccfbf1",
  gold: "#a16207",
};

function shell(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kynta Wellness</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.background};font-family:Georgia,'Times New Roman',serif;color:${COLORS.ink};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${COLORS.background};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 20px;border-bottom:1px solid ${COLORS.border};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${COLORS.accent};margin-bottom:8px;">Kynta Wellness</div>
              <div style="font-size:13px;color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;">Premium Ayurvedic Sanctuaries</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid ${COLORS.border};">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${COLORS.muted};">
                Kynta Wellness Private Limited<br />
                This is a transactional message regarding your reservation.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;width:42%;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.muted};">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.ink};">${escapeHtml(value)}</td>
  </tr>`;
}

export type BookingEmailPayload = {
  guestName: string;
  guestEmail: string | null;
  guestPhone: string | null;
  experienceName: string;
  amountCents: number;
  currency: string;
  sanctuary: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  partySize: string;
  specialRequests: string;
  bookingId: string;
  paymentId: string;
  orderId: string;
  paymentStatus: string;
  bookingStatus: string;
  confirmedAt: string | null;
  createdAt: string | null;
};

export function buildCustomerConfirmationHtml(
  payload: BookingEmailPayload,
): string {
  const partySize = payload.partySize || "1";
  const timeSlot =
    formatTime(payload.startTime) && payload.endTime
      ? `${formatTime(payload.startTime)} – ${formatTime(payload.endTime)}`
      : formatTime(payload.startTime);

  const body = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${COLORS.gold};margin-bottom:12px;">Reservation confirmed</div>
    <h1 style="margin:0 0 12px;font-size:28px;line-height:1.25;font-weight:normal;color:${COLORS.ink};">Your experience is reserved</h1>
    <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${COLORS.muted};">
      Dear ${escapeHtml(payload.guestName)}, thank you for choosing Kynta Wellness. Your payment has been received and your booking is confirmed. Our concierge team will be in touch shortly to prepare your sanctuary arrival.
    </p>
    <div style="background:${COLORS.accentSoft};border:1px solid #99f6e4;border-radius:12px;padding:14px 16px;margin-bottom:24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${COLORS.accent};">
      Payment status: <strong>${escapeHtml(payload.paymentStatus)}</strong> · Booking: <strong>${escapeHtml(payload.bookingStatus)}</strong>
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
      ${detailRow("Experience", payload.experienceName)}
      ${detailRow("Price paid", formatAmount(payload.amountCents, payload.currency))}
      ${detailRow("Currency", payload.currency)}
      ${detailRow("Sanctuary destination", payload.sanctuary)}
      ${detailRow("Target date", formatDate(payload.bookingDate))}
      ${detailRow("Time slot", timeSlot)}
      ${detailRow("Party size", partySize)}
      ${detailRow("Phone / WhatsApp", payload.guestPhone || "")}
      ${
        payload.specialRequests
          ? detailRow(
              "Special requests / somatic notes",
              payload.specialRequests,
            )
          : ""
      }
      ${detailRow("Booking reference", payload.bookingId)}
    </table>
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${COLORS.ink};">
      We look forward to welcoming you.
    </p>
    <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.accent};font-weight:bold;">
      Kynta Concierge Team
    </p>
  `;

  return shell(body);
}

export function buildOwnerNotificationHtml(
  payload: BookingEmailPayload,
): string {
  const partySize = payload.partySize || "1";
  const timeSlot =
    formatTime(payload.startTime) && payload.endTime
      ? `${formatTime(payload.startTime)} – ${formatTime(payload.endTime)}`
      : formatTime(payload.startTime);

  const body = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${COLORS.gold};margin-bottom:12px;">New booking notification</div>
    <h1 style="margin:0 0 8px;font-size:26px;line-height:1.25;font-weight:normal;color:${COLORS.ink};">New Kynta Wellness Booking</h1>
    <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${COLORS.muted};">
      A guest has completed payment. Details of the verified transaction are below.
    </p>
    <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:12px;padding:14px 16px;margin-bottom:24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#92400e;">
      Payment status: <strong>${escapeHtml(payload.paymentStatus)}</strong> · Booking status: <strong>${escapeHtml(payload.bookingStatus)}</strong>
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
      ${detailRow("Guest name", payload.guestName)}
      ${detailRow("Guest email", payload.guestEmail || "Not provided")}
      ${detailRow("Guest phone / WhatsApp", payload.guestPhone || "Not provided")}
      ${detailRow("Sanctuary destination", payload.sanctuary)}
      ${detailRow("Experience", payload.experienceName)}
      ${detailRow("Amount charged", formatAmount(payload.amountCents, payload.currency))}
      ${detailRow("Currency", payload.currency)}
      ${detailRow("Target date", formatDate(payload.bookingDate))}
      ${detailRow("Time slot", timeSlot)}
      ${detailRow("Party size", partySize)}
      ${detailRow("Somatic notes / requests", payload.specialRequests || "None")}
      ${detailRow("Booking ID", payload.bookingId)}
      ${detailRow("Razorpay payment ID", payload.paymentId)}
      ${detailRow("Razorpay order ID", payload.orderId)}
      ${detailRow("Payment status", payload.paymentStatus)}
      ${detailRow("Booking created", formatDateTime(payload.createdAt))}
      ${detailRow("Booking confirmed", formatDateTime(payload.confirmedAt))}
    </table>
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:${COLORS.muted};">
      Sent automatically after Razorpay signature verification succeeded.
    </p>
  `;

  return shell(body);
}
