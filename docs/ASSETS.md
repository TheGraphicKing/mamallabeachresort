# Asset inventory & photography plan

## Status

**No authentic Mamalla Beach Resort photography is in this repository.** The build environment could
not reach `mamallaresort.com`, `mamalla.com` or any image host, and no rights-cleared images were
supplied. Rather than use random stock or AI images that could be mistaken for the property, every
image slot renders **original SVG artwork** (`src/components/media/Artwork.tsx`), labelled
"Illustration" on screen, in galleries and in the footer.

## How to replace an illustration with a photograph

1. Export the photo at ≥ 2400 px on the long edge (hero) or ≥ 1600 px (others), sRGB, JPEG/AVIF/WebP.
2. Save it under `public/images/<area>/<meaningful-name>.jpg`, e.g. `public/images/rooms/deluxe-room-01.jpg`.
3. In `src/content/media.ts`, add `src`, `width` and `height` to the matching entry:

   ```ts
   roomDeluxe: {
     id: "room-deluxe",
     src: "/images/rooms/deluxe-room-01.jpg",
     width: 2400,
     height: 1600,
     alt: "Deluxe Room with double bed and pool-facing window",
     ...
   }
   ```

4. That's all. `<Media>` switches to `next/image` (AVIF/WebP, responsive `srcset`, lazy loading
   below the fold) and the "Illustration" label disappears automatically.
5. Update the alt text to describe what the photo actually shows.

For remote images (e.g. a DAM/CDN), add the host to `images.remotePatterns` in `next.config.ts`.

## Inventory

| Registry key | Used in | Current source | Type | Licence | Resort approval |
|---|---|---|---|---|---|
| `heroShore` | Home hero, tour fallback | Original SVG artwork | Conceptual illustration | Original work, owned by project | Replace with photo — required |
| `introPalms` | Home intro, About hero, Family story | Original SVG | Illustration | Original | Replace — required |
| `introStone` | Home intro inset, FAQ hero | Original SVG (carved lotus motif) | Decorative | Original | Optional (decorative) |
| `pool` | Experiences, About, Offers, Map | Original SVG | Illustration | Original | Replace — required |
| `beach` | Experiences, Map, Book hero | Original SVG | Illustration | Original | Replace — required |
| `dusk` | Final CTA, Romance, Dining, 404 | Original SVG | Illustration | Original | Replace — recommended |
| `roomDeluxe` | Rooms, Deluxe Room page, Map | Original SVG | Illustration | Original | Replace — **required before launch** |
| `roomStandard` | Rooms, Standard Room page | Original SVG | Illustration | Original | Replace — **required before launch** |
| `dining` | Dining, Home, Map | Original SVG | Illustration | Original | Replace — required |
| `lawn` | Weddings, Events, Map | Original SVG | Illustration | Original | Replace — required |
| `hall` | Meetings, Events, Map | Original SVG | Illustration | Original | Replace — required |
| `shoreTemple` | Heritage band, Experiences, Contact | Original SVG silhouette | Illustration of a public monument | Original | Optional — or licensed photo of the Shore Temple |
| `gardens` | Explore hero, Standard Room gallery | Original SVG | Illustration | Original | Replace — recommended |
| Wordmark | Header/footer | Typeset + original line motif | Brand placeholder | Original | Replace with official logo if one exists |
| `opengraph-image` | Social sharing | Generated typographic card | Graphic | Original | Optional: replace with hero photo |

## Photography shot list (to commission or collect from the resort)

Priority 1 — needed for launch
- Hero: wide beach/sea at golden hour, with a recognisable resort element (landscape 3:2 and portrait 4:5 crops).
- Deluxe Room: bed wide shot, window/view, bathroom, detail (4 images).
- Standard Room (AC and non-AC if they differ): bed wide shot, detail (2–4 images).
- Outdoor pool (wide + detail) and children's pool.
- The Seagull: dining room, terrace (if any), 2–3 signature dishes actually served.
- Lawn set for a wedding / reception; banquet hall set up; conference hall in classroom/theatre layout.

Priority 2
- Gardens and paths, building exteriors, arrival/reception.
- Beach access route from the resort.
- Real events (with the couple's / client's written consent).

Priority 3
- Mahabalipuram monuments (licensed or own photography).
- Aerial/drone photo or architect's site plan → replaces the conceptual map (`src/components/explore/ResortMap.tsx`).

## Rules
- Do not use AI-generated images to depict rooms, food, pools, views or buildings.
- Do not use stock photos of other properties.
- Keep a record of photographer, date and licence for each file (add a row above).
