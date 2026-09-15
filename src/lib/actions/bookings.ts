"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];

export async function createBooking(booking: BookingInsert) {
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
    .insert({ ...booking, profile_id: profile.id })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
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
