# Implementation Plan - WhatsApp TV Media Website

This plan outlines the steps to convert the existing "GreenHarvest Farms" template into a branded media website for a WhatsApp TV business.

## 1. Design System & Branding
- [ ] Update `tailwind.config.ts` with the new color palette:
    - Background: `#FFFFFF` (White)
    - Primary/Accent: Modern Red (e.g., `#E11D48`)
    - Text: Dark Gray/Black for hierarchy
- [ ] Update Typography: Clean, sans-serif (Inter/Outfit).

## 2. Infrastructure Setup
- [ ] Install Supabase dependencies: `@supabase/supabase-js`, `@supabase/ssr`.
- [ ] Initialize Supabase client utility in `lib/supabase.ts`.
- [ ] Create `.env.local` template for Supabase credentials.

## 3. Core Components
- [ ] **Navbar**: Minimalist design with links to Home, Blog, Advertise, and Contact.
- [ ] **Footer**: Branded with "Powered by Websyncdigital".
- [ ] **Hero Section**: WhatsApp TV intro with a clear CTA.
- [ ] **Stats Section**: Highlight daily reach (e.g., 50k+ status views).
- [ ] **Blog Preview**: Dynamic grid showing the latest posts.

## 4. Blog System (Supabase)
- [ ] Database Schema:
    - `posts` table: id, title, slug, content, excerpt, featured_image, category, author_id, created_at, is_published.
    - `categories` table: id, name, slug.
- [ ] `app/blog/page.tsx`: Listing page with categories filter.
- [ ] `app/blog/[slug]/page.tsx`: Single post layout with AdSense slots.
- [ ] SEO: Implement Metadata API for dynamic OG tags and structured data.

## 5. Admin Dashboard
- [ ] `app/admin/login/page.tsx`: Simple auth page.
- [ ] `app/admin/dashboard/page.tsx`: Overview of posts.
- [ ] `app/admin/new/page.tsx`: Markdown/Rich-text editor for posts.
- [ ] Role-based protection using Supabase middleware.

## 6. Monetization & Lead Capture
- [ ] **AdSense Integration**:
    - Create `components/AdSlot.tsx` for flexible ad placement.
    - Placeholders in article body and sidebar.
- [ ] **Advertise With Us**:
    - Page detailing ad packages.
    - Specialized contact form for advertisers.
- [ ] **Lead Capture**: Integrate Contact form with Supabase `leads` table.

## 7. Performance & SEO
- [ ] Generate `sitemap.xml` dynamically.
- [ ] Ensure mobile-first responsive design.
- [ ] Optimize images with `next/image`.
