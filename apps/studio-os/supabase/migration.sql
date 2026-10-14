-- Run in a NEW Supabase project; keep this database separate from other client projects.
-- Add the owner's email/password user via Supabase Auth after applying this schema.
create table if not exists public.studio_records (
  id bigint generated always as identity primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('lead','proposal','project')),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists studio_records_owner_created_idx on public.studio_records (owner_id, created_at desc);
alter table public.studio_records enable row level security;
grant select, insert, update, delete on public.studio_records to authenticated;
grant usage, select on sequence public.studio_records_id_seq to authenticated;
create policy "studio_select_own" on public.studio_records for select to authenticated using ((select auth.uid()) = owner_id);
create policy "studio_insert_own" on public.studio_records for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "studio_update_own" on public.studio_records for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "studio_delete_own" on public.studio_records for delete to authenticated using ((select auth.uid()) = owner_id);
