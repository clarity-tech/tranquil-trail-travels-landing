# Tranquil Trail Travels

## Project Overview
- **Framework**: Astro v7 static site with Tailwind CSS v4 (upgraded from v5 in Sep 2026)
- **Domain**: https://tranquiltrailtravels.com
- **Deployed**: GitHub Pages (`gh-pages` branch) via GitHub Actions, fronted by Cloudflare for DNS/TLS — see Hosting & Deployment
- **Brand**: Premium, luxury travel focused on Northeast India
- **Voice**: Storytelling-first, "stories written in mist & gold" narrative style
- **Contact model**: WhatsApp-first (+916002324880), secondary email (tranquiltrailtravels@gmail.com)
- **Instagram**: https://www.instagram.com/tranquil_trail_travels

## Current Site Structure
- `/` - Homepage with 5-chapter storytelling narrative (all images are real Unsplash photos)
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

## Hosting & Deployment
- **Repo**: `github.com/clarity-tech/tranquil-trail-travels-landing` (public). The git remote still points at the pre-rename URL `tranquil-trail-travel-landing`; GitHub redirects it, so pushes work unchanged.
- **Chain**: push to `main` → `.github/workflows/deploy.yml` (Node 24, `npm run build`) → `peaceiris/actions-gh-pages` publishes `dist/` to the `gh-pages` branch with a `CNAME` → GitHub Pages serves it → Cloudflare proxies it at tranquiltrailtravels.com
- **There is no manual deploy step** — pushing to `main` is the deploy. Live in ~1-2 min. Watch it with `gh run watch --repo clarity-tech/tranquil-trail-travels-landing`
- **Cloudflare**: nameservers `coco`/`george.ns.cloudflare.com`. Apex and `www` are proxied (orange cloud), so Cloudflare terminates TLS and does the http→https redirect. GitHub's own "Enforce HTTPS" is off — expected for a proxied domain, not a misconfiguration.
- **Cache**: HTML is served `cache-control: max-age=600`, so a change can take up to 10 min to appear publicly unless the Cloudflare cache is purged.
- `gh-pages` is force-rewritten on every deploy (`force_orphan: true`) — never commit to it by hand.
- **Cloudflare zone**: which Cloudflare account holds this zone is not recorded here — needed to purge cache. TODO: fill in.
- **Do NOT set Cloudflare SSL mode to Full (strict)** — it would 526 the site. GitHub has never issued a cert for the custom domain (`https_enforced: false`), and the Pages origin presents only `*.github.io`; verify with
  `curl -sSI --resolve tranquiltrailtravels.com:443:185.199.108.153 https://tranquiltrailtravels.com/`. The zone must stay on Full (non-strict). Making strict possible means grey-clouding the DNS until GitHub provisions HTTPS, then re-proxying.
- **Open item**: HSTS is disabled at the edge (`strict-transport-security: max-age=0`). Safe to enable in Cloudflare → SSL/TLS → Edge Certificates; it affects browser↔Cloudflare only, not the origin.

## Technical Notes
- Build script: `astro build && cp dist/sitemap-index.xml dist/sitemap.xml`
- Sitemap auto-generates via @astrojs/sitemap - new pages are included automatically
- robots.txt points to `/sitemap.xml` (fixed Feb 2026)
- Fonts: Playfair Display (headings), Inter (body)
- Color palette: stone + amber accents
- Site config lives in `src/data/site.ts`
- Astro 7 uses the Rust compiler: it errors on unclosed tags, no longer auto-corrects invalid HTML
  nesting, and **drops the whitespace text node between sibling elements**. Never let a gap between
  two inline elements come from source whitespace — use `gap`/margin, or it will close up in the
  build. Requires Node >= 22.12 (CI is on 24).
