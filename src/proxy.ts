import { type NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin/session-core";
import { createClient } from "@/lib/supabase/server";

const protectedRoutes = ["/dashboard", "/profile", "/bookings"];
const authRoutes = ["/auth/login", "/auth/signup"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /studio to /studio/structure so the Structure tool loads
  if (pathname === "/studio") {
    const url = request.nextUrl.clone();
    url.pathname = "/studio/structure";
    return NextResponse.redirect(url);
  }

  // Admin panel: every /admin/* route requires a valid signed session cookie.
  // Pages verify the session again server-side; this is an early redirect.
  if (pathname.startsWith("/admin/")) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const isSessionValid = await verifyAdminSessionToken(token);

    if (!isSessionValid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      url.searchParams.set("reason", token ? "expired" : "unauthenticated");
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users away from protected routes
  if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth routes
  if (user && authRoutes.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
