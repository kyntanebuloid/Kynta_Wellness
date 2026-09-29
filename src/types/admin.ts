import type { BookingStatus, PaymentStatus } from "@/types/database";

export type AdminBookingsQuery = {
  page: number;
  status: "all" | "confirmed";
  date: string | null;
  experienceId: string | null;
  search: string | null;
};

export type AdminBookingListItem = {
  id: string;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  destination: string | null;
  partySize: string | null;
  specialRequests: string | null;
  notes: string | null;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  createdAt: string;
  experienceId: string | null;
  experienceTitle: string;
  priceCents: number;
  currency: string;
  paymentStatus: PaymentStatus;
  razorpayPaymentId: string | null;
  razorpayOrderId: string | null;
};

export type AdminBookingStats = {
  totalPaid: number;
  today: number;
  upcoming: number;
};

export type AdminExperienceOption = {
  id: string;
  title: string;
};

export type AdminBookingsData = {
  items: AdminBookingListItem[];
  stats: AdminBookingStats;
  experienceOptions: AdminExperienceOption[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  query: AdminBookingsQuery;
};

export type AdminBookingsResult =
  | { ok: true; data: AdminBookingsData }
  | { ok: false; message: string };
