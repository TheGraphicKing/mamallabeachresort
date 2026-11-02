# Asset inventory & photography plan

## Status — sample photography (prototype)

The site now uses **remote sample photography** so the design can be judged with real imagery:

- **Unsplash** photos (Unsplash License — free for commercial use, no attribution required).
- **Wikimedia Commons** photos of the Mahabalipuram monuments (public monuments; licences vary per file,
  usually CC BY-SA — **verify each file and add attribution before production**).

**None of these photographs depict Mamalla Beach Resort.** Captions and alt text describe what is shown,
not the resort, and the footer, gallery and terms state that photography is representative. Replace every
row below with approved resort photography before launch.

### Important — these were not visually verified
The build environment could not reach Unsplash or Wikimedia, so photo IDs were chosen from memory and
**could not be previewed**. Each slot has a primary and a backup source; if both fail to load, the slot
falls back to the original SVG illustration (labelled "Illustration"), so nothing ever shows as broken.
**Please review every image on the deployed site** and swap any that are off-subject in
`src/content/media.ts` (one line per slot).

## How it works
`src/content/media.ts` is the single manifest. Each slot has:
- `src` — an approved local photo (`/public/images/...`). **Takes priority** over everything else.
- `photos` — sample photos tried in order (`{ unsplash: "<id>" }` or `{ url }`), served at responsive widths.
- `scene` — the fallback illustration.

To publish an approved photo:
1. Save it as `public/images/<area>/<name>.jpg` (≥ 2400 px wide for heroes, ≥ 1600 px otherwise).
2. In `src/content/media.ts` add `src`, `width`, `height` to the slot and update `alt` to describe the photo.
3. `next/image` then serves optimised AVIF/WebP automatically.

To swap a sample photo: replace the Unsplash id (the part after `photo-` in an `images.unsplash.com` URL).

## Manifest

| Slot | Shows (alt text) | Sample sources (primary / backup) | Licence | Status |
|---|---|---|---|---|
| `heroShore` | Waves running up a quiet beach in soft evening light | [`1507525428034…`](https://unsplash.com/photos/1507525428034-b723cf961d3e) / [`1519046904884…`](https://unsplash.com/photos/1519046904884-53103b34b206) | Unsplash License (free commercial use) | Sample — replace |
| `beach` | Shallow waves on an empty beach | [`1471922694854…`](https://unsplash.com/photos/1471922694854-ff1b63b20054) / [`1510414842594…`](https://unsplash.com/photos/1510414842594-a61c69b5ae57) | Unsplash License (free commercial use) | Sample — replace |
| `dusk` | A wave curling over in clear light | [`1500375592092…`](https://unsplash.com/photos/1500375592092-40eb2168fd21) / [`1506929562872…`](https://unsplash.com/photos/1506929562872-bb421503ef21) | Unsplash License (free commercial use) | Sample — replace |
| `coastSunset` | The sea at sunset | [`1473116763249…`](https://unsplash.com/photos/1473116763249-2faaef81ccda) / [`1505228395891…`](https://unsplash.com/photos/1505228395891-9a51e7e86bf6) | Unsplash License (free commercial use) | Sample — replace |
| `romance` | A calm stretch of coastline in warm light | [`1506953823976…`](https://unsplash.com/photos/1506953823976-52e1fdc0149a) / [`1544551763-46…`](https://unsplash.com/photos/1544551763-46a013bb70d5) | Unsplash License (free commercial use) | Sample — replace |
| `family` | A family walking together along the shore | [`1476673160081…`](https://unsplash.com/photos/1476673160081-cf065607f449) / [`1502086223501…`](https://unsplash.com/photos/1502086223501-7ea6ecd79368) | Unsplash License (free commercial use) | Sample — replace |
| `introPalms` | Resort grounds with palms, loungers and a pool | [`1520250497591…`](https://unsplash.com/photos/1520250497591-112f2f40a3f4) / [`1551882547-ff…`](https://unsplash.com/photos/1551882547-ff40c63fe5fa) | Unsplash License (free commercial use) | Sample — replace |
| `introStone` | A resort building and pool lit up at dusk | [`1566073771259…`](https://unsplash.com/photos/1566073771259-6a8506099945) / [`1445019980597…`](https://unsplash.com/photos/1445019980597-93fa8acb246c) | Unsplash License (free commercial use) | Sample — replace |
| `gardens` | Low resort buildings among tropical planting | [`1551882547-ff…`](https://unsplash.com/photos/1551882547-ff40c63fe5fa) / [`1445019980597…`](https://unsplash.com/photos/1445019980597-93fa8acb246c) | Unsplash License (free commercial use) | Sample — replace |
| `pool` | An outdoor swimming pool framed by palms | [`1571003123894…`](https://unsplash.com/photos/1571003123894-1f0594d2b5d9) / [`1540541338287…`](https://unsplash.com/photos/1540541338287-41700207dee6) | Unsplash License (free commercial use) | Sample — replace |
| `poolLoungers` | Sun loungers beside a resort pool | [`1540541338287…`](https://unsplash.com/photos/1540541338287-41700207dee6) / [`1584132967334…`](https://unsplash.com/photos/1584132967334-10e028bd69f7) | Unsplash License (free commercial use) | Sample — replace |
| `roomDeluxe` | A calm hotel bedroom with crisp white linen | [`1582719478250…`](https://unsplash.com/photos/1582719478250-c89cae4dc85b) / [`1618773928121…`](https://unsplash.com/photos/1618773928121-c32242e63f39) | Unsplash License (free commercial use) | Sample — replace |
| `roomDeluxe2` | A double bed with soft natural light | [`1618773928121…`](https://unsplash.com/photos/1618773928121-c32242e63f39) / [`1631049307264…`](https://unsplash.com/photos/1631049307264-da0ec9d70304) | Unsplash License (free commercial use) | Sample — replace |
| `roomDeluxe3` | A hotel room seating corner | [`1590490360182…`](https://unsplash.com/photos/1590490360182-c33d57733427) / [`1578683010236…`](https://unsplash.com/photos/1578683010236-d716f9a3f461) | Unsplash License (free commercial use) | Sample — replace |
| `roomStandard` | A simple, comfortable hotel bedroom | [`1611892440504…`](https://unsplash.com/photos/1611892440504-42a792e24d32) / [`1631049307264…`](https://unsplash.com/photos/1631049307264-da0ec9d70304) | Unsplash License (free commercial use) | Sample — replace |
| `roomStandard2` | Neatly made beds in a bright room | [`1631049307264…`](https://unsplash.com/photos/1631049307264-da0ec9d70304) / [`1578683010236…`](https://unsplash.com/photos/1578683010236-d716f9a3f461) | Unsplash License (free commercial use) | Sample — replace |
| `dining` | A warmly lit restaurant dining room | [`1517248135467…`](https://unsplash.com/photos/1517248135467-4c7edcad34c4) / [`1555396273-36…`](https://unsplash.com/photos/1555396273-367ea4eb4db5) | Unsplash License (free commercial use) | Sample — replace |
| `diningPlate` | Plated dishes on a restaurant table | [`1414235077428…`](https://unsplash.com/photos/1414235077428-338989a2e8c0) / [`1504674900247…`](https://unsplash.com/photos/1504674900247-0877df9cc836) | Unsplash License (free commercial use) | Sample — replace |
| `diningIndian` | Bowls of Indian curry and rice | [`1585937421612…`](https://unsplash.com/photos/1585937421612-70a008356fbe) / [`1589302168068…`](https://unsplash.com/photos/1589302168068-964664d93dc0) | Unsplash License (free commercial use) | Sample — replace |
| `lawn` | A couple on their wedding day | [`1519741497674…`](https://unsplash.com/photos/1519741497674-611481863552) / [`1519225421980…`](https://unsplash.com/photos/1519225421980-715cb0215aed) | Unsplash License (free commercial use) | Sample — replace |
| `reception` | Reception tables dressed for an evening celebration | [`1464366400600…`](https://unsplash.com/photos/1464366400600-7168b8af9bc3) / [`1511795409834…`](https://unsplash.com/photos/1511795409834-ef04bbd61622) | Unsplash License (free commercial use) | Sample — replace |
| `celebrationTable` | A long table set with flowers and candles | [`1511795409834…`](https://unsplash.com/photos/1511795409834-ef04bbd61622) / [`1505236858219…`](https://unsplash.com/photos/1505236858219-8359eb29e329) | Unsplash License (free commercial use) | Sample — replace |
| `hall` | A meeting room set up for a team session | [`1431540015161…`](https://unsplash.com/photos/1431540015161-0bf868a2d407) / [`1497366216548…`](https://unsplash.com/photos/1497366216548-37526070297c) | Unsplash License (free commercial use) | Sample — replace |
| `shoreTemple` | The Shore Temple at Mamallapuram, part of a UNESCO World Heritage Site | Commons: `Shore Temple Mamallapuram.jpg` / Commons: `Mahabalipuram Shore Temple.jpg` | Per-file (CC) — verify & attribute | Sample — replace |
| `panchaRathas` | The Pancha Rathas, monolithic shrines at Mamallapuram | Commons: `Pancha Rathas.jpg` / Commons: `Five Rathas Mahabalipuram.jpg` | Per-file (CC) — verify & attribute | Sample — replace |
| `arjunasPenance` | Arjuna's Penance, the great rock relief at Mamallapuram | Commons: `Arjuna's Penance.jpg` / Commons: `Descent of the Ganges` / Commons: `Mahabalipuram.jpg` | Per-file (CC) — verify & attribute | Sample — replace |
| `butterBall` | Krishna's Butter Ball, a giant balanced boulder in Mamallapuram | Commons: `Krishna's Butterball.jpg` / Commons: `Krishna's Butter Ball.jpg` | Per-file (CC) — verify & attribute | Sample — replace |

Other assets: wordmark (typeset + original line motif — replace with official logo if one exists),
`/opengraph-image` (generated typographic card), `public/art/*.svg` (original fallback illustrations,
generated by `npm run artwork`).

## Photography shot list for the resort

Priority 1 — needed for launch
- Hero: the beach or sea at golden hour with a recognisable resort element (landscape + portrait crops).
- Deluxe Room and Standard Room (AC and non-AC if they differ): bed, window/view, bathroom, detail.
- Outdoor pool and children's pool; The Seagull dining room and 2–3 dishes it actually serves.
- The lawn set for a wedding/reception; banquet hall and conference hall in typical layouts.

Priority 2 — gardens, exteriors, arrival, beach access route, real events (with written consent).
Priority 3 — own or licensed photos of the Mahabalipuram monuments; an aerial photo or site plan
(replaces the conceptual map).

## Rules
- Don't present sample images as the resort's rooms, food, pool or venues.
- Don't use competitors' photographs.
- Record photographer, date and licence for every approved file.
