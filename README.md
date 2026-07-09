# luispalomares.com

Personal portfolio of Luis Palomares — a mission-driven product leader, designer, and founder based in Austin.

Built with [Nuxt 3](https://nuxt.com) and rendered as a static site (SSG) so the
HTML is fully crawlable by search engines and social/preview bots.

## Stack

- **Nuxt 3** (Vue 3), static generation via `nuxi generate`
- File-based routing (`src/pages`) with a shared two-panel layout
- Static content in a composable (`src/composables/useProjects.js`)
- Per-page SEO with `useSeoMeta` + schema.org Person JSON-LD
- Bulma + SCSS, Font Awesome, Google Analytics (client-only)

## Develop

```bash
pnpm install
pnpm dev        # local dev server
```

## Build & preview

```bash
pnpm generate   # static output to .output/public
pnpm preview    # preview the built site
```

## Deploy

Deploys to GitHub Pages (custom domain `luispalomares.com`). Pushes to `main`
deploy automatically via GitHub Actions (`.github/workflows/deploy.yml`), which
publishes `.output/public` to the `gh-pages` branch.

Manual fallback:

```bash
pnpm deploy     # generate + push .output/public via gh-pages
```

## About

A mission-driven product [leader](https://www.linkedin.com/in/luis-palomares/). I've championed tech initiatives that guard families against wire fraud in real estate, amplify transparency in mortgage lending, and open credit avenues for immigrants, steering startups from [seed](https://tucson.com/business/article_cf74558c-5f18-552b-81a0-cf60679257cf.html) to [Series C](https://www.businesswire.com/news/home/20250715516305/en/CertifID-Raises-%2447.5-Million-Series-C-Led-by-Centana-Growth-Partners).

Product @ [CertifID](https://certifid.com)

I like to [design](https://dribbble.com/luispalomares), code, and [make dance music](https://7thst.music).
