import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/email/mailer";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const { newDate, newStartTime, newEndTime } = body;

    if (!newDate || !newStartTime || !newEndTime) {
      return Response.json(
        { error: "Missing date or time" },
        { status: 400 },
      );
    }

    const admin = createAdminClient();

    // Get booking details
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

    const oldDate = booking.booking_date;
    const oldTime = `${booking.start_time} – ${booking.end_time}`;

    // Update booking with new date/time
    const { error: updateError } = await admin
      .from("bookings")
      .update({
        booking_date: newDate,
        start_time: newStartTime,
        end_time: newEndTime,
      })
      .eq("id", id);

    if (updateError) {
      return Response.json(
        { error: updateError.message },
        { status: 500 },
      );
    }

    // Send email to guest
    if (booking.guest_email) {
      await sendTransactionalEmail({
        to: booking.guest_email,
        subject: "Your Kynta Wellness Booking Has Been Rescheduled",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a5c57;">Booking Rescheduled</h2>
            <p>Dear ${booking.guest_name || "Guest"},</p>
            <p>Your booking has been rescheduled.</p>
            <div style="background: #f7f9f7; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Booking ID:</strong> ${booking.id}</p>
              <p style="margin: 8px 0;"><strong>Previous Date:</strong> ${oldDate} at ${oldTime}</p>
              <p style="margin: 8px 0;"><strong>New Date:</strong> ${newDate}</p>
              <p style="margin: 8px 0;"><strong>New Time:</strong> ${newStartTime} – ${newEndTime}</p>
              <p style="margin: 8px 0;"><strong>Experience:</strong> ${booking.experience_id}</p>
            </div>
            <p>If you have any questions, please contact us via WhatsApp or email.</p>
            <p style="color: #6b6b6b; font-size: 12px;">Kynta Wellness Private Limited</p>
          </div>
        `,
      });
    }

    return Response.json(
      { success: true, message: "Booking rescheduled and guest notified" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[rescheduleBooking] Error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Reschedule failed" },
      { status: 500 },
    );
  }
}
