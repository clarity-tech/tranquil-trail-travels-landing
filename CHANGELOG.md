# Changelog

## Phase 1: Foundation — Content Architecture & Destination Pages (Feb 2026)

### Task 1: Set Up Astro Content Collections
- Created `src/content.config.ts` with two collections:
  - **destinations** — `glob` loader from `src/content/destinations/`, Zod schema with: title, state, tagline, description, heroImage, bestTimeToVisit, highlights, topExperiences, culturalHighlights, sampleItineraries, faqs, seo, order
  - **blog** — `glob` loader from `src/content/blog/`, Zod schema with: title, description, publishDate, heroImage, state, category (5 content pillars), tags, draft
- Created directories: `src/content/destinations/`, `src/content/blog/`

### Task 2: Create Destination Content Files (4 States)

**`src/content/destinations/assam.md`** (order: 0)
- Tagline: "Where the Brahmaputra Writes Stories in Mist & Gold"
- 5 Highlights: Kaziranga National Park, Majuli River Island, Heritage Tea Gardens, Brahmaputra River Cruises, Sivasagar Ahom Legacy
- 5 Top Experiences: Rhino Safari at Dawn, Sunset Cruise on the Brahmaputra, Mask-Making with Majuli's Monks, Tea Tasting & Bungalow Stay, Kamakhya Temple at Sunrise
- 4 Cultural Highlights: Bihu festival, Assamese Silk Weaving, Sattriya dance, Assamese Cuisine
- 3 Sample Itineraries: Essential Assam (7 days), Brahmaputra Luxury River Journey (10 days), Wild Assam: Kaziranga & Manas (8 days)
- 6 FAQs covering Kaziranga timing, Majuli access, safety, cruises, tea gardens, and permits
- 3-paragraph evocative body content

**`src/content/destinations/arunachal-pradesh.md`** (order: 1)
- Tagline: "The Land of the Dawn-Lit Mountains"
- 5 Highlights: Tawang Monastery, Ziro Valley & Apatani Tribe, Sela Pass, Mechuka Hidden Valley, Tribal Mosaic (26 cultures)
- 5 Top Experiences: Sunrise at Tawang Monastery, Apatani Village Walk in Ziro, Drive Across Sela Pass, Mechuka Valley Expedition, Dirang to Bomdila Heritage Trail
- 4 Cultural Highlights: Monpa Buddhist Heritage, Apatani Sustainable Wisdom, Tribal Festivals, Handloom & Craft Traditions
- 3 Sample Itineraries: Tawang & Monastery Trail (8 days), Ziro & Tribal Heartland (7 days), Grand Arunachal Traverse (14 days)
- 6 FAQs covering permits (ILP/PAP), journey to Tawang, suitability for older travellers, accommodation, Ziro Music Festival, and safety
- 3-paragraph evocative body content

**`src/content/destinations/meghalaya.md`** (order: 2)
- Tagline: "The Abode of Clouds, Rooted in Living Stone"
- 5 Highlights: Living Root Bridges, Cherrapunji & Rain, Dawki Crystal River, India's Longest Caves, Mawlynnong Cleanest Village
- 5 Top Experiences: Trek to Double-Decker Root Bridge, Sunrise at Nohkalikai Falls, Boating on Crystal Umngot, Caving Expedition in Krem Mawmluh, Shillong Heritage & Music Walk
- 4 Cultural Highlights: Matrilineal Khasi Society, Nongkrem Dance Festival, Wangala Hundred Drums Festival, Khasi Cuisine & Jadoh
- 3 Sample Itineraries: Meghalaya Essentials (7 days), Living Root Bridge Trail (5 days), Grand Meghalaya: Three Hills (10 days)
- 6 FAQs covering root bridge trek difficulty, monsoon impact, permits, access, combining with other states, and Dawki seasonality
- 3-paragraph evocative body content

**`src/content/destinations/nagaland.md`** (order: 3)
- Tagline: "Where Warriors Became Storytellers"
- 5 Highlights: Hornbill Festival, Konyak Warriors of Mon, Dzukou Valley Trek, Kohima WWII History, Sixteen Tribes
- 5 Top Experiences: Hornbill Festival Immersion, Meeting the Last Headhunters of Mon, Dzukou Valley Trek, Kohima War Cemetery & Heritage Walk, Village Homestay & Naga Kitchen
- 4 Cultural Highlights: Warrior Heritage & Transformation, Naga Textiles & Body Art, Naga Cuisine (Fire & Ferment), Morung (Warrior Dormitory)
- 3 Sample Itineraries: Hornbill Festival Special (6 days), Warriors & Valleys: Mon & Dzukou (10 days), Nagaland & Assam: Warriors & Rhinos (10 days)
- 6 FAQs covering permits, safety, getting there, Mon district etiquette, Dzukou trek difficulty, and Hornbill Festival dates
- 3-paragraph evocative body content

### Task 3: Build Destination Page Template & Dynamic Route

**`src/pages/destinations/[id].astro`** — Dynamic destination page
- Uses `getStaticPaths` with `getCollection('destinations')` (Astro v5 patterns)
- Uses standalone `render(entry)` from `astro:content`
- Sections in order:
  1. Breadcrumbs (Home > Destinations > State Name)
  2. Hero — full-width dark gradient, state name, tagline, best-time-to-visit badge, optional heroImage
  3. Intro — rendered markdown body via `<Content />`
  4. Highlights — 3-column grid of cards
  5. Top Experiences — alternating image-text layout with slide animations
  6. Cultural Highlights — left-bordered amber accent cards in 2-column grid
  7. Sample Itineraries — cards with duration badge, WhatsApp CTA per itinerary
  8. FAQ — native `<details>`/`<summary>` accordion with rotating plus icon
  9. CTA — WhatsApp + email dual CTA
- Structured data JSON-LD injected via `<slot name="head" />`:
  - `TouristDestination` schema
  - `BreadcrumbList` schema (3-level)
  - `FAQPage` schema with all FAQ entries
- Custom SEO title/description from frontmatter

### Task 4: Create Destinations Hub Page

**`src/pages/destinations/index.astro`** — Hub page at `/destinations/`
- Hero section: "Discover Northeast India" with storytelling intro
- Responsive 2-column grid of destination cards sorted by `order` field
- Each card: state name (Playfair heading), tagline, best-time-to-visit badge, "Explore destination" arrow link
- Breadcrumbs (Home > Destinations)
- CTA section for undecided visitors with WhatsApp link
- Scroll animation observer
- Graceful empty state if no destinations exist

### Task 5: SEO Enhancements

**`src/layouts/Layout.astro`** — Modified
- Added `seoTitle` and `seoDescription` optional props
- Computed `pageTitle` and `pageDescription` with fallbacks
- Updated `<title>`, meta description, Open Graph, and Twitter Card tags to use computed values
- Added `<slot name="head" />` before `</head>` for per-page structured data injection

**`public/robots.txt`** — Fixed
- Changed `Sitemap: .../sitemap-index.xml` to `Sitemap: .../sitemap.xml`

### Build Output
```
/                                → index.html (homepage)
/destinations/                   → destinations/index.html (hub)
/destinations/assam/             → destinations/assam/index.html
/destinations/arunachal-pradesh/ → destinations/arunachal-pradesh/index.html
/destinations/meghalaya/         → destinations/meghalaya/index.html
/destinations/nagaland/          → destinations/nagaland/index.html
/llms.txt                        → llms.txt (API endpoint)
```

Sitemap: All 6 HTML pages automatically included in `sitemap-0.xml`.

---

## Navigation Fix (Feb 2026)

Added site-wide navigation and internal linking that was missing from Phase 1.

### Fixed Header Navigation Bar (`src/layouts/Layout.astro`)
- Added `<header>` with fixed positioning, appears on every page
- "Tranquil Trail" logo links to homepage
- "Destinations" link to `/destinations/`
- "Plan Your Trip" WhatsApp CTA button (hidden on small screens)
- Transparent at page top, transitions to solid dark (`bg-stone-900/95`) with backdrop blur on scroll
- Scroll behavior managed via Intersection Observer script

### Seven Sisters Map Links (`src/components/SevenSistersMap.astro`)
- Added `href` property to each state in the data array
- Assam → `/destinations/assam/`
- Arunachal Pradesh → `/destinations/arunachal-pradesh/`
- Meghalaya → `/destinations/meghalaya/`
- Nagaland → `/destinations/nagaland/`
- Manipur, Mizoram, Tripura → `null` (no pages yet, render as `<div>` not `<a>`)
- States with destination pages show "Explore →" indicator on hover
- Added "View all destinations →" link below the section heading

### Footer Links (`src/pages/index.astro`)
- Added "Destinations" text link in the footer alongside the Instagram button

---

## Destination Images & Responsive Optimization (Feb 2026)

### Meghalaya Best Time Fix
- Changed `months` from "October to May" → "September to May"
- Updated note: monsoon period from "June-September" → "June-August", post-monsoon from "October-November" → "September-November"

### Unsplash CDN Preconnect (`src/layouts/Layout.astro`)
- Added `<link rel="preconnect" href="https://images.unsplash.com" crossorigin>` for early connection setup

### Responsive Image Enhancement (`src/pages/destinations/[id].astro`)
- Added `unsplashSrcset()` helper function — replaces `w=` param to generate multi-width srcset
- Hero image: `srcset` with 4 widths (640, 1024, 1400, 1920), `sizes="100vw"`, `fetchpriority="high"`, `width`/`height` for CLS prevention
- Experience images: `srcset` with 3 widths (480, 768, 960), `sizes="(min-width: 768px) 50vw, 100vw"`, `width`/`height`
- OG image: computed from hero URL at `w=1200&q=80`, passed to Layout as `ogImage` prop
- Structured data: added `image` field to `TouristDestination` JSON-LD schema

### Destination Page Images (4 files)
Populated all 24 image fields (4 heroes + 20 experiences) with Unsplash CDN URLs:
- **Assam** (`assam.md`): tea garden landscape hero, Kaziranga rhino, Brahmaputra sunset, Majuli boat, tea workers, Kamakhya temple
- **Arunachal Pradesh** (`arunachal-pradesh.md`): forest & snowy mountains hero, Tawang monastery, Ziro terraces, Sela Pass, Mechuka village, snow monastery
- **Meghalaya** (`meghalaya.md`): Laitlum canyon hero, living root bridge, Nohkalikai falls, Dawki river, Mawlynnong village, Shillong/Laitlum vista
- **Nagaland** (`nagaland.md`): mountain fog sunset hero, festival drummer, elder portrait, Dzukou meadow, Kohima, green village

### Homepage Placeholder Replacement (3 components)
Replaced all 8 `placehold.co` placeholder images with real Unsplash photos:
- **HeroDawn.astro**: Kaziranga dawn → real Kaziranga landscape
- **CulturalMoments.astro** (4 images): tea gardens, Tawang monastery, tribal cooking, living root bridge
- **UniqueExperiences.astro** (3 images): Majuli boat, Dzukou meadow, Ziro rice terraces

Zero `placehold.co` references remain on the site.

## Fixed Departures — A Meghalayan Winter Tale (Sep 2026)

Added a fourth content collection for dated, priced group departures, transcribed from
`Tranquil_Trails_Meghalaya_Itinerary_V6.pdf`.

### New collection (`src/content.config.ts`)
- **fixedDepartures** — `glob` loader from `src/content/fixed-departures/`. Schema carries what a
  sample itinerary cannot: `startDate`/`endDate` as real dates (`z.coerce.date()`, matching the blog
  collection), `price`/`priceCurrency`/`priceNote`, `durationNights`/`durationDays`, per-day
  `days[]` (route, description, stay, meals, image), `inclusions`, `exclusions`, `groupPolicy`,
  `arrivalNote`, `status`, `faqs`, `seo`.
- `status` is only `open` / `filling-fast` / `sold-out` — "past" is derived from `endDate` at build
  time, so a concluded departure degrades on its own instead of advertising a date that has gone by.

### Content (`src/content/fixed-departures/meghalayan-winter-tale-2026.md`)
- 6N/7D, 25–31 December 2026, ₹28,800 per person twin sharing, max 11 travellers.
- Guwahati → Shillong → Sohra → Pongtung → Shnongpdeng → Shillong → Guwahati.
- All 7 days, 8 inclusions, 4 exclusions, and the group policy transcribed from the PDF.
- 6 FAQs written for the page (flight timing, shared-vs-private, accommodation, December weather,
  David Scott Trail fitness, what the price excludes) — not in the source PDF.
- Slug carries the year so the 2027 edition takes a new URL and this page can go "past" rather
  than 404.
- Day images reuse existing Meghalaya Unsplash URLs rather than extracting the PDF's embedded
  images, keeping the `unsplashSrcset()` pattern and the repo free of binaries. Each is matched to
  its day's subject (caving photo on the caves day, root-bridge photo on the root-bridge day, and
  so on); Day 7 has none and falls back to the gradient placeholder.

### New route (`src/pages/fixed-departures/[slug].astro`)
- Hero with date/duration/price badges, intro, arrival note, highlights, alternating day-by-day
  blocks, an at-a-glance table, inclusions/exclusions, group policy, FAQ accordion, CTA.
- WhatsApp CTA prefills a booking message; on a past departure it switches to asking about the
  next edition, the arrival note and status line hide, and `Offer.availability` flips to `SoldOut`.
- Structured data: `TouristTrip` (with `ItemList` itinerary and `Offer`), `BreadcrumbList`
  (Home > Destinations > Meghalaya > trip), `FAQPage`. Dynamic OG image from the hero, as on
  destination pages.

### Destination page link (`src/pages/destinations/[id].astro`)
- New "Fixed Departures" section lists upcoming departures for that state, filtered on
  `endDate >= now` and sorted by `startDate`, so the new route is not an orphan in the sitemap.
- Card image is `absolute inset-0` inside a `relative` wrapper so the text column sizes the card;
  left in flow it drove the row height and opened a void beside the copy.

### Verification
- Build clean, 10 pages; new route in `sitemap-0.xml`; all 4 JSON-LD blocks parse.
- Headless Chrome overflow check across 3 routes x 7 widths (320–1440), scrolled to fire every
  reveal: `scrollWidth == clientWidth` and `scrollX == 0` in all 21 configurations — the
  `:has(> .slide-*)` guard from the Aug 2026 overflow fix covers the new day-by-day blocks, and the
  at-a-glance table is confined by `overflow-x-auto`.
- Past-departure path verified against a temporary fixture with 2025 dates, then removed.

## Dependency Upgrade — Astro 5 → 7 (Sep 2026)

All packages moved to latest. `npm outdated` is now empty and `npm audit` reports 0 vulnerabilities
(previously 12: 1 critical, 9 high, 1 moderate, 1 low — Vite 6 dev-server path traversal and
arbitrary file read, plus a Rollup 4 path traversal).

### Versions
- `astro` 5.16.16 → **7.3.2** (Vite 6 → Vite 8, Go compiler → Rust compiler)
- `@astrojs/sitemap` 3.7.0 → 3.7.4 · `tailwindcss` + `@tailwindcss/vite` 4.1.18 → 4.3.3 ·
  `@tailwindcss/typography` 0.5.19 → 0.5.20
- `npm audit fix` deduped a nested Vite 6 under `@tailwindcss/vite` onto Vite 8. It wrote no
  `overrides` block — `package.json` carries plain version bumps and the dedup lives in the lockfile.
- Astro 7 requires Node >= 22.12. Local and CI (`deploy.yml`) are both on Node 24 — no change needed.

### Breaking changes assessed
- **v6 — endpoints with a file extension reject a trailing slash**: `/llms.txt` is the only such
  route; nothing links to `/llms.txt/`. No action.
- **v6 — `import.meta.env` always inlined, never coerced**: not used anywhere in `src/`. No action.
- **v7 — Vite 8**: `@tailwindcss/vite` declares `vite: ^5.2 || ^6 || ^7 || ^8`. Compatible.
- **v7 — Rust compiler**: builds clean, so no unclosed tags or invalid nesting existed.

### One real regression, found and fixed
The Rust compiler drops the whitespace text node between sibling elements. On the fixed-departure
card, the gap between `₹28,800` and `Per person, twin sharing` came from an HTML space *plus*
`ml-2`; under Astro 7 only the margin survived and the two ran together. Replaced with an explicit
`flex items-baseline gap-2`, so the spacing no longer depends on compiler whitespace handling.

### Verification
- Built the same source under Astro 5.18.2 and 7.3.2 and compared: visible text and all JSON-LD
  byte-identical on all 10 pages; remaining HTML differences are cosmetic only (`&#38;` → `&amp;`,
  CSS chunk renamed `_id_.*` → `Layout.*`, JS minifier style, whitespace).
- Headless-Chrome pixel comparison, animations disabled and all reveals forced: the original pins
  (Astro 5.16.16 + Tailwind 4.1.18) and the final state (Astro 7.3.2 + Tailwind 4.3.3) build the
  same source **pixel-identical on 10/10 renders** across 5 routes x 390/1280px — so the Tailwind
  and typography bumps are covered too, including the `prose` markdown bodies. A transient delta on
  the Cherrapunji hero was ruled out as Unsplash `auto=format` serving variance via a same-build
  control that rendered identically to itself.
- Overflow check re-run on the Astro 7 build: 21/21 configurations clean.

## Fixed Departures — Homepage Placement (Sep 2026)

The Meghalaya departure was three clicks from the front door (home → destinations → Meghalaya →
scroll), which is too deep for the only thing on the site you can book by date.

### Shared card (`src/components/FixedDepartureCard.astro`)
- Extracted from `[id].astro` so the destination pages and the homepage render the same card. Takes
  the collection entry plus an index for the stagger delay. Verified as a pure refactor: the built
  Meghalaya and departure pages are byte-identical to the previous commit.

### Homepage section (`src/pages/index.astro`)
- Placed between Unique Experiences and the testimonials — after the story has done its work, before
  the soft close, so it neither interrupts the narrative nor competes with `ConsultationCTA`.
- Filtered to `endDate >= now` and wrapped in `{upcomingDepartures.length > 0 && ...}`, so when the
  last departure passes, the section removes itself and the homepage returns to its previous shape
  with no manual edit. Verified by temporarily backdating the only departure: the homepage heading
  and link both disappear, the Meghalaya section disappears, and the departure page still builds in
  its concluded state.
- No JSON-LD here on purpose. The canonical `TouristTrip` lives on the departure page; duplicating
  it would invite Google to choose the wrong URL.

### Deliberately not done
- No `/fixed-departures/` hub page and no nav link. With one departure a hub is a thin page that adds
  a click, and a nav item pointing at a single product breaks as soon as there is a second. Both are
  worth revisiting when departure #2 is added.

### Verification
- Overflow check re-run: 21/21 configurations clean, homepage included, at 320–1440px.

## Fix — Seven Sisters Map Nodes Were Not Clickable (Sep 2026)

`global.css` set `cursor: pointer` on every `.map-state` node and gave them a hover
brightness/scale, but the `<g>` elements had no link, no click handler, and the component has no
`<script>` — so the map advertised a click target that did nothing. (`.map-state.is-active` is
defined in CSS and applied by nothing; left in place as pre-existing dead style.)

- The four states with a destination page (Assam, Arunachal Pradesh, Meghalaya, Nagaland) now wrap
  their node in an SVG `<a>`. Their `href` was already in the component's `states` array — only the
  description list beside the map was using it.
- Tripura, Manipur and Mizoram have no page yet, so they lose the pointer via a new
  `.map-state--link` class. They now look inert because they are inert.
- The map wrapper is `aria-hidden="true"` because it restates the list beside it. Focusable elements
  inside an `aria-hidden` container are an accessibility violation, so the new links carry
  `tabindex="-1"`: mouse users get the click they expect, and AT and keyboard users continue to use
  the identical four links in the adjacent list rather than meeting each destination twice.

### Verification
- Click-tested all seven nodes in headless Chrome, each scrolled into view first: the four linked
  states navigate to the right page, the three unlinked ones stay put. 7/7 as intended.
- Asserted zero focusable elements inside `[aria-hidden="true"]`.
- Computed-style audit confirms `cursor: pointer` on exactly the four linked nodes and `auto` on the
  other three.
- Overflow check re-run: clean at 320–1440px.

## Fixed Departures — Site-Wide Prominence (Sep 2026)

The departure was reachable only from the homepage section and the Meghalaya page. This puts it on
every page, via a hub, a nav item and a dismissible bar.

### Hub (`src/pages/fixed-departures/index.astro`)
- Lists every upcoming departure using the shared `FixedDepartureCard`. Exists because a nav item
  needs a stable target — pointing the nav at one trip would break as soon as there is a second.
- Real empty state: when every departure has lapsed it says so and offers WhatsApp, rather than
  404ing or rendering an empty grid.

### Bar (`src/components/DepartureBar.astro`)
- Slim, dismissible, links straight to the trip (the nav goes to the hub — the bar promotes the one
  live departure, the nav is the durable browse entry).
- Dismissal is stored per departure id, so dismissing this one does not suppress a future trip's bar.
  Every `localStorage` access is wrapped in try/catch — private mode and blocked site data throw, and
  the bar must still render.
- `--dep-bar-h` drives the bar height, the fixed header's `top` and the page wrapper's `padding-top`
  together. Measured: inner pages sit at 104px with the bar and 64px without (the original `pt-16`),
  hero pages 40px and 0px. No leftover gap after dismissal.

### Nav item
- "Departures" is `hidden sm:inline`. With it visible at mobile widths the logo wrapped to two lines
  at 360–390px and three at 320px, pushing the header from 60px to 116px — there is no room for the
  logo plus two links below 414px. The bar carries prominence on phones instead.

### Verification
- Bar and nav item present on all 11 pages; hub in the sitemap.
- Auto-hide exercised by backdating the only departure: bar, nav item and homepage section all
  disappear, and the hub renders its empty state.
- Dismissal tested in-browser on a hero page and an inner page, including persistence across reload.
- Overflow: 28/28 configurations clean at 320–1440px including the new hub.

## Conversion — CTAs on the Departure Path (Sep 2026)

Measured before changing anything. On the page selling eleven seats at a fixed price, the first
call to action sat at **96% scroll depth — 18 screens on mobile, 11 on desktop** — and nothing was
actionable above the fold. The hub had **zero** CTAs while departures existed (its only one lived in
the empty state). The bar, rendered site-wide, linked to the page you were already reading when you
were on the trip page, wasting the most valuable strip on the highest-intent page.

### Trip page (`src/pages/fixed-departures/[slug].astro`)
- Hero CTA under the price badges: "Reserve Your Seat" (WhatsApp), with a secondary
  "See the Itinerary" anchoring to a new `#day-by-day` target so the CTA does not block readers who
  want to browse first. Label follows state — "Join the Waitlist" when sold out, "Ask About Next
  Dates" once past.

### Bar (`src/components/DepartureBar.astro`)
- Takes `onOwnPage`; the layout passes `Astro.url.pathname === /fixed-departures/{id}/`. On that
  page the bar stops being a promo link and becomes the booking action — price, dates, and a
  "Reserve Your Seat" button — which removes the self-link and gives a 16,000px page a persistent CTA.

### Hub (`src/pages/fixed-departures/index.astro`)
- A "None of these dates work?" block with a WhatsApp CTA when departures exist, for the visitor who
  wants a group journey but not these dates. Previously a dead end.

### Astro 7 note
The booking message was first written as a multi-line nested template literal inside `${...}`. The
Rust compiler rejects that (the Go compiler accepted it), failing with `Expected } but found :` and
pointing at the wrong line. Flattened to concatenation; recorded in CLAUDE.md.

### Verification
- Re-measured: trip page first CTA moved from 96% / 18 screens to **5% and above the fold** (6% on
  desktop). Hub from 0 CTAs to 1.
- Bar CTA sampled at every 20% of scroll depth on the 16,016px trip page: in viewport at `top=4px`
  at all six positions.
- Bar mode audited per page — booking on the trip page only, promo everywhere else, self-link gone.
- Overflow: 28/28 configurations clean at 320–1440px.

Left alone on purpose: the homepage (96% to its first WhatsApp CTA, but its departure card sits
mid-page and leads to a trip page that now converts above the fold) and the Meghalaya page (82%,
already carrying five CTAs). Both stay editorial rather than gaining a hard sell.

---

## Instagram on the Homepage (Sep 2026)

A "Field Notes" section between the testimonials and the consultation CTA, showing the account's
five most recent posts through Instagram's own embed. Reels play in place, carousels swipe, and the
media, captions and location tags come from Instagram at full resolution — nothing is copied into
the repo and nothing goes stale when a post is edited.

### Routes not taken, and why
- **Scraping the profile** — Instagram returns a JS shell with `401 require_login` to anything that
  is not a logged-in browser. Dead.
- **Tokenless oEmbed for thumbnails** — Meta dropped the access-token requirement on
  `instagram_oembed` in June 2026, and the endpoint does answer unauthenticated. But called against
  real posts it returns only the grey `<blockquote>` loading skeleton: no `thumbnail_url`, no
  media. It can confirm a post exists; it cannot give you an image. Dead for this purpose.
- **A curated grid of local images** — built and kept as `InstagramFeed.astro` (see below). It is
  the only version with no third-party JavaScript, but the images have to be sourced by hand.
- **Instagram Graph API** — the only route that keeps the *selection* current rather than just each
  post. Needs a Business/Creator account and a refreshable long-lived token. Not done; still open.

### `src/components/InstagramEmbeds.astro`
- Blockquotes are in the HTML; `embed.js` is not. A 1,494-byte inline bootstrap injects it from an
  IntersectionObserver 600px ahead of the section, so nobody who stops above it pays anything.
- Instagram hard-codes `min-width: 326px` on both the blockquote and the iframe it swaps in. At a
  320px viewport that is wider than the column and reintroduces the horizontal overflow fixed in
  `f5bd718`. The `!important` override in the global style block is that fix — **do not remove it.**
- Mobile is a scroll-snap carousel, not a stack: five embeds stacked measured 4,408px, about five
  and a half screens, which pushed the consultation CTA back down after `fcc1548` lifted it.
  One card in view, next peeking. 4,408px → 1,145px.
- Desktop is wrapping flexbox rather than grid so a trailing row centres — with five posts in three
  columns, grid would leave a hole that reads as a failed tile.
- Slots reserve `min-height: 32rem` against layout shift, released per-slot once the iframe reports
  its height (verified: zero gap under all five).
- If Instagram's script is blocked, the blockquote never hydrates, so the markup *inside* it is what
  the reader sees — hence a real link and caption rather than an empty box.

### `src/components/InstagramFeed.astro` — parked, not rendered
The curated alternative: local images, our typography, no third-party JavaScript. Kept because it is
the only version that costs nothing at all. To switch back, import it in `index.astro` and give each
post in `src/data/instagram.ts` an `image` under `public/instagram/`.

### Editorial
The 28 Aug 2026 carousel is deliberately excluded — it is a "Sorry We Ghosted!!" card apologising for
having stopped posting, which undercuts a section headed "The Trail, As It Happens". Recency is not
the only filter; judge each post before adding it.

### Verification
- **Initial load: 0 Instagram requests, 0 KB**, at 320/390/768/1280. The feature adds 6,883 bytes of
  HTML (5 blockquotes = 2,055 of it).
- **After scrolling to the section: 237 requests, 5,261 KB** — measured with site isolation disabled,
  since a parent-page measurement cannot see inside cross-origin iframes and under-reports it as
  34 KB. That is ~2.5x the rest of the homepage (2,031 KB fully scrolled). Deferred, but real.
- 5/5 embeds hydrate at every width; zero horizontal overflow at 320/390/768/1280 before and after
  swiping the carousel; blocked-script fallback shows 5/5 captioned links.
- Trailing row centring confirmed: 1280px → rows of 3+2, left gap 188px = right gap 188px;
  768px → 2+2+1, 186px = 186px.

Known and accepted: like counts (5, 13, 36, 17, 11) are structural to the embed and cannot be styled
away, and the post list is hand-maintained — new posts do not appear on their own.

---

## Chat Widget: WhatsApp Handoff (Sep 2026)

### The bug
`ChatWidget.astro` collected a name and phone, built a `mailto:`, assigned it to
`window.location.href`, and then on the very next line — unconditionally, synchronously —
swapped the form for "Thank you! We'll connect with you shortly."

It could not know whether a mail client existed, whether it opened, or whether the visitor
ever pressed Send. On a phone browser or a webmail-only desktop, the visitor read a success
message while nothing was sent. Nothing was recorded anywhere either: the site is static,
there is no backend and no form service. Every one of those leads was lost without a trace,
on the only lead-capture surface on the site, present on all 11 pages.

### The fix
- Hands off to WhatsApp, the site's primary channel everywhere else (header, departure bar,
  every trip CTA). No client configuration, works on mobile, and the visitor's number arrives
  with the chat.
- **The required "Phone" field is gone** — WhatsApp supplies the number, so asking for it was
  friction on the one form that matters. Replaced with an optional "What are you planning?"
  that makes the prefilled message useful ("Meghalaya in December, 6 of us").
- **Nothing claims delivery.** The confirmation says "Opening WhatsApp…", not "Thank you", and
  always shows the raw link. If `window.open` returns null (blocked popup) the heading becomes
  "Tap to open WhatsApp" instead, so a blocked handoff is recoverable rather than a silent
  dead end.
- The bubble icon is now the WhatsApp glyph rather than a generic speech bubble — it should
  promise the channel it actually opens.
- `mailto:` survives as a clearly-labelled "Prefer email?" fallback, kept in sync with whatever
  the visitor has typed.

### Accessibility, fixed in passing
`role="dialog"` and `aria-labelledby`; Escape closes and returns focus to the bubble;
`aria-expanded` tracks state; opening focuses the name field.

### Verification
24/24 checks green — 6 routes x 4 widths (320/390/768/1280): panel opens, submit produces a
`https://wa.me/916002324880?text=` URL, the success copy never claims the message was sent,
zero horizontal overflow, no JS errors. Blocked-popup path asserted separately.
