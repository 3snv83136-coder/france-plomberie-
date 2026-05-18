-- News articles auto-generated every 12h by the Vercel cron.

create table if not exists public.news_articles (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  title       text not null,
  meta_title  text not null,
  meta_description text not null,
  excerpt     text not null,
  body        jsonb not null, -- structured content blocks (same shape as GuideBlock)
  type        text not null check (type in ('tarifs', 'saison', 'guide-local', 'actualite')),
  city_slug   text references public.cities(slug) on delete set null,
  trade_slug  text references public.trades(slug) on delete set null,
  reading_minutes integer not null default 4 check (reading_minutes between 1 and 30),
  generator_seed text not null,
  published_at timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

create index if not exists news_articles_published_idx on public.news_articles(published_at desc);
create index if not exists news_articles_city_idx on public.news_articles(city_slug);
create index if not exists news_articles_trade_idx on public.news_articles(trade_slug);
create index if not exists news_articles_type_idx on public.news_articles(type);
-- Idempotent generation: same seed never duplicates.
create unique index if not exists news_articles_seed_uniq on public.news_articles(generator_seed);

alter table public.news_articles enable row level security;

drop policy if exists "news are public" on public.news_articles;
create policy "news are public" on public.news_articles for select using (true);

-- Writes only via service_role (the cron handler).
