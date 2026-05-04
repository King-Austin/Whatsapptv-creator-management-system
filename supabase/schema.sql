-- Database Schema for Blogging and Ads Management
-- Prefix: gh_ (Unizik Talkative TV)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. POSTS TABLE
CREATE TABLE IF NOT EXISTS public.gh_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    author TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ADS TABLE
CREATE TABLE IF NOT EXISTS public.gh_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    client_name TEXT,
    image_url TEXT,
    link_url TEXT,
    status TEXT DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AD REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.gh_ad_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name TEXT NOT NULL,
    plan TEXT,
    budget TEXT,
    contact_email TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DISABLE ROW LEVEL SECURITY (RLS)
-- To truly open the DB for a "Full Stack OS" experience without complex auth setup
ALTER TABLE public.gh_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gh_ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gh_ad_requests DISABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid confusion
DROP POLICY IF EXISTS "Allow public read for published posts" ON public.gh_posts;
DROP POLICY IF EXISTS "Allow admin manage all posts" ON public.gh_posts;
DROP POLICY IF EXISTS "Allow public read for active ads" ON public.gh_ads;
DROP POLICY IF EXISTS "Allow admin manage all ads" ON public.gh_ads;
DROP POLICY IF EXISTS "Allow admin manage ad requests" ON public.gh_ad_requests;