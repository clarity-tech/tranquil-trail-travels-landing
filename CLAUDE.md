# Tranquil Trail Travels

## Project Overview
- **Framework**: Astro v7 static site with Tailwind CSS v4 (upgraded from v5 in Sep 2026)
- **Domain**: https://tranquiltrailtravels.com
- **Deployed**: GitHub Pages (`gh-pages` branch) via GitHub Actions, fronted by Cloudflare for DNS/TLS — see Hosting & Deployment
- **Brand**: Premium, luxury travel focused on Northeast India
- **Voice**: Storytelling-first, "stories written in mist & gold" narrative style
- **Contact model**: WhatsApp-first (+916002324880), secondary email (contact@tranquiltrailtravels.com)
  The floating chat bubble (`ChatWidget.astro`, in `Layout.astro`, so on every page) hands off to
  WhatsApp — it does not send anything itself. Never make it claim a message was delivered: the
  site is static, there is no backend, and a failed handoff would otherwise be a lead lost
  silently. It asks for a name only; WhatsApp supplies the number.
- **Instagram**: https://www.instagram.com/tranquil_trail_travels

## Current Site Structure
- `/` - Homepage with 5-chapter storytelling narrative (all images are real Unsplash photos). Surfaces upcoming fixed departures between the experiences and testimonials sections; that section removes itself when none are upcoming.
  Below the testimonials, a "Field Notes" band renders the latest Instagram posts via Instagram's
  own embed (`InstagramEmbeds.astro`); `embed.js` is injected lazily on scroll, so initial load costs
  0 Instagram requests. The post list in `src/data/instagram.ts` is hand-maintained — new posts do
  not appear on their own. Emptying that array hides the section.
- `/destinations/` - Hub page linking to 4 state-level destination pages
- `/destinations/[id]/` - Dynamic destination pages (Assam, Arunachal Pradesh, Meghalaya, Nagaland) with hero, highlights, experiences, itineraries, FAQ, CTA sections
- `/fixed-departures/[slug]/` - Dated, priced group departures (day-by-day, inclusions, group policy, TouristTrip + Offer schema). Linked from the parent state's destination page; past departures drop off that listing automatically and the page itself switches to a "concluded" state, both derived from `endDate` at build time.
- `/fixed-departures/` - Hub listing all upcoming departures. Target of the header's "Departures"
  nav item (hidden below `sm` — the logo plus two nav links does not fit at 320px). Has a real empty
  state, so it degrades gracefully rather than 404ing once every departure lapses.
- `/llms.txt` - AI/agent discoverability endpoint (`src/pages/llms.txt.ts`), in the llmstxt.org
  link-map format. Generated from the content collections, so new destinations, places and
  departures appear on their own; upcoming departures are filtered on `endDate` exactly as the
  hub and the bar are. Advertised via `<link rel="describedby">` in `Layout.astro` and a pointer comment in
  `robots.txt` — it has no discovery mechanism of its own. The relation is fixed by the
  llmstxt.org v2 spec: `describedby` points at the covering llms.txt, while
  `rel="alternate" type="text/markdown"` points at a page's own `.md` twin. Do not swap them.
- **Every page has a markdown twin** at the same path with the trailing slash replaced by `.md`
  (`/destinations/assam/` → `/destinations/assam.md`); the three index routes keep their directory
  and take `/index.md`. Routes are the `*.md.ts` endpoints under `src/pages/`; the composition
  lives in `src/utils/markdown-view.ts`. `Layout.astro` derives each page's twin from the pathname,
  so a **new hub route must be added to its `INDEX_ROUTES` set** or the page will advertise a `.md`
  that 404s.
  These views are **composed from frontmatter, not dumps of `entry.body`**. The markdown body of a
  content file is only the narrative opening — three or four paragraphs. Best time to visit,
  highlights, experiences, itineraries, practical info, prices, day-by-day plans and FAQs all live
  in frontmatter and are assembled by the `.astro` templates. Serving `entry.body` alone would look
  plausible and silently drop every practical fact on the page. So when you add a section to a
  template, add it to the matching builder too, and re-check that the eleven `.md` files still
  match the eleven HTML pages one-to-one.
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
- **Cloudflare**: nameservers `shubhi`/`mustafa.ns.cloudflare.com` (moved from `coco`/`george` in Sep 2026). Apex and `www` are proxied (orange cloud), so Cloudflare terminates TLS and does the http→https redirect. GitHub's own "Enforce HTTPS" is off — expected for a proxied domain, not a misconfiguration.
- **Cache**: HTML is served `cache-control: max-age=600`, so a change can take up to 10 min to appear publicly unless the Cloudflare cache is purged.
- `gh-pages` is force-rewritten on every deploy (`force_orphan: true`) — never commit to it by hand.
- **Cloudflare zone**: the account holding this zone is the one reachable on the `shubhi`/`mustafa`
  nameservers. Record the account name here next time someone logs in — needed to purge cache.
- **Error 1000 outage, 10 Sep 2026.** The whole site returned `403 — DNS points to prohibited IP`
  while GitHub Pages was perfectly healthy. Cause: the apex and `www` records had their **origin
  values** set to Cloudflare's own anycast IPs (`104.21.x`, `172.67.x`, and `2606:4700::/32` on
  AAAA), which is a loop Cloudflare refuses. Fix: point them at GitHub's `185.199.108-111.153`,
  and `www` at a CNAME to `clarity-tech.github.io` (the **organization**, never the repo name —
  this is a project site). Diagnosis note for next time: `dig` returns Cloudflare anycast IPs for
  any *proxied* record, so seeing `104.21.x` in `dig` is normal and is **not** the symptom. The
  symptom is the 403 body. Check the origin values in the dashboard, not `dig`.
- **Do NOT set Cloudflare SSL mode to Full (strict)** — it would 526 the site. GitHub has never issued a cert for the custom domain (`https_enforced: false`), and the Pages origin presents only `*.github.io`; verify with
  `curl -sSI --resolve tranquiltrailtravels.com:443:185.199.108.153 https://tranquiltrailtravels.com/`. The zone must stay on Full (non-strict). Making strict possible means grey-clouding the DNS until GitHub provisions HTTPS, then re-proxying.
- **Open item**: HSTS is disabled at the edge (`strict-transport-security: max-age=0`). Safe to enable in Cloudflare → SSL/TLS → Edge Certificates; it affects browser↔Cloudflare only, not the origin.

## Technical Notes
- Build script: `astro build && cp dist/sitemap-index.xml dist/sitemap.xml`
- Sitemap auto-generates via @astrojs/sitemap - new pages are included automatically
- robots.txt points to `/sitemap.xml` (fixed Feb 2026)
- Fonts: Playfair Display (headings), Inter (body)
- Color palette: stone + amber accents
- Site config lives in `src/data/site.ts`, including `ogImage` — the site-wide social/OG fallback.
  It is an absolute Unsplash URL (the homepage hero), not a local file: there is no OG asset in
  `public/`, and the old `/og-image.jpg` default 404'd on every page that did not pass its own hero.
- `Layout.astro` emits one JSON-LD `@graph` (TravelAgency + WebSite + WebPage) with stable `@id`s
  anchored on `siteConfig.url`. Contact fields read from `siteConfig.contact`, so the
  machine-readable copy cannot drift from the `mailto:`/`wa.me` links. Per-page schemas
  (TouristDestination, TouristTrip, FAQPage, BreadcrumbList) stay in their own page files.
- Sitemap `lastmod` is derived per page from git history by `src/utils/git-lastmod.mjs`, wired in
  as the `serialize` hook in `astro.config.mjs`. Precedence: frontmatter `updatedDate` (an optional
  escape hatch on every collection, unset everywhere today) → the last commit that touched the
  page's **content** source → omit. Content source means the `.md` entry for collection pages and
  the `.astro` file for the homepage and hubs; chrome is deliberately excluded, so a nav tweak in
  `Layout.astro` does not re-date all eleven URLs.
  Two things keep the dates honest, and both matter:
  - **`fetch-depth: 0` in `.github/workflows/deploy.yml`.** On a shallow clone `git log` returns the
    single commit's date for *every* file, with no error — which is exactly the "everything changed
    today" signal `lastmod` is supposed to avoid. Never drop it.
  - **The shallow guard in the helper.** If history is missing it omits `lastmod` entirely rather
    than falling back to `new Date()`. Absent beats wrong: Google only honours `lastmod` while it
    stays accurate. So verify changes here against a shallow clone, not just locally —
    `git clone --depth 1 file://$PWD /tmp/t && cd /tmp/t && npm install && npm run build` should
    produce a sitemap with zero `lastmod` entries.
- `--dep-bar-h` (global.css) is the single source of truth for the departure bar's height: the bar,
  the fixed header's `top`, and the page wrapper's `padding-top` all read it, so dismissing the bar
  (which sets `.dep-bar-hidden` on `<html>`) collapses every offset at once. If you add anything
  pinned to the top of the viewport, offset it from this variable, not from a hard-coded 4rem.
- Instagram embeds hard-code `min-width: 326px` on the blockquote **and** on the iframe they swap in.
  Below ~370px of column that is wider than the page and brings back the horizontal overflow fixed
  in `f5bd718`. The `!important` override in `InstagramEmbeds.astro`'s global style block is the
  fix — do not remove it, and re-check overflow at 320px after touching that component.
- Do not reach for Meta's tokenless `instagram_oembed` to fetch post thumbnails. The endpoint answers
  unauthenticated (Meta dropped the token requirement in June 2026) but returns only the grey
  loading skeleton — no `thumbnail_url`, no media. Tested against real posts on 2026-09-10.
- Measuring embed weight from the parent page under-reports it badly, because cross-origin iframe
  traffic is invisible there. Run Chrome with `--disable-site-isolation-trials
  --disable-features=IsolateOrigins,site-per-process` to see the real figure (34 KB vs 5,261 KB).
- Astro 7 uses the Rust compiler: it errors on unclosed tags, no longer auto-corrects invalid HTML
  nesting, and **drops the whitespace text node between sibling elements**. Never let a gap between
  two inline elements come from source whitespace — use `gap`/margin, or it will close up in the
  build. Requires Node >= 22.12 (CI is on 24). It also rejects a **multi-line nested template
  literal inside `${...}`** that the Go compiler accepted — it fails with `Expected } but found :`
  and reports the wrong line, so trust the file over the location. Flatten to concatenation or a
  single line.
