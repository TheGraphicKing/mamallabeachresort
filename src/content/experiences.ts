import { media } from "./media";
import type { Experience, FaqItem, MapZone } from "./types";

/**
 * Experiences describe what guests can do at and around the resort.
 * They describe facilities and the destination — not organised activities, which
 * have not been verified. Add guided activities only once the resort confirms them.
 */
export const experiences: Experience[] = [
  {
    slug: "beach",
    eyebrow: "The shore",
    title: "Mornings that begin at the water's edge",
    body: "Step out early, when the light over the Bay of Bengal is soft and the fishing boats are heading out. The beach is yours for an unhurried walk before breakfast or a quiet hour at sunset.",
    details: ["Beach access from the resort", "Swimming conditions vary with the sea — please follow local guidance"],
    media: media.beach,
    cta: { label: "Explore the resort", href: "/explore" },
  },
  {
    slug: "pool",
    eyebrow: "The pool",
    title: "Long afternoons in the shade and the water",
    body: "The outdoor pool is the heart of resort days — a place for lengths in the morning and lazy hours in the afternoon. A separate children's pool lets younger guests splash safely.",
    details: ["Outdoor swimming pool", "Children's pool", "Pool timings shared at check-in"],
    media: media.pool,
    cta: { label: "View rooms", href: "/rooms" },
  },
  {
    slug: "dining",
    eyebrow: "The Seagull",
    title: "A table close to the sea",
    body: "Our multi-cuisine restaurant serves lunch and dinner, with buffet spreads at weekends. It's an easy, relaxed place to gather after a day on the coast.",
    media: media.dining,
    cta: { label: "Discover dining", href: "/dining" },
  },
  {
    slug: "family",
    eyebrow: "Family holidays",
    title: "Room to run, space to rest",
    body: "Families come for the simple pleasures: a children's pool, open lawns, sandcastles and a short drive to the giant boulders and carved temples that children remember for years.",
    media: media.introPalms,
    cta: { label: "Plan a family stay", href: "/book" },
  },
  {
    slug: "romance",
    eyebrow: "Just the two of you",
    title: "An escape down the coast from Chennai",
    body: "Leave Chennai behind on the East Coast Road. Mornings on the sand, evenings at the Shore Temple as it turns gold, and nowhere you need to be.",
    media: media.dusk,
    cta: { label: "Request a stay", href: "/book" },
  },
  {
    slug: "weddings",
    eyebrow: "Celebrations",
    title: "Weddings on the lawn, by the sea",
    body: "From intimate ceremonies to full receptions, the resort lawn and banquet hall give you an open-air setting with a sheltered alternative close at hand.",
    media: media.lawn,
    cta: { label: "Weddings & celebrations", href: "/weddings" },
  },
  {
    slug: "corporate",
    eyebrow: "Teams & retreats",
    title: "Meet somewhere that clears the mind",
    body: "A conference hall, rooms, dining and a lawn for evening gatherings — all on one property, away from the city's distractions.",
    media: media.hall,
    cta: { label: "Meetings & corporate", href: "/meetings" },
  },
  {
    slug: "mahabalipuram",
    eyebrow: "Mahabalipuram",
    title: "Thirteen centuries of carved granite",
    body: "The Group of Monuments at Mahabalipuram is a UNESCO World Heritage Site: the Shore Temple, the Pancha Rathas, Arjuna's Penance and more, all within easy reach of the resort.",
    media: media.shoreTemple,
    cta: { label: "Nearby attractions", href: "/experiences#mahabalipuram" },
  },
];

export const mapZones: MapZone[] = [
  {
    id: "beach",
    name: "The Beach",
    summary: "The resort sits beside the Bay of Bengal, with beach access for morning walks and sunset.",
    facts: ["Beach access from the resort", "Sea conditions vary — follow local guidance before swimming"],
    href: "/experiences#beach",
    linkLabel: "Beach & outdoors",
    media: media.beach,
    x: 860,
    y: 320,
  },
  {
    id: "pool",
    name: "Swimming Pools",
    summary: "An outdoor pool for adults and a separate children's pool.",
    facts: ["Outdoor swimming pool", "Children's pool"],
    href: "/experiences#pool",
    linkLabel: "Pool experiences",
    media: media.pool,
    x: 560,
    y: 300,
  },
  {
    id: "rooms",
    name: "Accommodation",
    summary: "Standard and Deluxe rooms, with air-conditioned and non-AC options.",
    facts: ["Standard Rooms", "Deluxe Rooms"],
    href: "/rooms",
    linkLabel: "View rooms",
    media: media.roomDeluxe,
    x: 330,
    y: 200,
  },
  {
    id: "restaurant",
    name: "The Seagull",
    summary: "The resort's multi-cuisine restaurant, serving lunch and dinner, with weekend buffets.",
    facts: ["Multi-cuisine", "Lunch and dinner", "Weekend buffet spreads"],
    href: "/dining",
    linkLabel: "Dining",
    media: media.dining,
    x: 640,
    y: 480,
  },
  {
    id: "lawn",
    name: "The Lawn",
    summary: "An open-air lawn for weddings, receptions and evening gatherings.",
    facts: ["Weddings and receptions", "Corporate evenings"],
    href: "/weddings",
    linkLabel: "Weddings & celebrations",
    media: media.lawn,
    x: 360,
    y: 460,
  },
  {
    id: "halls",
    name: "Banquet & Conference",
    summary: "Indoor halls for ceremonies, receptions, meetings and training.",
    facts: ["Banquet hall", "Conference hall"],
    href: "/meetings",
    linkLabel: "Meetings & corporate",
    media: media.hall,
    x: 150,
    y: 340,
  },
];

export const faqs: FaqItem[] = [
  {
    category: "Booking",
    q: "How do I book a room?",
    a: "Choose your dates and guests in the booking bar and select “Check availability”. If the resort's online booking engine is connected you'll continue there; otherwise you'll send a reservation request and our team will reply with availability and rates. You can also call or email us directly.",
  },
  {
    category: "Booking",
    q: "Is my room confirmed when I send a reservation request?",
    a: "No. A reservation request tells us what you'd like. Your booking is confirmed only when the resort sends you a written confirmation (and, where required, receives any advance payment through its authorised payment channel).",
  },
  {
    category: "Booking",
    q: "Do you take card details on this website?",
    a: "No. This website never asks for or stores card details. Payments are handled only through the resort's authorised booking or payment provider.",
  },
  {
    category: "Booking",
    q: "What is your cancellation policy?",
    a: "Cancellation terms depend on the rate, season and booking channel. They are stated in your booking confirmation. Please ask our team before booking if you need flexibility.",
  },
  {
    category: "Stay",
    q: "What are the check-in and check-out times?",
    a: "Check-in and check-out times are shared with your booking confirmation. If you're arriving early or leaving late, let us know and we'll do our best to help.",
  },
  {
    category: "Stay",
    q: "What kinds of rooms do you have?",
    a: "The resort offers Standard and Deluxe rooms, with air-conditioned and non-air-conditioned options. See Rooms & Accommodation for details.",
  },
  {
    category: "Stay",
    q: "Is there a pool for children?",
    a: "Yes — in addition to the outdoor swimming pool, the resort has a separate children's pool.",
  },
  {
    category: "Stay",
    q: "Do any rooms face the beach?",
    a: "Outlooks vary by room. Please mention any preference in your reservation request and we'll tell you what is possible for your dates.",
  },
  {
    category: "Dining",
    q: "Is breakfast included?",
    a: "That depends on the rate or meal plan you book. Your quote and confirmation will state exactly what's included.",
  },
  {
    category: "Dining",
    q: "Where can we eat at the resort?",
    a: "The Seagull is our in-house multi-cuisine restaurant, serving lunch and dinner, with buffet spreads at weekends.",
  },
  {
    category: "Events",
    q: "Can we host a wedding at the resort?",
    a: "Yes. The resort hosts weddings and receptions on its lawn and in its banquet hall. Send an enquiry with your date and approximate guest count and our events team will respond.",
  },
  {
    category: "Events",
    q: "How many guests can your venues hold?",
    a: "It depends on the space and the layout (seated, standing, theatre). Tell us your guest count and we'll recommend the right venue and confirm capacity.",
  },
  {
    category: "Getting here",
    q: "Where is the resort?",
    a: "On the East Coast Road (ECR) at Mamallapuram (Mahabalipuram), Tamil Nadu 603104. Most guests drive down the ECR from Chennai.",
  },
  {
    category: "Getting here",
    q: "What is there to see nearby?",
    a: "The Group of Monuments at Mahabalipuram — a UNESCO World Heritage Site that includes the Shore Temple, the Pancha Rathas and Arjuna's Penance — is close to the resort.",
  },
];
