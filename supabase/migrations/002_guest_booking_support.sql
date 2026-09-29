-- Guest booking support
-- Pricing source of truth is Sanity (experience.priceAmount + currency).
-- Supabase does NOT store editable experience prices for checkout.

-- ============================================================
-- 1. Guest bookings: profile_id optional + guest contact fields
-- ============================================================
alter table public.bookings alter column profile_id drop not null;

alter table public.bookings
  add column if not exists guest_name  text,
  add column if not exists guest_email text,
  add column if not exists guest_phone text;

-- ============================================================
-- 2. Sanity experience identifier on bookings (not a UUID FK)
-- ============================================================
alter table public.bookings
  add column if not exists experience_id text;

alter table public.bookings alter column service_id drop not null;

create index if not exists idx_bookings_experience_id
  on public.bookings(experience_id);

-- ============================================================
-- 3. RLS: guests have no session; booking/payment writes go
--    through server-only service-role clients (bypass RLS).
--    payments always store the final charged amount/currency.
-- ============================================================
