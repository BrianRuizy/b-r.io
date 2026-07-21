# Brian Ruiz

Personal site for [b-r.io](https://b-r.io) — portfolio, writing, projects, and uses.

Built from the [Tailwind Plus Spotlight](https://tailwindcss.com/plus/templates/spotlight) template, customized with my content and design. This is a live personal website, not a redistributable starter kit.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [MDX](https://mdxjs.com) for posts
- [Tailwind CSS](https://tailwindcss.com) v4
- [Motion](https://motion.dev) for animation

## Getting started

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in values
3. `npm run dev`

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (OG, sitemap, RSS) |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox GL (blog map demo) |
| `CONVERTKIT_API_KEY` / `CONVERTKIT_FORM_ID` | Newsletter signup |

## Version history

- **3.0** — Spotlight-based rebuild (this repo)
- **2.x** — Previous Contentlayer site (archived on the `archive/v2` branch of [b-r.io](https://github.com/BrianRuizy/b-r.io))
