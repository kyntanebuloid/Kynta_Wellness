import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import {
  getAdminBookings,
  parseAdminBookingsQuery,
} from "@/lib/admin/bookings";
import { LogoutButton } from "../logout-button";
import { BookingsPanel } from "./bookings-panel";

export const metadata: Metadata = {
  title: "Bookings",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  await requireAdmin();

  const query = parseAdminBookingsQuery(await searchParams);
  const result = await getAdminBookings(query);

  if (!result.ok) {
    return (
      <div className="container-site py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg border border-kynta-border/40 p-8 text-center">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-kynta-rust mb-2">
            Kynta Admin
          </p>
          <h1 className="font-serif text-2xl text-kynta-charcoal mb-2">
            Bookings unavailable
          </h1>
          <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-6">
            {result.message}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin/bookings"
              className="px-5 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors"
            >
              Try Again
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  }

  return <BookingsPanel data={result.data} />;
}
