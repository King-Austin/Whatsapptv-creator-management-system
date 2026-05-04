# Workspace Setup: Blogging & Supabase Sync

This workspace is a Next.js application intended for a "WhatsApp TV" or digital media brand. It currently uses static data for its blog and advertisement sections.

## Key Components
- **Supabase**: Client is configured in [lib/supabase.ts](lib/supabase.ts).
- **Blog**: 
  - Listing: [app/blog/page.tsx](app/blog/page.tsx)
  - Details: [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx)
- **Admin**: 
  - Blog Management: [app/admin/dashboard/blog/page.tsx](app/admin/dashboard/blog/page.tsx)
  - Ads Management: [app/admin/dashboard/ads/page.tsx](app/admin/dashboard/ads/page.tsx)

## Functional Requirements
To make the site fully functional, the following must be implemented:
1.  **Database Tables**: `posts` and `ads` tables in Supabase.
2.  **API Integration**: Replace static maps/arrays with Supabase client calls.
3.  **Admin CRUD**: Hook up the "Create", "Edit", and "Delete" buttons in the dashboard.
4.  **Row Level Security (RLS)**: Protect the tables so only admins can write, but anyone can read published posts.
