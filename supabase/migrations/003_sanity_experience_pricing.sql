-- Align bookings with Sanity experience pricing source of truth.
-- Safe to re-run: idempotent; does not undo prior successful statements.

alter table public.bookings
  add column if not exists experience_id text;

alter table public.bookings alter column service_id drop not null;

create index if not exists idx_bookings_experience_id
  on public.bookings(experience_id);

-- Zero legacy seeded service prices (UUID column requires cast for LIKE).
update public.services
set price_cents = 0
where price_cents > 0
  and id::text LIKE 'c0000000-0000-4000-8000-%';
