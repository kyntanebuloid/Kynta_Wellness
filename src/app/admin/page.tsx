import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { AdminLoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Sign In",
};

const REASON_NOTICES: Record<string, string> = {
  expired: "Your admin session has expired. Please sign in again.",
  unauthenticated: "Please sign in to access the admin panel.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/bookings");
  }

  const params = await searchParams;
  const reason = typeof params.reason === "string" ? params.reason : undefined;
  const notice = reason ? REASON_NOTICES[reason] : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[420px]">
        <div className="flex justify-center mb-6">
          <Link href="/" aria-label="Kynta Wellness home">
            <Image
              src="/kynta-logo.jpg"
              alt="Kynta Wellness Group"
              width={140}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-kynta-border/40 p-6 md:p-7">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-kynta-rust mb-2">
            Kynta Wellness Group
          </p>
          <h1 className="font-serif text-2xl md:text-[26px] leading-tight text-kynta-charcoal mb-2">
            Admin Access
          </h1>
          <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-6">
            Sign in with your Admin User ID and password to review confirmed,
            paid bookings.
          </p>

          <AdminLoginForm notice={notice} />
        </div>

        <p className="text-[11px] leading-[1.6] text-kynta-warm-gray text-center mt-5">
          Private administrative area. Unauthorised access is prohibited.
        </p>
      </div>
    </div>
  );
}
