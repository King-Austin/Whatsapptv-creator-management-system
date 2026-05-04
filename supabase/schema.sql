-- Database Schema for Blogging and Ads Management
-- Prefix: gh_ (Unizik Talkative)

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
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
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
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
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
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) policies

-- Enable RLS
ALTER TABLE public.gh_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gh_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gh_ad_requests ENABLE ROW LEVEL SECURITY;

-- Posts: Everyone can see published posts
CREATE POLICY "Allow public read for published posts" ON public.gh_posts
    FOR SELECT USING (status = 'published');

-- Posts: Only authenticated admins can manage all posts
CREATE POLICY "Allow admin manage all posts" ON public.gh_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Ads: Everyone can see active ads
CREATE POLICY "Allow public read for active ads" ON public.gh_ads
    FOR SELECT USING (status = 'active');

-- Ads: Only authenticated admins can manage all ads
CREATE POLICY "Allow admin manage all ads" ON public.gh_ads
    FOR ALL USING (auth.role() = 'authenticated');

-- Ad Requests: Only admin can see/manage
CREATE POLICY "Allow admin manage ad requests" ON public.gh_ad_requests
    FOR ALL USING (auth.role() = 'authenticated');
