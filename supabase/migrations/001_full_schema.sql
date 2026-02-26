-- ============================================================
-- Wealthplan — Complete Site Schema
-- Single authoritative migration. Run after a full DB reset.
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Shared helper: auto-update updated_at ────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- ============================================================
-- 1. ADMIN USERS
-- Links Supabase auth users to dashboard roles.
-- ============================================================
create table admin_users (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'viewer'
              check (role in ('super_admin', 'admin', 'editor', 'viewer')),
  full_name   text,
  email       text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── RLS helper functions ──────────────────────────────────────
-- Is the current JWT user in admin_users?
create or replace function is_admin()
returns boolean language sql security definer as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$;

-- Is the current user a super_admin or admin?
create or replace function is_super_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from admin_users
    where id = auth.uid() and role in ('super_admin', 'admin')
  );
$$;

create trigger trg_admin_users_updated_at
  before update on admin_users
  for each row execute function set_updated_at();

-- Auto-insert a 'viewer' row for every new Supabase auth signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.admin_users (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    'viewer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table admin_users enable row level security;
create policy "Users can read own row"
  on admin_users for select using (id = auth.uid());
create policy "Super admins manage all users"
  on admin_users for all using (is_super_admin()) with check (is_super_admin());


-- ============================================================
-- 2. CALCULATORS
-- One row per financial calculator published on the site.
-- ============================================================
create table calculators (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  description     text,
  category        text not null default 'other'
                  check (category in (
                    'retirement','mortgage','investment','tax',
                    'savings','debt','insurance','budgeting','other'
                  )),
  status          text not null default 'draft'
                  check (status in ('draft','published','archived')),

  -- JSON config: input fields, defaults, formula metadata
  config          jsonb not null default '{}',

  -- SEO
  seo_title       text,
  seo_description text,
  og_image_url    text,
  canonical_url   text,

  -- Embeddability
  embeddable      boolean not null default true,
  embed_color     text default '#0f172a',

  -- Stats
  views_count     bigint not null default 0,
  uses_count      bigint not null default 0,

  -- Authorship
  author_id       uuid references auth.users(id) on delete set null,

  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_calculators_slug   on calculators(slug);
create index idx_calculators_status on calculators(status);
create index idx_calculators_cat    on calculators(category);

create trigger trg_calculators_updated_at
  before update on calculators
  for each row execute function set_updated_at();

alter table calculators enable row level security;
create policy "Public read published calculators"
  on calculators for select using (status = 'published');
create policy "Admins full access to calculators"
  on calculators for all using (is_admin()) with check (is_admin());


-- ── Calculator tags (many-to-many) ───────────────────────────
create table calculator_tags (
  calculator_id uuid not null references calculators(id) on delete cascade,
  tag           text not null,
  primary key (calculator_id, tag)
);

alter table calculator_tags enable row level security;
create policy "Public read calculator tags"
  on calculator_tags for select using (true);
create policy "Admins manage calculator tags"
  on calculator_tags for all using (is_admin()) with check (is_admin());


-- ============================================================
-- 3. CONTENT
-- Blog posts, guides, strategies, comparisons, state guides.
-- ============================================================
create table content (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  slug                text not null unique,
  type                text not null
                      check (type in ('blog','guide','strategy','compare','state')),
  status              text not null default 'draft'
                      check (status in ('draft','published','archived')),

  -- Body
  excerpt             text,
  body                text,
  reading_time        int,
  cover_image_url     text,

  -- SEO
  seo_title           text,
  seo_description     text,
  og_image_url        text,
  canonical_url       text,

  -- Taxonomy
  tags                text[] not null default '{}',
  related_calc_slugs  text[] not null default '{}',

  -- State guides
  state_code          char(2),

  -- Stats
  views_count         bigint not null default 0,
  shares_count        bigint not null default 0,

  -- Authorship
  author_id           uuid references auth.users(id) on delete set null,

  published_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index idx_content_slug      on content(slug);
create index idx_content_type      on content(type);
create index idx_content_status    on content(status);
create index idx_content_tags      on content using gin(tags);
create index idx_content_state     on content(state_code) where state_code is not null;
create index idx_content_published on content(published_at desc) where status = 'published';

create trigger trg_content_updated_at
  before update on content
  for each row execute function set_updated_at();

alter table content enable row level security;
create policy "Public read published content"
  on content for select using (status = 'published');
create policy "Admins full access to content"
  on content for all using (is_admin()) with check (is_admin());


-- ============================================================
-- 4. AFFILIATE LINKS
-- Partner links displayed alongside calculators and content.
-- ============================================================
create table affiliate_links (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  partner           text not null,
  logo_url          text,

  -- Targeting (null = appears on all)
  calculator_slug   text,
  content_slug      text,

  -- URLs
  destination_url   text not null,
  tracking_url      text,

  -- Commission
  status            text not null default 'active'
                    check (status in ('active','paused','inactive')),
  commission_type   text not null default 'cpa'
                    check (commission_type in ('cpa','cpl','cps','flat')),
  commission_value  numeric(12,2) not null default 0,

  -- Stats
  clicks_count      bigint not null default 0,
  conversions_count bigint not null default 0,
  estimated_revenue numeric(12,2) not null default 0,

  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_affiliate_status    on affiliate_links(status);
create index idx_affiliate_calc_slug on affiliate_links(calculator_slug);

create trigger trg_affiliate_updated_at
  before update on affiliate_links
  for each row execute function set_updated_at();

-- Atomic click counter (call from /api/analytics/track)
create or replace function increment_affiliate_click(link_id uuid)
returns void language sql as $$
  update affiliate_links
  set clicks_count = clicks_count + 1, updated_at = now()
  where id = link_id;
$$;

alter table affiliate_links enable row level security;
create policy "Public read active affiliates"
  on affiliate_links for select using (status = 'active');
create policy "Admins full access to affiliates"
  on affiliate_links for all using (is_admin()) with check (is_admin());


-- ============================================================
-- 5. ANALYTICS EVENTS
-- Lightweight event stream (page views, uses, clicks).
-- ============================================================
create table analytics_events (
  id              uuid primary key default gen_random_uuid(),
  event_type      text not null,   -- page_view | calculator_use | affiliate_click | share | embed_load
  page            text,
  calculator_slug text,
  content_slug    text,
  affiliate_id    uuid references affiliate_links(id) on delete set null,
  user_id         uuid references auth.users(id) on delete set null,
  session_id      text,
  ip_address      inet,
  user_agent      text,
  referrer        text,
  country_code    char(2),
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  metadata        jsonb,
  created_at      timestamptz not null default now()
);

create index idx_analytics_event_type   on analytics_events(event_type);
create index idx_analytics_created_at   on analytics_events(created_at desc);
create index idx_analytics_calc_slug    on analytics_events(calculator_slug) where calculator_slug is not null;
create index idx_analytics_content_slug on analytics_events(content_slug)    where content_slug is not null;
create index idx_analytics_session      on analytics_events(session_id)      where session_id is not null;

alter table analytics_events enable row level security;
create policy "Anyone insert analytics events"
  on analytics_events for insert with check (true);
create policy "Admins read analytics events"
  on analytics_events for select using (is_admin());


-- ============================================================
-- 6. CONTACT SUBMISSIONS
-- Contact form submissions from /contact.
-- ============================================================
create table contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  phone       text,
  company     text,
  status      text not null default 'new'
              check (status in ('new','read','replied','spam')),
  replied_by  uuid references auth.users(id) on delete set null,
  replied_at  timestamptz,
  admin_notes text,
  ip_address  inet,
  user_agent  text,
  utm_source  text,
  created_at  timestamptz not null default now()
);

create index idx_contact_status on contact_submissions(status);
create index idx_contact_date   on contact_submissions(created_at desc);

alter table contact_submissions enable row level security;
create policy "Anyone submit contact form"
  on contact_submissions for insert with check (true);
create policy "Admins manage contact submissions"
  on contact_submissions for all using (is_admin()) with check (is_admin());


-- ============================================================
-- 7. SITE SETTINGS
-- Key-value config editable from the admin dashboard.
-- ============================================================
create table site_settings (
  key         text primary key,
  value       jsonb not null,
  description text,
  updated_by  uuid references auth.users(id) on delete set null,
  updated_at  timestamptz not null default now()
);

create trigger trg_site_settings_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

-- Default values
insert into site_settings (key, value, description) values
  ('site_name',         '"Wealthplan"',             'Public site name'),
  ('site_url',          '"https://Wealthplan.com"',  'Canonical domain'),
  ('contact_email',     '"hello@Wealthplan.com"',    'Public contact email'),
  ('adsense_publisher', 'null',                      'Google AdSense publisher ID'),
  ('analytics_enabled', 'true',                      'Enable anonymous event tracking'),
  ('ai_enabled',        'true',                      'Enable Gemini AI features'),
  ('maintenance_mode',  'false',                     'Put site in maintenance mode');

alter table site_settings enable row level security;
create policy "Anyone read site settings"
  on site_settings for select using (true);
create policy "Super admins update site settings"
  on site_settings for all using (is_super_admin()) with check (is_super_admin());


-- ============================================================
-- SEED: Promote yourself to super_admin
-- Find your UUID in Supabase Auth → Users, then run:
--   update admin_users set role = 'super_admin' where id = 'YOUR-UUID';
-- ============================================================
