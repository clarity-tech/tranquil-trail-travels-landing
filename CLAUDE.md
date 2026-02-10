# Tranquil Trail Travels

## Project Overview
- **Framework**: Astro v5 static site with Tailwind CSS v4
- **Domain**: https://tranquiltrailtravels.com
- **Deployed**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Brand**: Premium, luxury travel focused on Northeast India
- **Voice**: Storytelling-first, "stories written in mist & gold" narrative style
- **Contact model**: WhatsApp-first (+919531189920), secondary email (tranquiltrailtravels@gmail.com)
- **Instagram**: https://www.instagram.com/tranquil_trail_travels

## Current Site Structure
- `/` - Homepage with 5-chapter storytelling narrative
- `/destinations/` - Hub page linking to 4 state-level destination pages
- `/destinations/[id]/` - Dynamic destination pages (Assam, Arunachal Pradesh, Meghalaya, Nagaland) with hero, highlights, experiences, itineraries, FAQ, CTA sections
- `/llms.txt` - AI crawler discoverability endpoint
- Content uses Astro Content Collections (`src/content/destinations/*.md`)
- Images: Unsplash hotlinked with responsive `srcset` via `unsplashSrcset()` helper in `[id].astro`

## Key Competitor
- **ChaloHoppo** (https://chalohoppo.com) - WordPress/Elementor site
- They have: 8 state-level destination pages, 57+ blog posts, hub page, tour listings
- They lack: sub-destination pages (city/region level), fast performance, AI discoverability
- Our advantages: Astro speed, storytelling brand, premium positioning, /llms.txt

## Growth Plan
Full plan is in `GROWTH-PLAN.md`. Implementation order:

1. ~~**Phase 1**: Set up Astro Content Collections + 4 priority destination pages + destinations hub page~~ **DONE**
2. **Phase 2**: Sub-destination pages (Kaziranga, Tawang, Cherrapunji, etc.) - competitive edge over ChaloHoppo
3. **Phase 3**: Blog system + 20 posts in first 3 months (content calendar in GROWTH-PLAN.md)
4. ~~**Phase 4**: Structured data (TouristDestination, FAQ, Breadcrumbs schema)~~ **DONE** — all destination pages have TouristDestination, FAQPage, and BreadcrumbList schemas
5. **Phase 5**: Social sharing, OG images, content repurposing — **PARTIAL** (destination pages have dynamic OG images via Unsplash; still need OG image generation for other pages)
6. **Phase 6**: Lead capture (trip customizer form, newsletter)

## Technical Notes
- Build script: `astro build && cp dist/sitemap-index.xml dist/sitemap.xml`
- Sitemap auto-generates via @astrojs/sitemap - new pages are included automatically
- robots.txt points to `/sitemap.xml` (fixed Feb 2026)
- Fonts: Playfair Display (headings), Inter (body)
- Color palette: stone + amber accents
- Site config lives in `src/data/site.ts`
