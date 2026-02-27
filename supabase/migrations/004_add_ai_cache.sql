-- Create AI Plan Cache table
create table if not exists ai_plan_cache (
  id uuid primary key default gen_random_uuid(),
  input_hash text not null unique,
  plan_content text not null,
  provider text not null,
  model text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS (Service role will bypass, client only needs to read)
alter table ai_plan_cache enable row level security;

-- Index for fast lookup
create index if not exists ai_plan_cache_hash_idx on ai_plan_cache(input_hash);

-- Allow public read access (insights are generic based on bucketed inputs)
create policy "Public read access for ai_plan_cache"
  on ai_plan_cache for select
  using (true);
