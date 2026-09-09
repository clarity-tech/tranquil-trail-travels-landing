# Tranquil Trail Travels

Premium customized travel itineraries for Northeast India — Assam, Arunachal Pradesh, Meghalaya & Nagaland. Luxury journeys crafted for the discerning traveler.

## Tech Stack

- [Astro](https://astro.build/) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first CSS
- [GitHub Pages](https://pages.github.com/) — static hosting, behind Cloudflare for DNS/TLS/CDN

## Project Structure

```text
/
├── public/              # Static assets (favicon, og-image, robots.txt)
├── src/
│   ├── components/      # Astro components (ChatWidget)
│   ├── data/            # Shared site constants (site.ts)
│   ├── layouts/         # Page layouts (Layout.astro)
│   ├── pages/           # Routes (index.astro, llms.txt.ts)
│   └── styles/          # Global CSS
├── astro.config.mjs
└── package.json
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview the build locally before deploying   |

## SEO Features

- Canonical URLs on every page
- Open Graph & Twitter Card meta tags
- JSON-LD structured data (`TravelAgency` schema)
- Auto-generated sitemap (`/sitemap.xml`, `/sitemap-index.xml`)
- `llms.txt` for AI crawler discoverability
- `robots.txt`

## Deployment

Pushing to `main` **is** the deploy — there is no manual step. GitHub Actions
(`.github/workflows/deploy.yml`) builds the site with Node 24 and publishes `dist/` to the
`gh-pages` branch, which GitHub Pages serves. Cloudflare sits in front as DNS + CDN and
terminates TLS for `tranquiltrailtravels.com`.

```text
push to main → GitHub Actions build → gh-pages branch → GitHub Pages → Cloudflare → tranquiltrailtravels.com
```

Changes are live roughly 1–2 minutes after the push; follow a run with
`gh run watch --repo clarity-tech/tranquil-trail-travels-landing`. Cloudflare caches HTML for
10 minutes (`max-age=600`), so a hard refresh or a cache purge may be needed to see an update
right away.

The `gh-pages` branch is force-rewritten on every deploy — don't commit to it directly.
