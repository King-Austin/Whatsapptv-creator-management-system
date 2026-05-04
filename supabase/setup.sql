-- Unified Schema for Unizik Talkative TV
-- This file contains all tables, functions, and initial seed data for a one-run deployment.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. FUNCTIONS
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- 2. POSTS TABLE (Merged schema for total functionality)
CREATE TABLE IF NOT EXISTS public.gh_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT, 
    content_json JSONB, -- For Tiptap/Meditor JSON support
    category TEXT DEFAULT 'General',
    author TEXT DEFAULT 'Admin',
    author_id UUID REFERENCES auth.users(id),
    image_url TEXT,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for gh_posts updated_at
DROP TRIGGER IF EXISTS on_gh_posts_updated ON public.gh_posts;
CREATE TRIGGER on_gh_posts_updated
    BEFORE UPDATE ON public.gh_posts
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- 3. ADS TABLE
CREATE TABLE IF NOT EXISTS public.gh_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    client_name TEXT,
    image_url TEXT,
    link_url TEXT,
    status TEXT DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for gh_ads updated_at
DROP TRIGGER IF EXISTS on_gh_ads_updated ON public.gh_ads;
CREATE TRIGGER on_gh_ads_updated
    BEFORE UPDATE ON public.gh_ads
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- 4. AD REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.gh_ad_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name TEXT NOT NULL,
    contact_email TEXT,
    brand TEXT, -- Compatibility field
    contact TEXT, -- Compatibility field
    plan TEXT,
    budget TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for gh_ad_requests updated_at
DROP TRIGGER IF EXISTS on_gh_ad_requests_updated ON public.gh_ad_requests;
CREATE TRIGGER on_gh_ad_requests_updated
    BEFORE UPDATE ON public.gh_ad_requests
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- 5. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.gh_site_settings (
    id BIGINT PRIMARY KEY DEFAULT 1,
    brand_name TEXT DEFAULT 'Uniziktalkertive TV',
    contact_email TEXT DEFAULT 'admin@uniziktalkertive.tv',
    instagram_url TEXT DEFAULT '',
    twitter_url TEXT DEFAULT '',
    facebook_url TEXT DEFAULT '',
    whatsapp_number TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT one_row_only CHECK (id = 1)
);

-- Initialize site settings
INSERT INTO public.gh_site_settings (id, brand_name, contact_email)
VALUES (1, 'Uniziktalkertive TV', 'admin@uniziktalkertive.tv')
ON CONFLICT (id) DO NOTHING;

-- 6. SECURITY (RLS)
-- Disabling RLS for internal admin management simplicity
ALTER TABLE public.gh_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gh_ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gh_ad_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gh_site_settings DISABLE ROW LEVEL SECURITY;

-- 7. INITIAL SEED DATA
INSERT INTO public.gh_posts (title, slug, content, category, author, status, image_url)
VALUES 
('The Future of Tech in Nigeria', 'future-tech-nigeria', 'Nigeria is rapidly becoming a global tech hub...', 'Technology', 'Emmanuel Kalu Olugu', 'published', 'https://images.unsplash.com/photo-1518770660439-4636190af475'),
('Unizik Campus Life: What to Expect', 'unizik-campus-life', 'Life at Nnamdi Azikiwe University is a blend of academic rigor...', 'Education', 'Emmanuel Kalu Olugu', 'published', 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3')
ON CONFLICT (slug) DO NOTHING;
