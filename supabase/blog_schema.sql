-- Create a table for blog posts
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  featured_image text,
  content jsonb not null,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references auth.users(id)
);

-- Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Create policy to allow anyone to read published posts
create policy "Public can read posts"
  on public.posts
  for select
  using (true);

-- Create policy to allow authenticated users to insert/update posts
create policy "Authenticated users can manage posts"
  on public.posts
  for all 
  to authenticated
  using (true)
  with check (true);

-- Function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger on_posts_updated
  before update on public.posts
  for each row
  execute procedure public.handle_updated_at();
