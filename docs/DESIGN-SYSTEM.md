# Design system — "Nocturne"

Tokens live in `src/app/globals.css` (`@theme`). Use the Tailwind utilities they generate
(`bg-ocean`, `text-display-md`, `ease-[var(--ease-tide)]`, …) rather than raw values.

## Colour — night lagoon, parchment, champagne
Inspired by the restraint of top resort brands (dark cinematic heroes, warm paper tones, a single metallic accent).

| Token | Hex | Use |
|---|---|---|
| `ocean-deep` | #0d1a1c | Night lagoon — hero, dark sections, scrolled header, footer, primary buttons |
| `ocean` | #1b3134 | Secondary dark surface |
| `ivory` | #f4efe6 | Parchment — page background, light text on dark |
| `ivory-deep` | #eae2d4 | Alternate parchment band |
| `sand` / `sand-deep` | #e2cfae / #c4a574 | Champagne — accents on dark, glass-bar CTA |
| `brass` | #b8955c | Lines, dots, rules (not text on light) |
| `brass-deep` | #87672f | Bronze accent text on parchment (4.6:1) |
| `stone-deep` | #5c5348 | Eyebrows and captions on parchment (6.6:1) |
| `seaglass-deep` | #46675e | Italic accents, icons |
| `ink` | #1f1d1a | Body text (14.7:1 on parchment) |
| `terracotta` | #9c5233 | Laterite — focus ring, selected map pin |

## Typography
- Display: **Bodoni Moda** (variable, optical sizing, roman + italic) — high-contrast didone for an editorial, couture feel.
- Text & labels: **Jost** 300/400/500 — geometric, Futura-like; labels in uppercase with 0.26–0.32em tracking.
- Scale: `text-display-xl` (hero), `-lg`, `-md`, `-sm`, `text-lead`, `eyebrow` (0.68rem, 0.32em).
- One italic champagne/bronze phrase per headline at most.

## Layout
- `container-site`: max 82rem, gutters 1.25rem → 2.5rem (md) → 3.5rem (xl), respects safe-area.
- 12-column grid at `lg`, asymmetric spans (5/7, 4/8, 7/5 with offsets) — avoid equal card grids.
- Vertical rhythm: `section-y` = clamp(5rem, 11vw, 10rem).
- Borders: hairlines (`border-ink/12`), square corners. No drop-shadow cards except floating panels.

## Imagery
- Aspect ratios: 4:3 (rooms), 4:5 (portrait features), 16:9 / 21:9 (bands), 16:10 (venues, map panel), 1:1 (inset).
- Always via `<Media>`, which reserves the box and labels illustrations.

## Components
`LinkButton/Button` (primary, secondary, light, outline-light, ghost) · `ArrowLink` · `Eyebrow` · `SectionHeading` ·
`FactList` · `Notice` · `PageHero` · `Reveal` · `Parallax` · `BookingForm` (bar/panel) · `DateRangeCalendar` ·
`GuestSelector` · `BookingProvider/BookButton` · `EnquiryForm` · `Gallery` · `ResortMap` · `TourEmbed` · `Faq` ·
`EventLanding` · `LegalPage`.

## Motion
- Easing: `--ease-tide` cubic-bezier(0.22, 1, 0.36, 1) for reveals; `--ease-swell` (0.65, 0, 0.35, 1) for menu curtains.
- Durations: quick 180ms (hover), base 320ms (UI), slow 700ms+ (reveals, 0.9–1.3s for image masks).
- Hierarchy: cinematic moments = hero zoom, image mask reveals, parallax bands, menu curtain. Everything else is a short fade or colour change.
- Hero: muted film over a photo poster (desktop only, honours reduced-motion and data-saver, pause control); CSS entrance runs before hydration.
- Page transitions skip the first render.
- `prefers-reduced-motion`: Framer `MotionConfig reducedMotion="user"` + CSS override; parallax disabled.
- Library choice: Framer Motion only. GSAP was not needed.

## Breakpoints
Tailwind defaults (sm 40rem, md 48rem, lg 64rem, xl 80rem) + `xs` 26rem, `3xl` 112rem.
- < md: booking as stacked panel + bottom sheet + sticky "Call / Check availability" bar.
- ≥ md: booking bar overlapping the hero.
- ≥ xl: primary nav links visible in header.
