# Design system — "Granite & Tide"

Tokens live in `src/app/globals.css` (`@theme`). Use the Tailwind utilities they generate
(`bg-ocean`, `text-display-md`, `ease-[var(--ease-tide)]`, …) rather than raw values.

## Colour
| Token | Hex | Use |
|---|---|---|
| `ivory` | #f7f2e9 | Page background |
| `ivory-deep` | #efe6d6 | Alternate section background, panels |
| `sand` / `sand-deep` | #e5d7bf / #cdb894 | Accents on dark, image placeholders |
| `stone` / `stone-deep` | #8f8371 / #5f564a | Eyebrows, captions (stone-deep for AA text) |
| `seaglass` / `seaglass-deep` | #a7c1b5 / #4f7468 | Range highlight, italic accents, icons |
| `ocean` / `ocean-deep` | #1f3a4b / #12232f | Primary buttons, headings, dark sections, footer |
| `charcoal` | #1f2326 | Events section contrast |
| `ink` | #2b2925 | Body text |
| `terracotta` | #a85a36 | Focus ring, selected map pin, required marks — sparingly |
| `brass` | #a88752 | Bullets, notice rule |

Contrast: `ink` on `ivory` ≈ 13:1; `stone-deep` on `ivory` ≈ 6.5:1; `ivory` on `ocean-deep` ≈ 14:1.

## Typography
- Display: **Cormorant Garamond** 400/500 + italic (via `next/font`, self-hosted, `display: swap`).
- Interface: **Manrope** 400/500/600.
- Scale: `text-display-xl` (hero), `-lg` (page titles), `-md` (section titles), `-sm` (sub-titles), `text-lead`, `eyebrow` (0.72rem, 0.24em tracking, uppercase).
- Italic serif in `sand` / `seaglass-deep` marks the emotional half of a headline — once per heading at most.

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
- Hero entrance is CSS (runs before hydration). Page transitions skip the first render.
- `prefers-reduced-motion`: Framer `MotionConfig reducedMotion="user"` + CSS override; parallax disabled.
- Library choice: Framer Motion only. GSAP was not needed.

## Breakpoints
Tailwind defaults (sm 40rem, md 48rem, lg 64rem, xl 80rem) + `xs` 26rem, `3xl` 112rem.
- < md: booking as stacked panel + bottom sheet + sticky "Call / Check availability" bar.
- ≥ md: booking bar overlapping the hero.
- ≥ xl: primary nav links visible in header.
