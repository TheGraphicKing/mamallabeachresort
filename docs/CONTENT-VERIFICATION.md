# Content verification checklist (for the resort)

Every fact on the site lives in `src/content/`. Facts carry a status:

- `confirmed` — signed off by the resort
- `listed` — taken from public listings / the official site summary; **needs sign-off**
- `unknown` — not published; the site shows "Confirmed on enquiry"

Please confirm or correct each item, then change its status to `confirmed`.

## Business details — `src/content/resort.ts`
- [ ] Address: **108, Kovalam Road (East Coast Road), Mamallapuram, Tamil Nadu 603104** (one listing says OMR)
- [ ] Phone: **+91 44 2744 2475**
- [ ] Email: **rajeev@mamallaresort.com** — is this the right public reservations address?
- [ ] WhatsApp Business number (currently not shown)
- [ ] Official social media profiles (currently not shown)

## Rooms — `src/content/rooms.ts`
- [ ] Are **Standard** and **Deluxe** the complete list of categories? Any suites/cottages/family rooms?
- [ ] Deluxe Room: 28 m², one double bed, air-conditioned
- [ ] Standard Room: AC and non-AC options; size; bed type
- [ ] Max occupancy, extra-bed and child policies for each category
- [ ] In-room amenities (TV, Wi-Fi, kettle, minibar, etc.)
- [ ] Which rooms face the pool / garden / sea

## Facilities
- [ ] Outdoor pool, children's pool — and pool timings
- [ ] Beach access — private or public beach? Safe-swimming guidance?
- [ ] Any facilities not yet listed (spa, gym, play area, parking, Wi-Fi, room service, airport transfers)

## Dining — `dining` in `resort.ts`
- [ ] The Seagull: multi-cuisine; lunch & dinner; weekend buffet
- [ ] Breakfast: where and when; included in which rates
- [ ] Opening hours; meal plans (EP / CP / MAP / AP) and how they're sold

## Events — `events` in `resort.ts`
- [ ] Venue names and capacities (public listings conflict: 25/100/350 + lawn 800 vs 150 + 1000)
- [ ] Layout capacities (theatre, classroom, U-shape, banquet, cocktail)
- [ ] AV equipment, catering, decoration partners

## Policies — `src/app/terms/page.tsx`, FAQs in `src/content/experiences.ts`
- [ ] Check-in and check-out times (listings conflict)
- [ ] Deposit / advance-payment requirement and accepted methods
- [ ] Cancellation and amendment policy
- [ ] ID requirements, pet policy, couple-friendly policy, smoking policy
- [ ] Privacy policy reviewed by the resort's legal adviser

## Map — `mapZones` in `src/content/experiences.ts`
- [ ] Supply a site plan or aerial photo so the conceptual map can be replaced with an accurate one.

## Reviews
- [ ] The site links to Google reviews rather than quoting. If you want testimonials on the site,
      supply attributable quotes with the guest's written permission.
