"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import type {
  AdminBookingListItem,
  AdminBookingsData,
  AdminBookingsQuery,
} from "@/types/admin";
import { LogoutButton } from "../logout-button";

function formatMoney(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatTime(time: string): string {
  return time.length >= 5 ? time.slice(0, 5) : time;
}

function display(value: string | null | undefined): string {
  return value && value.trim().length > 0 ? value : "—";
}

function shortId(id: string): string {
  return `${id.slice(0, 8)}…`;
}

function badgeClasses(status: string): string {
  switch (status) {
    case "confirmed":
    case "completed":
      return "bg-kynta-badge-green text-kynta-teal-dark border-kynta-teal/25";
    case "pending":
      return "bg-kynta-gold/10 text-kynta-gold border-kynta-gold/30";
    case "cancelled":
    case "no_show":
    case "failed":
      return "bg-kynta-rust/5 text-kynta-rust border-kynta-rust/30";
    default:
      return "bg-kynta-section-bg text-kynta-warm-gray border-kynta-border";
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] rounded-full border ${badgeClasses(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-lg border border-kynta-border/40 p-4">
      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-warm-gray">
        {label}
      </p>
      <p className="font-serif text-2xl md:text-[28px] leading-tight text-kynta-charcoal mt-1">
        {value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

function DetailField({
  label,
  value,
  wide = false,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  wide?: boolean;
  mono?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-warm-gray mb-1">
        {label}
      </dt>
      <dd
        className={`text-[13px] leading-[1.6] text-kynta-charcoal ${
          mono ? "font-mono break-all" : "whitespace-pre-wrap break-words"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function BookingDetailModal({
  booking,
  onClose,
}: {
  booking: AdminBookingListItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 bg-kynta-charcoal/40 flex items-end sm:items-center justify-center sm:p-6">
      <div
        className="w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-t-lg sm:rounded-lg border border-kynta-border"
        role="dialog"
        aria-modal="true"
        aria-label={
          booking ? `Booking ${booking.id}` : "Booking details unavailable"
        }
      >
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-kynta-border/60 sticky top-0 bg-white">
          <div>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-rust">
              Booking details
            </p>
            <p className="font-serif text-lg text-kynta-charcoal">
              {booking ? display(booking.guestName) : "Booking not found"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking details"
            className="p-2 -m-1 text-kynta-warm-gray hover:text-kynta-charcoal transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <title>Close</title>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!booking ? (
          <div className="px-5 sm:px-6 py-8 text-center">
            <p className="text-[13px] leading-[1.7] text-kynta-warm-gray">
              This booking is not in the current result set. It may have been
              paid after this page loaded, or filtered out.
            </p>
          </div>
        ) : (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 px-5 sm:px-6 py-5">
            <DetailField label="Booking ID" value={booking.id} wide mono />
            <DetailField
              label="Guest Name"
              value={display(booking.guestName)}
            />
            <DetailField
              label="Guest Email"
              value={display(booking.guestEmail)}
            />
            <DetailField
              label="Phone / WhatsApp"
              value={display(booking.guestPhone)}
            />
            <DetailField
              label="Sanctuary Destination"
              value={display(booking.destination)}
            />
            <DetailField
              label="Experience"
              value={
                <>
                  {display(booking.experienceTitle)}
                  {booking.experienceId && (
                    <span className="block text-[11px] text-kynta-warm-gray font-mono break-all">
                      {booking.experienceId}
                    </span>
                  )}
                </>
              }
              wide
            />
            <DetailField
              label="Experience Price"
              value={formatMoney(booking.priceCents, booking.currency)}
            />
            <DetailField label="Currency" value={booking.currency} />
            <DetailField
              label="Target Date"
              value={formatDate(booking.bookingDate)}
            />
            <DetailField
              label="Time Slot"
              value={`${formatTime(booking.startTime)} – ${formatTime(
                booking.endTime,
              )}`}
            />
            <DetailField
              label="Party Size"
              value={display(booking.partySize)}
            />
            <DetailField
              label="Booking Status"
              value={<StatusBadge status={booking.status} />}
            />
            <DetailField
              label="Payment Status"
              value={<StatusBadge status={booking.paymentStatus} />}
            />
            <DetailField
              label="Razorpay Payment ID"
              value={display(booking.razorpayPaymentId)}
              wide
              mono
            />
            <DetailField
              label="Razorpay Order ID"
              value={display(booking.razorpayOrderId)}
              wide
              mono
            />
            <DetailField
              label="Booking Created At"
              value={formatDateTime(booking.createdAt)}
            />
            <DetailField
              label="Special Requests / Somatic Notes"
              value={display(booking.specialRequests)}
              wide
            />
            {booking.notes && booking.notes !== booking.specialRequests && (
              <DetailField
                label="Booking Notes (raw)"
                value={booking.notes}
                wide
              />
            )}
          </dl>
        )}
      </div>
    </div>
  );
}

export function BookingsPanel({ data }: { data: AdminBookingsData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    items,
    stats,
    experienceOptions,
    total,
    page,
    pageCount,
    pageSize,
    query,
  } = data;

  const selectedBooking =
    selectedId === null
      ? null
      : (items.find((item) => item.id === selectedId) ?? null);

  const closeDetails = useCallback(() => setSelectedId(null), []);

  const buildHref = useCallback(
    (overrides: Partial<AdminBookingsQuery>): string => {
      const next: AdminBookingsQuery = { ...query, ...overrides };
      const params = new URLSearchParams();
      if (next.status === "confirmed") params.set("status", "confirmed");
      if (next.date) params.set("date", next.date);
      if (next.experienceId) params.set("experience", next.experienceId);
      if (next.search) params.set("q", next.search);
      if (next.page > 1) params.set("page", String(next.page));
      const queryString = params.toString();
      return queryString ? `/admin/bookings?${queryString}` : "/admin/bookings";
    },
    [query],
  );

  const navigate = useCallback(
    (href: string) => {
      setSelectedId(null);
      startTransition(() => router.push(href));
    },
    [router],
  );

  const applyForm = useCallback(
    (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const search = String(formData.get("q") ?? "").trim();
      const date = String(formData.get("date") ?? "").trim();
      const experienceId = String(formData.get("experience") ?? "").trim();
      navigate(
        buildHref({
          search: search.length > 0 ? search : null,
          date: date.length > 0 ? date : null,
          experienceId: experienceId.length > 0 ? experienceId : null,
          page: 1,
        }),
      );
    },
    [buildHref, navigate],
  );

  const hasFilters =
    Boolean(query.date) || Boolean(query.experienceId) || Boolean(query.search);

  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  return (
    <div>
      <header className="bg-white border-b border-kynta-border sticky top-0 z-30">
        <div className="container-site py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" aria-label="Kynta Wellness home">
              <Image
                src="/kynta-logo.jpg"
                alt="Kynta Wellness Group"
                width={120}
                height={44}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
            <span className="hidden sm:block pl-3 border-l border-kynta-border text-[10px] font-bold tracking-[0.15em] uppercase text-kynta-rust">
              Admin · Bookings
            </span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="container-site py-6 md:py-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-kynta-rust mb-2">
            Kynta Admin
          </p>
          <h1 className="font-serif text-2xl md:text-[30px] leading-tight text-kynta-charcoal">
            Paid Bookings
          </h1>
          <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mt-1">
            Confirmed bookings with a completed payment, newest first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
          <StatCard label="Total Paid Bookings" value={stats.totalPaid} />
          <StatCard label="Today's Bookings" value={stats.today} />
          <StatCard label="Upcoming Bookings" value={stats.upcoming} />
        </div>

        <div className="bg-white rounded-lg border border-kynta-border/40 p-4 mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={buildHref({ status: "all", page: 1 })}
              className={`px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase rounded-full border transition-colors ${
                query.status === "all"
                  ? "bg-kynta-teal-dark text-white border-kynta-teal-dark"
                  : "bg-white text-kynta-warm-gray border-kynta-border hover:text-kynta-charcoal"
              }`}
            >
              All
            </Link>
            <Link
              href={buildHref({ status: "confirmed", page: 1 })}
              className={`px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase rounded-full border transition-colors ${
                query.status === "confirmed"
                  ? "bg-kynta-teal-dark text-white border-kynta-teal-dark"
                  : "bg-white text-kynta-warm-gray border-kynta-border hover:text-kynta-charcoal"
              }`}
            >
              Confirmed / Paid
            </Link>
          </div>

          <form
            method="get"
            action="/admin/bookings"
            onSubmit={(event) => {
              event.preventDefault();
              applyForm(event.currentTarget);
            }}
            className="flex flex-col md:flex-row md:items-end gap-3"
          >
            <div className="flex-1 min-w-0">
              <label
                htmlFor="admin-search"
                className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
              >
                Search
              </label>
              <input
                id="admin-search"
                name="q"
                type="search"
                defaultValue={query.search ?? ""}
                placeholder="Guest name, email, phone or booking ID"
                className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="admin-date"
                className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
              >
                Date
              </label>
              <input
                id="admin-date"
                name="date"
                type="date"
                defaultValue={query.date ?? ""}
                onChange={(event) => {
                  const form = event.currentTarget.form;
                  if (form) applyForm(form);
                }}
                className="h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors"
              />
            </div>

            <div className="md:w-56">
              <label
                htmlFor="admin-experience"
                className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
              >
                Experience
              </label>
              <select
                id="admin-experience"
                name="experience"
                defaultValue={query.experienceId ?? ""}
                onChange={(event) => {
                  const form = event.currentTarget.form;
                  if (form) applyForm(form);
                }}
                className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors"
              >
                <option value="">All experiences</option>
                {experienceOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="h-10 px-5 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors"
              >
                Apply
              </button>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      buildHref({
                        search: null,
                        date: null,
                        experienceId: null,
                        page: 1,
                      }),
                    )
                  }
                  className="h-10 px-4 text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-charcoal border border-kynta-border rounded-md hover:border-kynta-charcoal transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        <div
          className="transition-opacity"
          aria-busy={isPending}
          style={{ opacity: isPending ? 0.6 : 1 }}
        >
          {items.length === 0 ? (
            <div className="bg-white rounded-lg border border-kynta-border/40 p-10 text-center">
              <p className="font-serif text-xl text-kynta-charcoal mb-2">
                {hasFilters ? "No matching bookings" : "No paid bookings yet"}
              </p>
              <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-5">
                {hasFilters
                  ? "Try a different search, date or experience filter."
                  : "Bookings appear here once their payment is completed and the booking is confirmed."}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      buildHref({
                        search: null,
                        date: null,
                        experienceId: null,
                        page: 1,
                      }),
                    )
                  }
                  className="px-5 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-charcoal border border-kynta-border rounded-md hover:border-kynta-charcoal transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop / tablet table */}
              <div className="hidden md:block bg-white rounded-lg border border-kynta-border/40 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1640px] text-[13px]">
                    <thead>
                      <tr className="bg-kynta-section-bg text-[10px] uppercase tracking-[0.1em] text-kynta-warm-gray">
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Booking ID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Guest Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Sanctuary Destination
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Experience
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Experience Price
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Currency
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Target Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Time Slot
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Party Size
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Special Requests / Somatic Notes
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Booking Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Payment Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Razorpay Payment ID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left font-bold"
                        >
                          Booking Created At
                        </th>
                        <th scope="col" className="px-3 py-3">
                          <span className="sr-only">Details</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-t border-kynta-border/40 align-top hover:bg-kynta-cream/60"
                        >
                          <td className="px-3 py-3 font-mono text-[11px] whitespace-nowrap">
                            {shortId(booking.id)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap font-medium">
                            {display(booking.guestName)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-kynta-warm-gray">
                            {display(booking.guestEmail)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-kynta-warm-gray">
                            {display(booking.guestPhone)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            {display(booking.destination)}
                          </td>
                          <td className="px-3 py-3">
                            <span className="block max-w-[180px] truncate">
                              {display(booking.experienceTitle)}
                            </span>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            {formatMoney(booking.priceCents, booking.currency)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            {booking.currency}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            {formatDate(booking.bookingDate)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            {formatTime(booking.startTime)} –{" "}
                            {formatTime(booking.endTime)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            {display(booking.partySize)}
                          </td>
                          <td className="px-3 py-3">
                            <span className="block max-w-[220px] text-[12px] leading-[1.5] text-kynta-warm-gray line-clamp-2">
                              {display(booking.specialRequests)}
                            </span>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            <StatusBadge status={booking.status} />
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            <StatusBadge status={booking.paymentStatus} />
                          </td>
                          <td className="px-3 py-3 font-mono text-[11px] whitespace-nowrap">
                            {display(booking.razorpayPaymentId)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-kynta-warm-gray">
                            {formatDateTime(booking.createdAt)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedId(booking.id)}
                              className="px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-kynta-teal-dark border border-kynta-teal/30 rounded-md hover:bg-kynta-teal-dark hover:text-white transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden flex flex-col gap-3">
                {items.map((booking) => (
                  <button
                    key={booking.id}
                    type="button"
                    onClick={() => setSelectedId(booking.id)}
                    className="text-left bg-white rounded-lg border border-kynta-border/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-[16px] text-kynta-charcoal truncate">
                          {display(booking.guestName)}
                        </p>
                        <p className="text-[12px] text-kynta-warm-gray truncate">
                          {display(booking.guestEmail)}
                        </p>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[12px]">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-kynta-warm-gray">
                          Experience
                        </span>
                        <span className="text-kynta-charcoal">
                          {display(booking.experienceTitle)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-kynta-warm-gray">
                          Target Date
                        </span>
                        <span className="text-kynta-charcoal">
                          {formatDate(booking.bookingDate)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-kynta-warm-gray">
                          Time Slot
                        </span>
                        <span className="text-kynta-charcoal">
                          {formatTime(booking.startTime)} –{" "}
                          {formatTime(booking.endTime)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-kynta-warm-gray">
                          Destination
                        </span>
                        <span className="text-kynta-charcoal">
                          {display(booking.destination)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-kynta-warm-gray">
                          Price
                        </span>
                        <span className="text-kynta-charcoal">
                          {formatMoney(booking.priceCents, booking.currency)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-kynta-warm-gray">
                          Payment
                        </span>
                        <StatusBadge status={booking.paymentStatus} />
                      </div>
                    </div>

                    <span className="mt-3 inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-teal">
                      View details →
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] text-kynta-warm-gray">
                <span>
                  Showing {rangeStart}–{rangeEnd} of{" "}
                  {total.toLocaleString("en-IN")} bookings
                </span>
                {isPending && <span>Refreshing…</span>}
              </div>

              {pageCount > 1 && (
                <nav
                  className="mt-4 flex items-center justify-between gap-3"
                  aria-label="Bookings pagination"
                >
                  {page > 1 ? (
                    <Link
                      href={buildHref({ page: page - 1 })}
                      className="px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-charcoal border border-kynta-border rounded-md hover:border-kynta-charcoal transition-colors"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-warm-gray/60 border border-kynta-border/50 rounded-md">
                      ← Previous
                    </span>
                  )}

                  <span className="text-[12px] text-kynta-warm-gray">
                    Page {page} of {pageCount}
                  </span>

                  {page < pageCount ? (
                    <Link
                      href={buildHref({ page: page + 1 })}
                      className="px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-charcoal border border-kynta-border rounded-md hover:border-kynta-charcoal transition-colors"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-warm-gray/60 border border-kynta-border/50 rounded-md">
                      Next →
                    </span>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </main>

      {selectedId !== null && (
        <BookingDetailModal booking={selectedBooking} onClose={closeDetails} />
      )}
    </div>
  );
}
