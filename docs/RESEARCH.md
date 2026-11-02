# Research note — Mamalla Beach Resort redesign

_Prepared 2 November 2026, before implementation._

## 0. What could and could not be inspected

The build environment's network policy blocked direct access to every site named in the brief
(`www.mamallaresort.com`, `mamalla.com`, the Marriott / Radisson / IHG / Taj pages, Aman, Soneva,
Six Senses, Bürgenstock) and to every image host (Unsplash, Pexels, Wikimedia). Nothing in this
note claims a page was inspected when it was not.

What *was* available: web-search result summaries of the official site and of third-party
listings (Expedia / Hotels.com, Weddingwire, Wedding.net, Weddingz, meeting-venue directories,
Justdial). These were used **only** for facts, and each fact used on the site carries a
verification status in `src/content/` so the resort can confirm or correct it.

The international references were studied from prior knowledge of their public design patterns,
not from live inspection during this session.

## 1. Facts gathered (all require resort confirmation before launch)

| Fact | Value used | Source(s) | Confidence |
|---|---|---|---|
| Name | Mamalla Beach Resort | Official site title, all listings | High |
| Address | 108, Kovalam Road (East Coast Road), Mamallapuram, Tamil Nadu 603104 | Venue directories, Reservations.com | Medium — one listing says OMR |
| Phone | +91 44 2744 2475 | Venue directories, Justdial | Medium |
| Email | rajeev@mamallaresort.com | Official site (search summary) | Medium-high |
| Booking | Official site says "Please use this Booking Engine to book your rooms" | Official site (search summary) | Engine URL **not obtained** |
| Room types | Standard and Deluxe; AC and non-AC | Travel-guide article | Medium |
| Deluxe Room | Air-conditioned, 28 m², one double bed | Expedia / Hotels.com listing | Medium |
| Room count | 35 vs 50 (sources conflict) | — | **Not published** |
| Pools | Outdoor pool and a children's pool | Hotels.com listing | Medium |
| Restaurant | The Seagull — multi-cuisine, lunch and dinner, weekend buffet spreads | Listings | Medium |
| Events | Banquet hall(s), conference hall, lawn for weddings | Weddingwire, Wedding.net, Weddingz | Medium |
| Event capacities | 25/100/350 + lawn 800 vs 150 + 1000 vs 150 seated / 250 floating | (conflict) | **Not published** |
| Beach | Listings describe beach access / private beach; reviews say no beach-facing rooms | Listings, reviews | Medium |
| Check-in / out | Listings conflict | — | **Not published** |
| Star rating, review scores, awards | — | — | **Not published** (brief forbids unverified claims) |
| 360° tour | Mentioned in brief; provider and URL **not obtained** | — | Integration point built |

## 2. What the current site does well (as far as can be determined)

- Direct booking is promoted through the resort's own booking engine rather than OTAs only.
- A named contact for reservations (personal, hospitable tone).
- Has a 360° tour — a genuine differentiator among mid-size ECR resorts.
- Rooms, events and weddings are all represented: the property serves leisure, wedding and
  corporate audiences.

## 3. What needs improvement

- Factual information about the resort is inconsistent across the web (address, room count,
  capacities, check-in time). The new site should become the single source of truth.
- Weddings and corporate events — likely a major revenue line given lawn + halls — deserve
  dedicated landing pages with an enquiry form.
- The booking journey should collect dates and guests up-front and hand off cleanly.
- Mobile booking, typography, image hierarchy and SEO metadata need a modern baseline.

## 4. Design patterns worth adapting (not copying)

- **Aman / Six Senses:** extreme restraint; full-bleed photography; serif display type; navigation
  that recedes until needed; booking always one tap away.
- **Soneva:** storytelling over feature lists; each section has its own composition.
- **Bürgenstock:** an illustrated property map as a way-finding device.
- **Taj Fisherman's Cove / InterContinental Mahabalipuram:** local heritage (Mamallapuram stone,
  the Shore Temple) used as context, not decoration; clear wedding and MICE pathways.
- **Sheraton Grand / Radisson Temple Bay:** a practical booking bar under the hero; room pages that
  lead with size, bed and occupancy.

## 5. Information architecture

```
Home
├─ Stay           /rooms → /rooms/[slug]
├─ Explore        /explore (360° tour + illustrated map), /gallery
├─ Experiences    /experiences, /dining
├─ Celebrate      /weddings, /meetings
├─ Plan           /offers, /book (reservation request), /contact, /faq
└─ About          /about
Legal: /privacy, /terms
```

## 6. Visual direction — "Granite & Tide"

Mamallapuram is a town of hand-carved granite beside the Bay of Bengal. The palette and texture
come from that: warm ivory and sand, weathered stone, sea-glass green, deep ocean blue, a
restrained charcoal, and a single terracotta accent used sparingly. Cormorant Garamond (display)
is paired with Manrope (interface). Layouts are editorial and asymmetric with generous space;
borders are thin hairlines rather than cards; corners are square.

## 7. Technical approach

- **Stack:** Next.js 15 (App Router, mostly server components), React 19, TypeScript, Tailwind CSS 4,
  Framer Motion 12, Lucide icons. GSAP was evaluated and **not** added: every scroll effect needed
  (reveals, parallax, masks) is achievable with Framer Motion's `useScroll`, so a second animation
  library would duplicate capability. Three.js / R3F were **not** added: no genuine 3D asset of the
  property exists, and the brief forbids fabricating its architecture.
- **360° tour:** `NEXT_PUBLIC_VIRTUAL_TOUR_URL` feeds a click-to-load iframe with loading, error,
  timeout and full-screen states. Until set, a designed fallback with contact actions is shown.
- **Interactive map:** an original SVG illustration, **labelled as conceptual and not to scale**,
  with keyboard-accessible zones that open verified information.
- **Booking:** a validated booking bar. If `NEXT_PUBLIC_BOOKING_ENGINE_URL` is set the guest is
  handed off to it; query parameters are only appended when their names are configured (no
  invented parameters). Otherwise the guest lands on `/book`, a reservation **request** form that
  is explicit that nothing is confirmed until the resort replies.
- **Forms:** one server route (`/api/enquiry`) with server-side validation, honeypot and timing
  spam checks, delivering via Resend or a webhook. If neither is configured it returns an explicit
  error and the UI offers phone / email — submissions are never silently discarded.
- **Imagery:** no photographs could be downloaded. Every image slot uses a typed media registry;
  slots without a photo render original SVG artwork labelled "Illustration". Supplying a photo is
  a one-line change per slot (see `docs/ASSETS.md`).
