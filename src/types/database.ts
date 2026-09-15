export type UserRole = "customer" | "admin";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type EnquiryStatus = "open" | "in_progress" | "resolved" | "closed";

export interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Treatment {
  id: string;
  service_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Availability {
  id: string;
  profile_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  profile_id: string;
  service_id: string;
  treatment_id: string | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  profile_id: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">;
        Update: Partial<
          Omit<Profile, "id" | "user_id" | "created_at" | "updated_at">
        >;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Service, "id" | "created_at" | "updated_at">>;
      };
      treatments: {
        Row: Treatment;
        Insert: Omit<Treatment, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Treatment, "id" | "created_at" | "updated_at">>;
      };
      availability: {
        Row: Availability;
        Insert: Omit<Availability, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Availability, "id" | "created_at" | "updated_at">>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>;
      };
      enquiries: {
        Row: Enquiry;
        Insert: Omit<Enquiry, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Enquiry, "id" | "created_at" | "updated_at">>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Payment, "id" | "created_at" | "updated_at">>;
      };
    };
  };
}
