# AGENTS.md

Conventions for AI coding agents working in this repository.

**`CLAUDE.md` in the repo root is the canonical brief.** Read it first. It carries the
project overview, site structure, hosting and deployment chain, DNS/Cloudflare history,
and the non-obvious technical constraints (Astro 7 compiler quirks, the `--dep-bar-h`
offset variable, the Instagram embed overflow fix). This file exists only so agents that
do not look for `CLAUDE.md` by name still find their way there; it is deliberately a
pointer rather than a copy, so the two cannot drift apart.

## Quick orientation

| | |
| --- | --- |
| Stack | Astro 7 (static output) + Tailwind CSS v4, Node >= 22.12 |
| Install | `npm install` |
| Dev server | `npm run dev` |
| Build | `npm run build` (runs `astro build`, then copies the sitemap index to `/sitemap.xml`) |
| Content | Astro Content Collections in `src/content/`, schemas in `src/content.config.ts` |
| Site-wide config | `src/data/site.ts` — name, tagline, URL, default OG image, contact details |

## Rules that matter

- **Pushing to `main` is the deploy.** GitHub Actions builds and publishes to the
  `gh-pages` branch, which GitHub Pages serves behind Cloudflare. There is no separate
  release step, so never push without being asked to.
- **Never commit to `gh-pages` by hand** — it is force-rewritten on every deploy.
- **There is no backend.** The site is fully static. Nothing may claim to have sent,
  saved, or submitted anything; contact happens via WhatsApp and `mailto:` hand-offs.
- **Single-source the contact details.** Read them from `siteConfig.contact`; do not
  hardcode the email, phone number, or Instagram URL anywhere.
- **Run `npm run build` before handing work back.** It is the only check in this repo —
  there is no test suite or linter — and the Astro 7 Rust compiler rejects markup the
  old compiler tolerated.
- **Keep the machine-readable surfaces in step with the pages.** `/llms.txt`
  (`src/pages/llms.txt.ts`) and the JSON-LD in `src/layouts/Layout.astro` are generated
  from the same collections and config as the pages, and should stay that way — a
  hand-maintained list goes stale the first time content is added.
