import { getBookableExperiences } from "@/lib/sanity/data";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  AdminBookingListItem,
  AdminBookingStats,
  AdminBookingsQuery,
  AdminBookingsResult,
  AdminExperienceOption,
} from "@/types/admin";
import type { BookingStatus, PaymentStatus } from "@/types/database";

export const BOOKINGS_PER_PAGE = 20;

const PAID_BOOKING_STATUSES: BookingStatus[] = ["confirmed", "completed"];
const PAID_SELECT_COLUMNS =
  "id, status, experience_id, booking_date, start_time, end_time, guest_name, guest_email, guest_phone, notes, created_at, payments!inner(status, amount_cents, currency, razorpay_payment_id, razorpay_order_id)";

type PaidBookingRow = {
  id: string;
  status: BookingStatus;
  experience_id: string | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  notes: string | null;
  created_at: string;
  payments: Array<{
    status: PaymentStatus;
    amount_cents: number;
    currency: string;
    razorpay_payment_id: string | null;
    razorpay_order_id: string | null;
  }>;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EXPERIENCE_ID_PATTERN = /^[A-Za-z0-9._-]{1,128}$/;

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function sanitizeSearch(value: string | undefined): string | null {
  if (!value) return null;
  const cleaned = value
    .replace(/["'`,()\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return cleaned.length > 0 ? cleaned : null;
}

export function parseAdminBookingsQuery(
  raw: Record<string, string | string[] | undefined>,
): AdminBookingsQuery {
  const date = firstParam(raw.date);
  const experience = firstParam(raw.experience);
  const pageRaw = firstParam(raw.page);
  const parsedPage = Number.parseInt(pageRaw ?? "", 10);

  return {
    page:
      Number.isFinite(parsedPage) && parsedPage > 0
        ? Math.min(parsedPage, 100000)
        : 1,
    status: firstParam(raw.status) === "confirmed" ? "confirmed" : "all",
    date: date && DATE_PATTERN.test(date) ? date : null,
    experienceId:
      experience && EXPERIENCE_ID_PATTERN.test(experience) ? experience : null,
    search: sanitizeSearch(firstParam(raw.q)),
  };
}

export function todayInKolkata(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export function parseBookingNotes(notes: string | null): {
  destination: string | null;
  partySize: string | null;
  phone: string | null;
  specialRequests: string | null;
} {
  const empty = {
    destination: null,
    partySize: null,
    phone: null,
    specialRequests: null,
  };
  if (!notes?.trim()) return empty;

  const lines = notes.split(/\r?\n/);
  let destination: string | null = null;
  let partySize: string | null = null;
  let phone: string | null = null;
  let specialRequests: string | null = null;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const labelled = line.match(/^(Destination|Party size|Phone):\s*(.*)$/i);
    if (labelled) {
      const value = labelled[2].trim();
      if (value) {
        const label = labelled[1].toLowerCase();
        if (label === "destination") destination = value;
        else if (label === "party size") partySize = value;
        else phone = value;
      }
      continue;
    }

    if (line.startsWith("Notes: ")) {
      const remainder = [line.slice("Notes: ".length), ...lines.slice(i + 1)]
        .join("\n")
        .trim();
      specialRequests = remainder.length > 0 ? remainder : null;
      break;
    }
  }

  if (!destination && !partySize && !phone && !specialRequests) {
    return { ...empty, specialRequests: notes.trim() };
  }

  return { destination, partySize, phone, specialRequests };
}

function buildSearchFilter(search: string): string {
  const clauses = [
    `guest_name.ilike.%${search}%`,
    `guest_email.ilike.%${search}%`,
    `guest_phone.ilike.%${search}%`,
  ];
  if (UUID_PATTERN.test(search)) {
    clauses.push(`id.eq.${search}`);
  }
  return clauses.join(",");
}

function toListItem(
  row: PaidBookingRow,
  experienceTitles: Map<string, string>,
): AdminBookingListItem | null {
  const payment = row.payments?.[0];
  if (!payment || payment.status !== "completed") {
    return null;
  }

  const parsed = parseBookingNotes(row.notes);
  const experienceTitle = row.experience_id
    ? (experienceTitles.get(row.experience_id) ?? row.experience_id)
    : "—";

  return {
    id: row.id,
    guestName: row.guest_name,
    guestEmail: row.guest_email,
    guestPhone: row.guest_phone ?? parsed.phone,
    destination: parsed.destination,
    partySize: parsed.partySize,
    specialRequests: parsed.specialRequests,
    notes: row.notes,
    bookingDate: row.booking_date,
    startTime: row.start_time,
    endTime: row.end_time,
    status: row.status,
    createdAt: row.created_at,
    experienceId: row.experience_id,
    experienceTitle,
    priceCents: payment.amount_cents,
    currency: payment.currency,
    paymentStatus: payment.status,
    razorpayPaymentId: payment.razorpay_payment_id,
    razorpayOrderId: payment.razorpay_order_id,
  };
}

async function fetchExperienceOptions(): Promise<{
  options: AdminExperienceOption[];
  titles: Map<string, string>;
}> {
  try {
    const experiences = await getBookableExperiences();
    const options = experiences.map((experience) => ({
      id: experience.id,
      title: experience.title,
    }));
    const titles = new Map(
      experiences.map((experience) => [experience.id, experience.title]),
    );
    return { options, titles };
  } catch (err) {
    console.error(
      "[admin-bookings] experience lookup failed:",
      err instanceof Error ? err.message : err,
    );
    return { options: [], titles: new Map() };
  }
}

async function fetchStats(
  admin: SupabaseAdmin,
  today: string,
): Promise<AdminBookingStats> {
  const base = () =>
    admin
      .from("bookings")
      .select("id, payments!inner(status)", { count: "exact", head: true })
      .in("status", PAID_BOOKING_STATUSES)
      .eq("payments.status", "completed");

  const [total, todayCount, upcoming] = await Promise.all([
    base(),
    base().eq("booking_date", today),
    base().gt("booking_date", today),
  ]);

  if (total.error || todayCount.error || upcoming.error) {
    throw new Error(
      total.error?.message ??
        todayCount.error?.message ??
        upcoming.error?.message ??
        "stats query failed",
    );
  }

  return {
    totalPaid: total.count ?? 0,
    today: todayCount.count ?? 0,
    upcoming: upcoming.count ?? 0,
  };
}

type SupabaseAdmin = ReturnType<typeof createAdminClient>;

function buildPaidBookingsQuery(
  admin: SupabaseAdmin,
  query: AdminBookingsQuery,
  head = false,
) {
  let builder = admin
    .from("bookings")
    .select(PAID_SELECT_COLUMNS, { count: "exact", head })
    .in(
      "status",
      query.status === "confirmed" ? ["confirmed"] : PAID_BOOKING_STATUSES,
    )
    .eq("payments.status", "completed");

  if (query.date) {
    builder = builder.eq("booking_date", query.date);
  }
  if (query.experienceId) {
    builder = builder.eq("experience_id", query.experienceId);
  }
  if (query.search) {
    builder = builder.or(buildSearchFilter(query.search));
  }

  return builder;
}

async function countPaidBookings(
  admin: SupabaseAdmin,
  query: AdminBookingsQuery,
): Promise<number> {
  const result = await buildPaidBookingsQuery(admin, query, true);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result.count ?? 0;
}

async function fetchBookingsPage(
  admin: SupabaseAdmin,
  query: AdminBookingsQuery,
  page: number,
): Promise<PaidBookingRow[]> {
  const from = (page - 1) * BOOKINGS_PER_PAGE;
  const result = await buildPaidBookingsQuery(admin, query)
    .order("created_at", { ascending: false })
    .range(from, from + BOOKINGS_PER_PAGE - 1);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return (result.data ?? []) as unknown as PaidBookingRow[];
}

export async function getAdminBookings(
  query: AdminBookingsQuery,
): Promise<AdminBookingsResult> {
  try {
    const admin = createAdminClient();
    const today = todayInKolkata();

    const [total, stats, experienceData] = await Promise.all([
      countPaidBookings(admin, query),
      fetchStats(admin, today),
      fetchExperienceOptions(),
    ]);

    const pageCount = Math.max(1, Math.ceil(total / BOOKINGS_PER_PAGE));
    const page = Math.min(Math.max(query.page, 1), pageCount);
    const rows = total > 0 ? await fetchBookingsPage(admin, query, page) : [];

    const items = rows
      .map((row) => toListItem(row, experienceData.titles))
      .filter((item): item is AdminBookingListItem => item !== null);

    return {
      ok: true,
      data: {
        items,
        stats,
        experienceOptions: experienceData.options,
        total,
        page,
        pageCount,
        pageSize: BOOKINGS_PER_PAGE,
        query,
      },
    };
  } catch (err) {
    console.error(
      "[admin-bookings] query failed:",
      err instanceof Error ? err.message : err,
    );
    return {
      ok: false,
      message: "We could not load bookings right now. Please try again.",
    };
  }
}
