import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const protectedRoutes = ["/dashboard", "/profile", "/bookings"];
const authRoutes = ["/auth/login", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Redirect /studio to /studio/structure so the Structure tool loads
  if (pathname === "/studio") {
    const url = request.nextUrl.clone();
    url.pathname = "/studio/structure";
    return NextResponse.redirect(url);
  }

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
