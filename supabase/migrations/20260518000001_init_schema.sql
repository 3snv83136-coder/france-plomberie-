-- Artisans Près De Chez Vous — Initial schema
-- Idempotent: safe to re-run on a fresh project.

-- =====================================================================
-- Extensions
-- =====================================================================
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";       -- fuzzy text search
create extension if not exists "unaccent";      -- accent-insensitive search

-- =====================================================================
-- Reference data (geo + trades)
-- Kept in DB for FK integrity with artisans (1M+ rows on Sirene import).
-- =====================================================================

create table if not exists public.regions (
  slug          text primary key,
  name          text not null,
  prefecture    text not null,
  population    integer not null check (population >= 0),
  created_at    timestamptz not null default now()
);

create table if not exists public.departments (
  code          text primary key,
  slug          text not null unique,
  name          text not null,
  prefecture    text not null,
  population    integer not null check (population >= 0),
  region_slug   text not null references public.regions(slug) on delete restrict,
  created_at    timestamptz not null default now()
);

create index if not exists departments_region_slug_idx on public.departments(region_slug);

create table if not exists public.cities (
  slug             text primary key,
  name             text not null,
  insee_code       text not null unique,
  postal_code      text not null,
  population       integer not null check (population >= 0),
  lat              numeric(10, 6),
  lng              numeric(10, 6),
  department_code  text not null references public.departments(code) on delete restrict,
  nearby_slugs     text[] not null default '{}',
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

create index if not exists cities_department_idx on public.cities(department_code);
create index if not exists cities_population_idx on public.cities(population desc);
create index if not exists cities_name_trgm_idx  on public.cities using gin (name gin_trgm_ops);

create table if not exists public.trades (
  slug              text primary key,
  name              text not null,
  plural            text not null,
  category          text not null check (category in ('batiment', 'energie', 'exterieur', 'second-oeuvre', 'depannage')),
  schema_type       text not null,
  short_description text not null,
  description       text not null,
  avg_price_unit    text not null,
  avg_price_min     integer not null check (avg_price_min >= 0),
  avg_price_max     integer not null check (avg_price_max >= avg_price_min),
  common_services   jsonb not null default '[]'::jsonb,
  emergency         boolean not null default false,
  icon              text not null,
  faq               jsonb not null default '[]'::jsonb,
  feminine          boolean not null default false,
  created_at        timestamptz not null default now()
);

-- =====================================================================
-- Artisans
-- =====================================================================

create table if not exists public.artisans (
  id                   uuid primary key default uuid_generate_v4(),
  slug                 text not null,
  name                 text not null,
  owner_name           text,
  siret                text unique check (siret ~ '^[0-9]{14}$'),
  trades               text[] not null default '{}',
  city_slug            text references public.cities(slug) on delete set null,
  address              text,
  postal_code          text,
  phone                text,
  email                text,
  description          text,
  rating               numeric(2, 1) check (rating between 0 and 5),
  review_count         integer not null default 0 check (review_count >= 0),
  years_experience     integer check (years_experience >= 0),
  certifications       text[] not null default '{}',
  emergency            boolean not null default false,
  verified             boolean not null default false,
  price_range          smallint check (price_range between 1 and 3),
  response_time_minutes integer check (response_time_minutes >= 0),
  photo_url            text,
  photo_seed           text,
  lat                  numeric(10, 6),
  lng                  numeric(10, 6),
  user_id              uuid references auth.users(id) on delete set null,
  status               text not null default 'draft' check (status in ('draft', 'pending', 'active', 'suspended', 'archived')),
  source               text not null default 'manual' check (source in ('seed', 'sirene', 'claim', 'manual')),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  published_at        timestamptz,
  unique (city_slug, slug)
);

create index if not exists artisans_city_idx       on public.artisans(city_slug);
create index if not exists artisans_trades_gin_idx on public.artisans using gin (trades);
create index if not exists artisans_status_idx     on public.artisans(status) where status = 'active';
create index if not exists artisans_user_id_idx    on public.artisans(user_id);
create index if not exists artisans_rating_idx     on public.artisans(rating desc) where status = 'active';
create index if not exists artisans_name_trgm_idx  on public.artisans using gin (name gin_trgm_ops);

-- =====================================================================
-- Reviews
-- =====================================================================

create table if not exists public.reviews (
  id            uuid primary key default uuid_generate_v4(),
  artisan_id    uuid not null references public.artisans(id) on delete cascade,
  author_name   text not null,
  author_email  text,
  rating        smallint not null check (rating between 1 and 5),
  body          text not null check (length(body) between 20 and 2000),
  status        text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  rejected_reason text,
  lead_id       uuid,
  created_at    timestamptz not null default now(),
  published_at  timestamptz
);

create index if not exists reviews_artisan_published_idx on public.reviews(artisan_id, published_at desc) where status = 'published';
create index if not exists reviews_status_idx on public.reviews(status) where status = 'pending';

-- =====================================================================
-- Leads (devis)
-- =====================================================================

create table if not exists public.leads (
  id            uuid primary key default uuid_generate_v4(),
  trade_slug    text not null references public.trades(slug),
  city_slug     text references public.cities(slug),
  postal_code   text not null check (postal_code ~ '^[0-9]{5}$'),
  description   text not null check (length(description) between 10 and 5000),
  name          text not null check (length(name) between 2 and 120),
  email         text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone         text not null check (phone ~ '^[0-9 +.()-]{8,20}$'),
  rgpd_consent  boolean not null,
  status        text not null default 'new' check (status in ('new', 'qualified', 'dispatched', 'closed', 'spam')),
  source        text,
  ip_address    inet,
  user_agent    text,
  rgpd_consent_at timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  dispatched_at timestamptz,
  closed_at     timestamptz
);

create index if not exists leads_trade_city_idx on public.leads(trade_slug, city_slug);
create index if not exists leads_status_idx     on public.leads(status);
create index if not exists leads_created_idx    on public.leads(created_at desc);

alter table public.reviews
  add constraint reviews_lead_fkey
  foreign key (lead_id) references public.leads(id) on delete set null;

-- =====================================================================
-- Lead dispatch (which artisan got which lead)
-- =====================================================================

create table if not exists public.lead_dispatches (
  id            uuid primary key default uuid_generate_v4(),
  lead_id       uuid not null references public.leads(id) on delete cascade,
  artisan_id    uuid not null references public.artisans(id) on delete cascade,
  status        text not null default 'sent' check (status in ('sent', 'opened', 'quoted', 'declined', 'won', 'lost')),
  quoted_at     timestamptz,
  declined_at   timestamptz,
  amount_cents  bigint check (amount_cents >= 0),
  created_at    timestamptz not null default now(),
  unique (lead_id, artisan_id)
);

create index if not exists lead_dispatches_artisan_idx on public.lead_dispatches(artisan_id);

-- =====================================================================
-- Profiles (extending auth.users for artisan account holders)
-- =====================================================================

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  role        text not null default 'artisan' check (role in ('artisan', 'admin', 'support')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- =====================================================================
-- updated_at trigger
-- =====================================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists artisans_updated_at on public.artisans;
create trigger artisans_updated_at
  before update on public.artisans
  for each row execute function public.handle_updated_at();

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- =====================================================================
-- Auto-create profile on signup
-- =====================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
