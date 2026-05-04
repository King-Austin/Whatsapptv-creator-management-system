---
name: setup-blog-supabase
description: Instructions for setting up Supabase-synced blogging and ad management
---

# Setup Blogging & Supabase Sync

You are an expert Next.js and Supabase developer. The user wants to transition their static blog and ad management system into a fully functional dynamic system synced with Supabase.

## Context
- **Project Type**: Next.js (App Router)
- **Database**: Supabase
- **Authentication**: Supabase Auth (likely required for admin)
- **Styling**: Tailwind CSS, Framer Motion

## Current Status
- Static blog posts are located in `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`.
- Admin dashboard for blog/ads is in `app/admin/dashboard/blog/page.tsx`.
- Supabase client is initialized in `lib/supabase.ts`.

## Objective
Make the blogging and ad management functional by:
1.  **Defining Database Schema**: Design the Supabase tables for `posts` and `ads`.
2.  **Implementing Data Fetching**: Replace hardcoded arrays with Supabase queries using `createClient`.
3.  **Synchronizing Admin Actions**: Connect "Create", "Edit", and "Delete" actions in the admin dashboard to Supabase.
4.  **Handling Dynamic Routes**: Ensure `[slug]/page.tsx` fetches the specific post from Supabase.

## Instructions
When the user asks to "set up" or "make functional" the blog/supabase:

### 1. Schema Generation
Provide a SQL snippet for the Supabase SQL Editor.
- `posts`: id (uuid), title (text), slug (text, unique), content (text/markdown), category (text), author (text), image_url (text), created_at (timestamptz), status (text: draft/published).
- `ads`: id (uuid), title (text), client_name (text), start_date (date), end_date (date), image_url (text), status (text: active/inactive).

### 2. Frontend Integration
- Use `lib/supabase.ts` for client-side or server-side calls.
- Prefer Server Components for public listing and post details for SEO.
- Use Client Components for admin forms and realtime updates if needed.

### 3. Implementation Steps
1.  **Check Environment Variables**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are configured.
2.  **Update Public Blog**: Refactor `app/blog/page.tsx` to fetch `posts` where `status = 'published'`.
3.  **Update Dynamic Post**: Refactor `app/blog/[slug]/page.tsx` to fetch single post by slug.
4.  **Update Admin Dashboard**: 
    - Implement fetching of all posts.
    - Add a form (modal or separate page) to insert new posts.
    - Implement delete/edit logic with `supabase.from('posts').delete().eq('id', id)`.

## Example Response Style
- Start with a clear breakdown of the required Supabase tables.
- Provide the exact code changes for one public page and one admin action.
- Remind the user about RLS (Row Level Security) policies for the `posts` and `ads` tables.
