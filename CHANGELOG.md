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
