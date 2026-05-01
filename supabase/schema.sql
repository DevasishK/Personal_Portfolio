-- Supabase schema for this portfolio
-- Run in Supabase SQL editor (or via migrations) after creating a project.

-- 1) Visitor counter
create table if not exists public.visits (
  id int primary key,
  count bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.visits enable row level security;

-- Allow everyone to read the counter
drop policy if exists "visits_select_public" on public.visits;
create policy "visits_select_public"
on public.visits
for select
to anon, authenticated
using (true);

-- Only allow updates through a security definer function
drop policy if exists "visits_no_update" on public.visits;
create policy "visits_no_update"
on public.visits
for update
to anon, authenticated
using (false);

insert into public.visits (id, count)
values (1, 0)
on conflict (id) do nothing;

create or replace function public.increment_visit_count()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  next_count bigint;
begin
  update public.visits
  set count = count + 1, updated_at = now()
  where id = 1
  returning count into next_count;

  if next_count is null then
    insert into public.visits (id, count) values (1, 1)
    on conflict (id) do update set count = public.visits.count + 1, updated_at = now()
    returning count into next_count;
  end if;

  return next_count;
end;
$$;

grant execute on function public.increment_visit_count() to anon, authenticated;

-- 2) Ask Questions form
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text null,
  question text not null,
  source text null,
  created_at timestamptz not null default now()
);

alter table public.questions enable row level security;

-- Anyone can submit a question
drop policy if exists "questions_insert_public" on public.questions;
create policy "questions_insert_public"
on public.questions
for insert
to anon, authenticated
with check (true);

-- Lock down reads by default (adjust to your needs)
drop policy if exists "questions_select_none" on public.questions;
create policy "questions_select_none"
on public.questions
for select
to anon, authenticated
using (false);

-- 3) Message wall
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Anyone can read messages
drop policy if exists "messages_select_public" on public.messages;
create policy "messages_select_public"
on public.messages
for select
to anon, authenticated
using (true);

-- Anyone can post messages (consider adding moderation later)
drop policy if exists "messages_insert_public" on public.messages;
create policy "messages_insert_public"
on public.messages
for insert
to anon, authenticated
with check (true);

