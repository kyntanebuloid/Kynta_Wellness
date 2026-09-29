import { NextResponse } from "next/server";
import {
  createRazorpayClient,
  getRazorpayCredentials,
  isValidInrAmountPaise,
} from "@/lib/razorpay";
import { getExperiencePricing } from "@/lib/sanity/data";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];
type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"];
type PaymentUpdate = Database["public"]["Tables"]["payments"]["Update"];

export async function POST(request: Request) {
  let body: { bookingId?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const bookingId = body.bookingId?.trim();
  if (!bookingId) {
    return NextResponse.json(
      { error: "bookingId is required" },
      { status: 400 },
    );
  }

  try {
    const admin = createAdminClient();

    const { data: bookingRow, error: bookingError } = await admin
      .from("bookings")
      .select("id, status, experience_id")
      .eq("id", bookingId)
      .single();

    if (bookingError || !bookingRow) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const booking = bookingRow as {
      id: string;
      status: string;
      experience_id: string | null;
    };

    if (booking.status === "cancelled" || booking.status === "completed") {
      return NextResponse.json(
        { error: "Booking is not payable" },
        { status: 409 },
      );
    }

    if (!booking.experience_id) {
      return NextResponse.json(
        { error: "Booking has no experience reference" },
        { status: 400 },
      );
    }

    console.log(
      `[create-order] bookingId=${booking.id} experience_id=${booking.experience_id} status=${booking.status}`,
    );

    const pricing = await getExperiencePricing(booking.experience_id);

    if (!pricing) {
      console.warn(
        `[create-order] pricing unavailable bookingId=${booking.id} experience_id=${booking.experience_id}`,
      );
      return NextResponse.json(
        { error: "Bookable experience not available" },
        { status: 400 },
      );
    }

    if (pricing.currency !== "INR") {
      return NextResponse.json(
        { error: "Only INR experiences are supported for Razorpay" },
        { status: 400 },
      );
    }

    const { data: paymentRows, error: paymentListError } = await admin
      .from("payments")
      .select("id, status, razorpay_order_id, amount_cents")
      .eq("booking_id", bookingId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (paymentListError) {
      return NextResponse.json(
        { error: "Failed to load payment record" },
        { status: 500 },
      );
    }

    const existingPayment = (paymentRows?.[0] ?? null) as Pick<
      PaymentRow,
      "id" | "status" | "razorpay_order_id" | "amount_cents"
    > | null;

    if (existingPayment?.status === "completed") {
      return NextResponse.json(
        { error: "Booking already paid" },
        { status: 409 },
      );
    }

    const amountPaise = Math.round(pricing.priceAmount * 100);

    if (!isValidInrAmountPaise(amountPaise)) {
      return NextResponse.json(
        { error: "Invalid experience amount" },
        { status: 400 },
      );
    }

    console.log(
      `[create-order] razorpay order bookingId=${bookingId} experience_id=${booking.experience_id} priceAmount=${pricing.priceAmount} currency=${pricing.currency} amountPaise=${amountPaise}`,
    );

    const razorpay = createRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: bookingId,
      notes: {
        booking_id: bookingId,
        experience_id: booking.experience_id,
      },
    });

    if (!order?.id) {
      return NextResponse.json(
        { error: "Failed to create Razorpay order" },
        { status: 502 },
      );
    }

    if (existingPayment) {
      const updatePayload: PaymentUpdate = {
        amount_cents: amountPaise,
        currency: "INR",
        status: "pending",
        razorpay_order_id: order.id,
        razorpay_payment_id: null,
      };

      const { error: updateError } = await admin
        .from("payments")
        .update(updatePayload)
        .eq("id", existingPayment.id);

      if (updateError) {
        return NextResponse.json(
          { error: "Failed to save payment record" },
          { status: 500 },
        );
      }
    } else {
      const insertPayload: PaymentInsert = {
        booking_id: bookingId,
        amount_cents: amountPaise,
        currency: "INR",
        status: "pending",
        razorpay_order_id: order.id,
      };

      const { error: insertError } = await admin
        .from("payments")
        .insert(insertPayload);

      if (insertError) {
        return NextResponse.json(
          { error: "Failed to save payment record" },
          { status: 500 },
        );
      }
    }

    const { publicKey } = getRazorpayCredentials();

    return NextResponse.json({
      orderId: order.id,
      amount: amountPaise,
      currency: "INR",
      keyId: publicKey,
      serviceName: pricing.title,
    });
  } catch (err) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "Unable to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
