-- Row Level Security: lock everything down by default, open what's needed.

-- =====================================================================
-- Reference tables: world-readable, admin-write only
-- =====================================================================

alter table public.regions     enable row level security;
alter table public.departments enable row level security;
alter table public.cities      enable row level security;
alter table public.trades      enable row level security;

drop policy if exists "regions are public" on public.regions;
create policy "regions are public" on public.regions
  for select using (true);

drop policy if exists "departments are public" on public.departments;
create policy "departments are public" on public.departments
  for select using (true);

drop policy if exists "cities are public" on public.cities;
create policy "cities are public" on public.cities
  for select using (true);

drop policy if exists "trades are public" on public.trades;
create policy "trades are public" on public.trades
  for select using (true);

-- Writes on reference tables only via service_role (bypasses RLS).

-- =====================================================================
-- Artisans
-- =====================================================================

alter table public.artisans enable row level security;

drop policy if exists "active artisans are public" on public.artisans;
create policy "active artisans are public" on public.artisans
  for select using (status = 'active');

drop policy if exists "artisan can read own profile" on public.artisans;
create policy "artisan can read own profile" on public.artisans
  for select using (auth.uid() = user_id);

drop policy if exists "artisan can update own profile" on public.artisans;
create policy "artisan can update own profile" on public.artisans
  for update
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    -- artisan cannot self-promote to active; status changes go through admin
    and status in ('draft', 'pending', 'archived')
  );

-- Insert and status promotion handled by service_role (admin, claim flow).

-- =====================================================================
-- Reviews
-- =====================================================================

alter table public.reviews enable row level security;

drop policy if exists "published reviews are public" on public.reviews;
create policy "published reviews are public" on public.reviews
  for select using (status = 'published');

drop policy if exists "anyone can submit a review" on public.reviews;
create policy "anyone can submit a review" on public.reviews
  for insert
  with check (
    status = 'pending'
    and rating between 1 and 5
    and length(body) between 20 and 2000
  );

-- Moderation (publish/reject) handled by service_role.

-- =====================================================================
-- Leads
-- =====================================================================

alter table public.leads enable row level security;

drop policy if exists "anyone can submit a lead" on public.leads;
create policy "anyone can submit a lead" on public.leads
  for insert
  with check (
    status = 'new'
    and rgpd_consent = true
  );

-- Reading leads strictly via service_role (PII). No SELECT policy on purpose.

-- =====================================================================
-- Lead dispatches
-- =====================================================================

alter table public.lead_dispatches enable row level security;

drop policy if exists "artisan can read own dispatches" on public.lead_dispatches;
create policy "artisan can read own dispatches" on public.lead_dispatches
  for select using (
    artisan_id in (
      select id from public.artisans where user_id = auth.uid()
    )
  );

drop policy if exists "artisan can update own dispatch status" on public.lead_dispatches;
create policy "artisan can update own dispatch status" on public.lead_dispatches
  for update
  using (
    artisan_id in (
      select id from public.artisans where user_id = auth.uid()
    )
  )
  with check (
    artisan_id in (
      select id from public.artisans where user_id = auth.uid()
    )
  );

-- Insertion handled by service_role (lead dispatch worker).

-- =====================================================================
-- Profiles
-- =====================================================================

alter table public.profiles enable row level security;

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
