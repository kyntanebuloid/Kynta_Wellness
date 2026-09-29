import { NextResponse } from "next/server";
import { sendBookingConfirmationEmails } from "@/lib/email/booking-emails";
import {
  getRazorpayCredentials,
  verifyRazorpaySignature,
} from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];
type PaymentUpdate = Database["public"]["Tables"]["payments"]["Update"];
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

export async function POST(request: Request) {
  let body: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const orderId = body.razorpay_order_id?.trim();
  const paymentId = body.razorpay_payment_id?.trim();
  const signature = body.razorpay_signature?.trim();

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { error: "Missing payment verification fields" },
      { status: 400 },
    );
  }

  let keySecret: string;
  try {
    ({ keySecret } = getRazorpayCredentials());
  } catch {
    return NextResponse.json(
      { error: "Razorpay is not configured" },
      { status: 500 },
    );
  }

  const isValid = verifyRazorpaySignature({
    orderId,
    paymentId,
    signature,
    keySecret,
  });

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid payment signature" },
      { status: 400 },
    );
  }

  try {
    const admin = createAdminClient();

    const { data: paymentRows, error: paymentError } = await admin
      .from("payments")
      .select(
        "id, booking_id, status, razorpay_order_id, amount_cents, currency",
      )
      .eq("razorpay_order_id", orderId)
      .limit(1);

    if (paymentError) {
      return NextResponse.json(
        { error: "Unable to verify payment" },
        { status: 500 },
      );
    }

    const payment = (paymentRows?.[0] ?? null) as Pick<
      PaymentRow,
      | "id"
      | "booking_id"
      | "status"
      | "razorpay_order_id"
      | "amount_cents"
      | "currency"
    > | null;

    if (!payment) {
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 },
      );
    }

    if (payment.status === "completed") {
      return NextResponse.json({
        success: true,
        bookingId: payment.booking_id,
        alreadyProcessed: true,
      });
    }

    if (payment.status !== "pending") {
      return NextResponse.json(
        { error: "Payment is not payable" },
        { status: 409 },
      );
    }

    const paymentUpdate: PaymentUpdate = {
      status: "completed",
      razorpay_payment_id: paymentId,
      amount_cents: payment.amount_cents,
    };

    const { data: updatedPayments, error: paymentUpdateError } = await admin
      .from("payments")
      .update(paymentUpdate)
      .eq("id", payment.id)
      .eq("status", "pending")
      .select("id");

    if (paymentUpdateError || !updatedPayments?.length) {
      return NextResponse.json(
        { error: "Failed to update payment" },
        { status: 500 },
      );
    }

    const bookingUpdate: BookingUpdate = { status: "confirmed" };

    const { error: bookingUpdateError } = await admin
      .from("bookings")
      .update(bookingUpdate)
      .eq("id", payment.booking_id)
      .eq("status", "pending");

    if (bookingUpdateError) {
      return NextResponse.json(
        { error: "Failed to confirm booking" },
        { status: 500 },
      );
    }

    try {
      const { data: bookingRow, error: bookingReadError } = await admin
        .from("bookings")
        .select(
          "id, status, experience_id, booking_date, start_time, end_time, notes, guest_name, guest_email, guest_phone, created_at, updated_at",
        )
        .eq("id", payment.booking_id)
        .maybeSingle();

      const { data: paymentRow, error: paymentReadError } = await admin
        .from("payments")
        .select(
          "amount_cents, currency, status, razorpay_order_id, razorpay_payment_id, updated_at",
        )
        .eq("id", payment.id)
        .maybeSingle();

      if (bookingReadError || paymentReadError || !bookingRow || !paymentRow) {
        console.error(
          `[verify-payment] booking confirmation email skipped bookingId=${payment.booking_id}: unable to load confirmed records`,
          bookingReadError?.message ?? paymentReadError?.message ?? "",
        );
      } else {
        await sendBookingConfirmationEmails({
          booking: bookingRow,
          payment: paymentRow,
        });
      }
    } catch (err) {
      console.error(
        `[verify-payment] booking confirmation email failed bookingId=${payment.booking_id}:`,
        err instanceof Error ? err.message : err,
      );
    }

    return NextResponse.json({
      success: true,
      bookingId: payment.booking_id,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to verify payment" },
      { status: 500 },
    );
  }
}
