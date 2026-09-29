"use server";

import { getBookableExperiences } from "@/lib/sanity/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];

export type ExperienceOption = {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  currency: string;
  price: string | null;
  duration: string | null;
};

export async function createBooking(booking: BookingInsert) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      return { error: "Profile not found" };
    }

    if (!booking.experience_id?.trim()) {
      return { error: "Experience is required" };
    }

    console.log(
      `[createBooking] auth experience_id=${booking.experience_id.trim()}`,
    );

    const { data, error } = await supabase
      .from("bookings")
      .insert({ ...booking, profile_id: profile.id })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    console.log(
      `[createBooking] stored bookingId=${data.id} experience_id=${data.experience_id}`,
    );
    return { data };
  }

  if (!booking.guest_name?.trim() || !booking.guest_email?.trim()) {
    return { error: "Guest name and email are required" };
  }

  if (!booking.experience_id?.trim() || !booking.booking_date) {
    return { error: "Experience and booking date are required" };
  }

  const admin = createAdminClient();
  const experienceId = booking.experience_id.trim();

  console.log(`[createBooking] guest experience_id=${experienceId}`);

  const guestInsert: BookingInsert = {
    profile_id: null,
    service_id: booking.service_id ?? null,
    experience_id: experienceId,
    treatment_id: booking.treatment_id ?? null,
    booking_date: booking.booking_date,
    start_time: booking.start_time,
    end_time: booking.end_time,
    status: "pending",
    notes: booking.notes ?? null,
    guest_name: booking.guest_name.trim(),
    guest_email: booking.guest_email.trim(),
    guest_phone: booking.guest_phone?.trim() || null,
  };

  const { data, error } = await admin
    .from("bookings")
    .insert(guestInsert)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  console.log(
    `[createBooking] stored bookingId=${data.id} experience_id=${data.experience_id}`,
  );
  return { data };
}

export async function getBookableExperienceOptions() {
  try {
    const experiences = await getBookableExperiences();
    const data: ExperienceOption[] = experiences.map((experience) => ({
      id: experience.id,
      name: experience.title,
      description: null,
      duration_minutes: experience.durationMinutes,
      price_cents: Math.round(experience.priceAmount * 100),
      currency: experience.currency,
      price: experience.price,
      duration: experience.duration,
    }));

    return { data, error: null };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to load experiences",
      data: [] as ExperienceOption[],
    };
  }
}

export async function getMyBookings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return { error: "Profile not found" };
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(name), treatments(name)")
    .eq("profile_id", profile.id)
    .order("booking_date", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function cancelBooking(bookingId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return { error: "Profile not found" };
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("profile_id", profile.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
