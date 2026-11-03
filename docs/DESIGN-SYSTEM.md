# Design system — "Sandstone & Palm"

Tokens live in `src/app/globals.css` (`@theme`). Use the Tailwind utilities they generate
(`bg-ocean`, `text-display-md`, `ease-[var(--ease-tide)]`, …) rather than raw values.

## Direction
Contemporary luxury-resort UI (as seen across current Dribbble hospitality work): warm greige paper, an inset
rounded hero frame, a floating pill navigation, a white pill booking widget, pill buttons with circular arrows,
rounded image cards, amenity tiles, a bento experiences grid, deep palm-green panels and a giant footer wordmark.

## Colour
| Token | Hex | Use |
|---|---|---|
| `ivory` | #f5f1ea | Page background (warm paper) |
| `ivory-deep` | #e9e3d7 | Greige band (rooms) |
| `paper` | #fbf9f5 | Cards, booking widget, scrolled nav pill |
| `ocean-deep` | #17302a | Deep palm green — panels, primary buttons, footer |
| `ocean` | #2a4740 | Secondary green panel |
| `sand` / `sand-deep` | #e6d4b2 / #c7a66c | Champagne accents on green |
| `brass` / `brass-deep` | #b48a4e / #82612d | Lines / accent text on paper |
| `stone-deep` | #5a5247 | Labels and captions |
| `ink` | #1d211e | Body text |

## Palettes
Five palettes, switchable live from the on-site **Preview** panel (saved per browser):
`palm` (default), `midnight`, `noir`, `laterite`, `azure`. Defined as token overrides under
`[data-theme="…"]` in `globals.css`; listed in `src/content/themes.ts`. All meet WCAG AA for text.
Set the launch palette with `NEXT_PUBLIC_THEME` and hide the panel with `NEXT_PUBLIC_PREVIEW_PANEL=off`.

## Photography grade
Remote photos get `contrast(1.12) saturate(1.15) brightness(0.97)` for deeper, richer images.
Remove the rule in `globals.css` once real, professionally graded resort photography is in place.

## Shape
`--radius-media` 1.75rem (images), `--radius-card` 1.5rem (tiles), `--radius-frame` 2.25rem (hero, panels, footer).
Buttons, chips, nav and booking bar are fully rounded pills. Full-bleed parallax layers use `.media-bleed`.

## Typography
- Display: **Bodoni Moda** (variable, optical sizing, roman + italic) — high-contrast didone for an editorial, couture feel.
- Display weight 500 with a fixed optical size (`opsz 24`) so hairlines stay sturdy at large sizes.
- Text & labels: **Jost** 400/500/600 — geometric, Futura-like; labels in uppercase with 0.26–0.32em tracking.
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
