# Mamalla Beach Resort — website

A premium, mobile-first website for **Mamalla Beach Resort**, Mahabalipuram (Mamallapuram), Tamil Nadu.
Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Framer Motion.

> **Before launch, read [`docs/CONTENT-VERIFICATION.md`](docs/CONTENT-VERIFICATION.md),
> [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md) and [`docs/ASSETS.md`](docs/ASSETS.md).**
> All imagery is currently original illustration (no resort photographs were available), and the
> booking engine, enquiry delivery and 360° tour need the resort's credentials/URLs.

## Pages

| Route | Page |
|---|---|
| `/` | Home — cinematic hero, booking bar, intro, rooms, experiences, dining, interactive map, events, FAQs, CTA |
| `/about` | About the resort and Mahabalipuram |
| `/rooms` · `/rooms/[slug]` | Rooms & accommodation; Deluxe Room and Standard Room detail pages |
| `/experiences` | Beach, pool, dining, family, romance, weddings, corporate, nearby monuments |
| `/dining` | The Seagull restaurant + dining enquiry |
| `/weddings` · `/meetings` | Event landing pages with venues and event enquiry form |
| `/gallery` | Filterable gallery with full-screen, keyboard and swipe lightbox |
| `/explore` | 360° tour integration point + interactive conceptual resort map |
| `/offers` | Offers & packages (enquiry-led — no unverified offers published) |
| `/book` | Reservation request (pre-filled from the booking bar) |
| `/contact` · `/faq` | Contact & location, FAQs (with FAQPage structured data) |
| `/privacy` · `/terms` | Privacy policy, terms & booking policies |
| `/api/enquiry` | Validated, spam-protected enquiry endpoint (Resend and/or webhook) |
| `/sitemap.xml` · `/robots.txt` · `/opengraph-image` | SEO |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional for local dev
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks and lints) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run artwork` | Regenerate the illustration SVGs in `public/art/` (runs automatically before `dev` and `build`) |
| `npm test` | Unit tests for booking validation, engine URL building and enquiry validation (Node test runner) |

## Environment variables

See [`.env.example`](.env.example). Summary:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, OG (default `https://www.mamallaresort.com`) |
| `NEXT_PUBLIC_BOOKING_ENGINE_URL` + `NEXT_PUBLIC_BOOKING_PARAM_*` + `NEXT_PUBLIC_BOOKING_DATE_FORMAT` | Hand-off to the resort's booking engine |
| `NEXT_PUBLIC_VIRTUAL_TOUR_URL` | Embeddable 360° tour URL |
| `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` | Deliver enquiries by email |
| `ENQUIRY_WEBHOOK_URL` | Deliver enquiries to a webhook as JSON |

`NEXT_PUBLIC_*` values are inlined at build time — rebuild after changing them.

## Updating content

Content is separated from presentation:

- `src/content/resort.ts` — contact details, facilities, dining, event spaces, attractions, navigation
- `src/content/rooms.ts` — room categories
- `src/content/experiences.ts` — experiences, map zones, FAQs
- `src/content/media.ts` — every image slot (add `src` to swap an illustration for a photo)

Facts carry a verification status (`confirmed` / `listed` / `unknown`); unknown values render as
"Confirmed on enquiry" instead of being guessed.

## Deployment

Any Node 20.9+ host that runs Next.js works. Recommended: **Vercel**.

1. Import the repository, framework preset "Next.js".
2. Add the environment variables above (Production and Preview).
3. Deploy. Point the domain's DNS at the host and set `NEXT_PUBLIC_SITE_URL` to the final domain.

Self-hosting: `npm ci && npm run build && npm start` (port 3000) behind a reverse proxy with HTTPS.
For multiple instances, replace the in-memory rate limiter in `src/app/api/enquiry/route.ts` with a shared store.

## Project structure

```
src/
  app/              routes, layout, metadata, sitemap/robots/OG, API route
  components/
    booking/        BookingForm, DateRangeCalendar, GuestSelector, BookingDrawer (provider + sheet)
    explore/        ResortMap, TourEmbed
    forms/          EnquiryForm
    gallery/        Gallery + lightbox
    home/           homepage sections
    layout/         SiteHeader, SiteFooter, MobileBookBar, Wordmark
    media/          Media (photo or labelled illustration), Artwork (SVG scenes)
    motion/         Reveal, Parallax, MotionProvider
    sections/       PageHero, HomeHero, EventLanding, LegalPage, Faq
    ui/             Button, Typography, FactList, Notice
  content/          typed content (edit here)
  lib/              booking + enquiry logic, config, SEO helpers
scripts/            build-artwork.tsx (renders illustrations to public/art/)
docs/               research, design system, assets, integrations, content verification
tests/              unit tests
```

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus ring, keyboard-operable calendar, menu, drawer, lightbox and map.
- Native `<details>` FAQs work without JavaScript; scroll-revealed content is shown when JS is off.
- `prefers-reduced-motion` respected (Framer `MotionConfig` + CSS).
- Pages are statically generated; the 360° tour is click-to-load; no autoplay video; fonts self-hosted.
