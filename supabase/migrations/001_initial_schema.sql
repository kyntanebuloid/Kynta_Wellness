create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. profiles
-- ============================================================
create table public.profiles (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null unique references auth.users(id) on delete cascade,
  first_name text,
  last_name  text,
  email      text not null,
  phone      text,
  role       text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_user_id on public.profiles(user_id);
create index idx_profiles_email on public.profiles(email);
create index idx_profiles_role on public.profiles(role);

-- ============================================================
-- 2. services
-- ============================================================
create table public.services (
  id               uuid primary key default uuid_generate_v4(),
  name             text not null,
  description      text,
  duration_minutes integer not null check (duration_minutes > 0),
  price_cents      integer not null check (price_cents >= 0),
  is_published     boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_services_is_published on public.services(is_published);

-- ============================================================
-- 3. treatments
-- ============================================================
create table public.treatments (
  id               uuid primary key default uuid_generate_v4(),
  service_id       uuid not null references public.services(id) on delete cascade,
  name             text not null,
  description      text,
  duration_minutes integer not null check (duration_minutes > 0),
  price_cents      integer not null check (price_cents >= 0),
  is_published     boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_treatments_service_id on public.treatments(service_id);
create index idx_treatments_is_published on public.treatments(is_published);

-- ============================================================
-- 4. availability
-- ============================================================
create table public.availability (
  id          uuid primary key default uuid_generate_v4(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time  time not null,
  end_time    time not null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_availability_profile_id on public.availability(profile_id);
create index idx_availability_day_of_week on public.availability(day_of_week);

-- ============================================================
-- 5. bookings
-- ============================================================
create table public.bookings (
  id            uuid primary key default uuid_generate_v4(),
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  service_id    uuid not null references public.services(id) on delete restrict,
  treatment_id  uuid references public.treatments(id) on delete set null,
  booking_date  date not null,
  start_time    time not null,
  end_time      time not null,
  status        text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_bookings_profile_id on public.bookings(profile_id);
create index idx_bookings_service_id on public.bookings(service_id);
create index idx_bookings_treatment_id on public.bookings(treatment_id);
create index idx_bookings_booking_date on public.bookings(booking_date);
create index idx_bookings_status on public.bookings(status);

-- ============================================================
-- 6. enquiries
-- ============================================================
create table public.enquiries (
  id         uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  subject    text not null,
  message    text not null,
  status     text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_enquiries_profile_id on public.enquiries(profile_id);
create index idx_enquiries_status on public.enquiries(status);

-- ============================================================
-- 7. payments
-- ============================================================
create table public.payments (
  id                  uuid primary key default uuid_generate_v4(),
  booking_id          uuid not null references public.bookings(id) on delete cascade,
  amount_cents        integer not null check (amount_cents > 0),
  currency            text not null default 'INR',
  status              text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  razorpay_order_id   text,
  razorpay_payment_id text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index idx_payments_booking_id on public.payments(booking_id);
create index idx_payments_status on public.payments(status);

-- ============================================================
-- updated_at trigger function
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.services
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.treatments
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.availability
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.bookings
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.enquiries
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.payments
  for each row execute function public.handle_updated_at();

-- ============================================================
-- Profile auto-creation on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.treatments enable row level security;
alter table public.availability enable row level security;
alter table public.bookings enable row level security;
alter table public.enquiries enable row level security;
alter table public.payments enable row level security;

-- ---------- profiles ----------
-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- ---------- services ----------
-- Public read access for published services
create policy "Anyone can view published services"
  on public.services for select
  using (is_published = true);

-- Admins can manage all services
create policy "Admins can manage services"
  on public.services for all
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- ---------- treatments ----------
-- Public read access for published treatments
create policy "Anyone can view published treatments"
  on public.treatments for select
  using (is_published = true);

-- Admins can manage all treatments
create policy "Admins can manage treatments"
  on public.treatments for all
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- ---------- availability ----------
-- Users can view their own availability
create policy "Users can view own availability"
  on public.availability for select
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- Admins can manage all availability
create policy "Admins can manage availability"
  on public.availability for all
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- ---------- bookings ----------
-- Users can view their own bookings
create policy "Users can view own bookings"
  on public.bookings for select
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- Users can create bookings for themselves
create policy "Users can create own bookings"
  on public.bookings for insert
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- Users can update their own bookings (e.g. cancel)
create policy "Users can update own bookings"
  on public.bookings for update
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  )
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- Admins can manage all bookings
create policy "Admins can manage bookings"
  on public.bookings for all
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- ---------- enquiries ----------
-- Users can view their own enquiries
create policy "Users can view own enquiries"
  on public.enquiries for select
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- Users can create their own enquiries
create policy "Users can create own enquiries"
  on public.enquiries for insert
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- Users can update their own enquiries
create policy "Users can update own enquiries"
  on public.enquiries for update
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  )
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- Admins can manage all enquiries
create policy "Admins can manage enquiries"
  on public.enquiries for all
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- ---------- payments ----------
-- Users can view their own payments (via bookings)
create policy "Users can view own payments"
  on public.payments for select
  using (
    booking_id in (
      select b.id from public.bookings b
      join public.profiles p on p.id = b.profile_id
      where p.user_id = auth.uid()
    )
  );

-- Admins can manage all payments
create policy "Admins can manage payments"
  on public.payments for all
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );
