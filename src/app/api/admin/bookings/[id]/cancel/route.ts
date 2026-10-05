import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/email/mailer";
import { getBookingOwnerEmail } from "@/lib/email/mailer";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const admin = createAdminClient();

    // Get the booking details
    const { data: booking, error: fetchError } = await admin
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !booking) {
      return Response.json(
        { error: "Booking not found" },
        { status: 404 },
      );
    }

    // Update booking status to cancelled
    const { error: updateError } = await admin
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (updateError) {
      return Response.json(
        { error: updateError.message },
        { status: 500 },
      );
    }

    // Send email to guest
    if (booking.guest_email) {
      const guestEmailResult = await sendTransactionalEmail({
        to: booking.guest_email,
        subject: "Your Kynta Wellness Booking Has Been Cancelled",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a5c57;">Booking Cancelled</h2>
            <p>Dear ${booking.guest_name || "Guest"},</p>
            <p>Your booking has been cancelled by Kynta Wellness.</p>
            <div style="background: #f7f9f7; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Booking ID:</strong> ${booking.id}</p>
              <p style="margin: 8px 0;"><strong>Originally Scheduled:</strong> ${booking.booking_date}</p>
              <p style="margin: 8px 0;"><strong>Status:</strong> Cancelled</p>
            </div>
            <p>If you have any questions, please contact us via WhatsApp or email.</p>
            <p style="color: #6b6b6b; font-size: 12px;">Kynta Wellness Private Limited</p>
          </div>
        `,
      });
      console.log(
        `[cancelBooking] Guest email sent to ${booking.guest_email}: ${guestEmailResult.ok ? "✓" : "✗"}`,
      );
    }

    // Send email to booking owner
    const ownerEmail = getBookingOwnerEmail();
    if (ownerEmail) {
      const ownerEmailResult = await sendTransactionalEmail({
        to: ownerEmail,
        subject: `Booking Cancelled: ${booking.guest_name} - ${booking.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a5c57;">Booking Cancelled</h2>
            <p>A booking has been cancelled through the admin panel.</p>
            <div style="background: #f7f9f7; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Booking ID:</strong> ${booking.id}</p>
              <p style="margin: 8px 0;"><strong>Guest:</strong> ${booking.guest_name || "Unknown"}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${booking.guest_email || "N/A"}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${booking.guest_phone || "N/A"}</p>
              <p style="margin: 8px 0;"><strong>Scheduled Date:</strong> ${booking.booking_date}</p>
            </div>
            <p style="color: #6b6b6b; font-size: 12px;">Kynta Wellness Admin</p>
          </div>
        `,
      });
      console.log(
        `[cancelBooking] Owner email sent to ${ownerEmail}: ${ownerEmailResult.ok ? "✓" : "✗"}`,
      );
    }

    return Response.json(
      { success: true, message: "Booking cancelled and notifications sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[cancelBooking] Error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Cancellation failed" },
      { status: 500 },
    );
  }
}
