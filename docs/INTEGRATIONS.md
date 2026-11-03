# External integrations — status and what's needed

| Integration | Status | Works today | Needs from the resort |
|---|---|---|---|
| Booking engine | **Not connected** — URL unknown | Validated booking bar → on-site reservation request (`/book`) | Booking-engine URL + its deep-link parameter docs |
| Enquiry delivery | **Not connected** | Forms validate and show an honest error with phone/email if not configured | Resend API key + sender domain, or a webhook URL |
| 360° tour | **Connected** — the resort's Google Maps photo sphere | Click-to-load 360° view on the home page and /explore, "Open in Google Maps" link | — (override with `NEXT_PUBLIC_VIRTUAL_TOUR_URL`) |
| Payments | Not applicable on this site | No card data is ever collected | Continue using the booking engine's authorised gateway |
| Google Maps | **Connected** — the resort's place page (`?cid=12515821109078080145`) | Click-to-load live map, "Get directions" (to 12.63996, 80.20224) and "Open in Google Maps" on home, contact and footer | — |

## 1. Booking engine

The official site says *"Please use this Booking Engine to book your rooms"*, but the engine's URL
could not be retrieved (site blocked from the build environment). **No URLs or parameters were invented.**

To connect:

```bash
NEXT_PUBLIC_BOOKING_ENGINE_URL=https://<provider>/<property-path>
# Only if the provider documents them:
NEXT_PUBLIC_BOOKING_PARAM_CHECKIN=<name>
NEXT_PUBLIC_BOOKING_PARAM_CHECKOUT=<name>
NEXT_PUBLIC_BOOKING_PARAM_ADULTS=<name>
NEXT_PUBLIC_BOOKING_PARAM_CHILDREN=<name>
NEXT_PUBLIC_BOOKING_PARAM_ROOMS=<name>
NEXT_PUBLIC_BOOKING_DATE_FORMAT=yyyy-mm-dd | dd/mm/yyyy | dd-mm-yyyy
```

Behaviour (`src/lib/booking.ts → buildEngineUrl`):
- Only `https:` URLs are accepted.
- Existing query parameters on the URL (e.g. a hotel ID) are preserved.
- Each guest value is appended **only** if its parameter name is configured.
- When configured, the booking bar and `/book` hand the guest to the engine and say so clearly
  ("You'll continue to the resort's secure booking engine"). The site never claims a booking is confirmed.

Ask the provider (e.g. eZee, Staah, SiteMinder, Djubo, Asiatech, Cloudbeds — whichever the resort uses)
for: the property booking URL, documented deep-link parameters, date format, and whether they offer an
availability API (only needed if live rates should be shown on this site).

## 2. Enquiry delivery (`/api/enquiry`)

Configure at least one channel (both may be set; success if either delivers):

```bash
# Option A — Resend
RESEND_API_KEY=re_...
ENQUIRY_FROM_EMAIL="Mamalla Website <web@your-verified-domain>"
ENQUIRY_TO_EMAIL=reservations@...,events@...

# Option B — webhook (Zapier/Make/Formspree/CRM) receiving JSON
ENQUIRY_WEBHOOK_URL=https://...
```

Server behaviour:
- Re-validates every field; 422 with field errors on bad input.
- Spam: hidden honeypot + minimum fill time → silently accepted, not delivered.
- Per-IP rate limit (in-memory, per instance — use a shared store such as Upstash if running many instances).
- If no channel is configured → 503 and the UI shows phone/email alternatives. **Nothing is silently discarded.**
- Card details are never requested.

Webhook payload: `{ subject, text, enquiry: {...fields}, receivedAt }`.

## 3. 360° virtual tour

Set `NEXT_PUBLIC_VIRTUAL_TOUR_URL` to the tour's **embed** URL (e.g. a Matterport `my.matterport.com/show/?m=…`,
Kuula, Panoee, 3DVista or Google Street View embed link). The provider must allow iframe embedding
(no `X-Frame-Options: DENY`). The component (`src/components/explore/TourEmbed.tsx`):
- loads nothing until the guest presses **Start tour**;
- shows loading, a 20-second timeout/error state with retry, and "open in new tab";
- offers full-screen when the browser supports it.

Reuse the existing tour only if the resort owns or licenses it.

## 4. 3D model

Not built. No genuine 3D asset of the property exists, and the brief forbids inventing its architecture.
If a photogrammetry/architect model (glTF) becomes available, add React Three Fiber behind a
dynamic import on `/explore` only, keeping the current map as the fallback.
