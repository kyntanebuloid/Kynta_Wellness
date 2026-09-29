"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  hasAdminCredentials,
  verifyAdminCredentials,
} from "@/lib/admin/session-core";

export type AdminLoginState = { error: string } | null;

function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  if (!hasAdminCredentials()) {
    console.error(
      "[admin-login] ADMIN_USER_ID, ADMIN_PASSWORD and ADMIN_SESSION_SECRET must be set",
    );
    return { error: "Admin access is not configured on this server." };
  }

  const userId = String(formData.get("user-id") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!userId || !password) {
    return { error: "Enter your Admin User ID and password." };
  }

  const isValid = await verifyAdminCredentials(userId, password);

  if (!isValid) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return { error: "Invalid Admin User ID or password." };
  }

  const token = await createAdminSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_SESSION_COOKIE,
    token,
    sessionCookieOptions(ADMIN_SESSION_MAX_AGE_SECONDS),
  );

  redirect("/admin/bookings");
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", sessionCookieOptions(0));
  redirect("/admin");
}
