# Tranquil Trail Travels

Premium customized travel itineraries for Northeast India — Assam, Arunachal Pradesh, Meghalaya & Nagaland. Luxury journeys crafted for the discerning traveler.

## Tech Stack

- [Astro](https://astro.build/) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first CSS

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

Deployed to **GitHub Pages** with a custom domain (`tranquiltrailtravels.com`). The deploy workflow runs on push to `main`.
