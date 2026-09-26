export type UserRole = "customer" | "admin";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type EnquiryStatus = "open" | "in_progress" | "resolved" | "closed";

export type Profile = {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  currency: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Treatment = {
  id: string;
  service_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Availability = {
  id: string;
  profile_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  profile_id: string | null;
  service_id: string | null;
  experience_id: string | null;
  treatment_id: string | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  notes: string | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  created_at: string;
  updated_at: string;
};

export type Enquiry = {
  id: string;
  profile_id: string | null;
  subject: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
};

export type Payment = {
  id: string;
  booking_id: string;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  created_at: string;
  updated_at: string;
};

type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type TableTypes<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: GenericRelationship[];
};

export type Database = {
  public: {
    Tables: {
      profiles: TableTypes<
        Profile,
        Omit<Profile, "id" | "created_at" | "updated_at">,
        Partial<Omit<Profile, "id" | "user_id" | "created_at" | "updated_at">>
      >;
      services: TableTypes<
        Service,
        Omit<Service, "id" | "created_at" | "updated_at">,
        Partial<Omit<Service, "id" | "created_at" | "updated_at">>
      >;
      treatments: TableTypes<
        Treatment,
        Omit<Treatment, "id" | "created_at" | "updated_at">,
        Partial<Omit<Treatment, "id" | "created_at" | "updated_at">>
      >;
      availability: TableTypes<
        Availability,
        Omit<Availability, "id" | "created_at" | "updated_at">,
        Partial<Omit<Availability, "id" | "created_at" | "updated_at">>
      >;
      bookings: TableTypes<
        Booking,
        Omit<
          Booking,
          | "id"
          | "created_at"
          | "updated_at"
          | "guest_name"
          | "guest_email"
          | "guest_phone"
          | "experience_id"
        > & {
          experience_id?: string | null;
          guest_name?: string | null;
          guest_email?: string | null;
          guest_phone?: string | null;
          notes?: string | null;
        },
        Partial<Omit<Booking, "id" | "created_at" | "updated_at">>
      >;
      enquiries: TableTypes<
        Enquiry,
        Omit<Enquiry, "id" | "created_at" | "updated_at">,
        Partial<Omit<Enquiry, "id" | "created_at" | "updated_at">>
      >;
      payments: TableTypes<
        Payment,
        Omit<
          Payment,
          | "id"
          | "created_at"
          | "updated_at"
          | "razorpay_order_id"
          | "razorpay_payment_id"
        > & {
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
        },
        Partial<Omit<Payment, "id" | "created_at" | "updated_at">>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
