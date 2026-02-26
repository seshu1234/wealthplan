-- Create notifications table
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null check (type in ('info', 'success', 'warning', 'error')),
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table notifications enable row level security;

-- Admin can see all, users can see their own
-- Note: Since we use custom JWT and service role, we might not need granular RLS for the dashboard,
-- but it's good practice.
create policy "Users can view their own notifications"
  on notifications for select
  using (auth.uid() = user_id or exists (select 1 from admin_users where id = auth.uid()));

create policy "Users can update their own notifications"
  on notifications for update
  using (auth.uid() = user_id or exists (select 1 from admin_users where id = auth.uid()));

create policy "Users can delete their own notifications"
  on notifications for delete
  using (auth.uid() = user_id or exists (select 1 from admin_users where id = auth.uid()));

-- Index for performance
create index if not exists notifications_user_id_idx on notifications(user_id);
create index if not exists notifications_created_at_idx on notifications(created_at desc);
