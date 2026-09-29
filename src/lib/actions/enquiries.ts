"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type EnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"];

export async function createEnquiry(enquiry: EnquiryInsert) {
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
    .from("enquiries")
    .insert({ ...enquiry, profile_id: profile.id })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getMyEnquiries() {
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
    .from("enquiries")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data };
}
