-- Run this in your Supabase SQL editor to create the signups table

create table if not exists artist_signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  phone       text not null,
  instagram   text not null,
  city        text not null,
  genre       text not null,
  will_share  text not null check (will_share in ('yes', 'maybe', 'unsure'))
);

-- Enable Row Level Security
alter table artist_signups enable row level security;

-- Allow anyone to insert (public form)
create policy "Anyone can sign up"
  on artist_signups for insert
  with check (true);

-- Only authenticated users (you) can read
create policy "Authenticated users can read signups"
  on artist_signups for select
  using (auth.role() = 'authenticated');
