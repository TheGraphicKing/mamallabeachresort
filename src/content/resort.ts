import { media } from "./media";
import type { Attraction, Fact, Verification } from "./types";

/**
 * Core business information.
 * Every value marked "listed" came from public listings or the official site's
 * search summary and must be confirmed by the resort before launch (docs/CONTENT-VERIFICATION.md).
 */
export const resort = {
  name: "Mamalla Beach Resort",
  shortName: "Mamalla",
  tagline: "A coastal retreat on the East Coast Road, Mahabalipuram",
  description:
    "Mamalla Beach Resort is a beachside resort on the East Coast Road in Mahabalipuram (Mamallapuram), Tamil Nadu — with an outdoor pool, The Seagull restaurant, a lawn and halls for weddings and corporate gatherings, and the town's UNESCO-listed monuments close by.",
  address: {
    street: "108, Kovalam Road (East Coast Road)",
    locality: "Mamallapuram (Mahabalipuram)",
    region: "Tamil Nadu",
    postalCode: "603104",
    country: "India",
    countryCode: "IN",
    status: "listed" as Verification,
  },
  phone: {
    display: "+91 44 2744 2475",
    href: "tel:+914427442475",
    status: "listed" as Verification,
  },
  email: {
    display: "rajeev@mamallaresort.com",
    href: "mailto:rajeev@mamallaresort.com",
    status: "listed" as Verification,
  },
  /** Not verified — left empty intentionally. Add the resort's WhatsApp Business number once confirmed. */
  whatsapp: null as null | { display: string; href: string },
  /** Not verified — add official profiles once confirmed. */
  social: [] as { label: string; href: string }[],
  officialSite: "https://www.mamallaresort.com/",
  maps: {
    /** The resort's Google Maps place page (supplied by the resort). Shows directions, photos and reviews. */
    href: "https://maps.google.com/?cid=12515821109078080145",
    /** Same place page — reviews are on it. */
    reviewsHref: "https://maps.google.com/?cid=12515821109078080145",
    /** Location of the resort's Google Maps 360° photo sphere (supplied by the resort). */
    lat: 12.6399572,
    lng: 80.202243,
    /** Turn-by-turn directions from the visitor's location (Google Maps URLs API). */
    directionsHref: "https://www.google.com/maps/dir/?api=1&destination=12.6399572%2C80.202243",
    /** Key-less map embed centred on the resort. */
    embedSrc: "https://maps.google.com/maps?q=12.6399572,80.202243&z=15&hl=en&output=embed",
  },
  /** 360° photo sphere of the resort on Google Maps (supplied by the resort). */
  virtualTour: {
    /** Original Google Maps link — opens the 360° view full-screen in Google Maps. */
    mapsUrl:
      "https://www.google.com/maps/@12.6399572,80.202243,0a,32.2y,122.27h,96.88t/data=!3m4!1e1!3m2!1sAF1QipN4ltoPey6x3I-wSgafeJsmqJ5J8Cewla4-y8Y9!2e10?source=apiv3",
    /**
     * Key-less embed of the same photo sphere (Google Maps "Embed a map" format). The pano id is the
     * photo's id (AF1QipN4lto…) wrapped as Google expects: base64 of [08 0A 12 2C] + id.
     */
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1730600000000!6m8!1m7!1sCAoSLEFGMVFpcE40bHRvUGV5NngzSS13U2dhZmVKc21xSjVKOENld2xhNC15OFk5!2m2!1d12.6399572!2d80.202243!3f122.27!4f6.88!5f0.7820865974627469",
  },
} as const;

export const fullAddress = `${resort.address.street}, ${resort.address.locality}, ${resort.address.region} ${resort.address.postalCode}, ${resort.address.country}`;

/** Facilities with their verification status. */
export const facilities: Fact[] = [
  { label: "Outdoor swimming pool", value: "On site", status: "listed" },
  { label: "Children's pool", value: "On site", status: "listed" },
  { label: "Beach", value: "Beach access from the resort", status: "listed" },
  { label: "Restaurant", value: "The Seagull — multi-cuisine", status: "listed" },
  { label: "Lawn", value: "Outdoor lawn for weddings and receptions", status: "listed" },
  { label: "Banquet & conference", value: "Indoor halls for celebrations and meetings", status: "listed" },
  { label: "Rooms", value: "Standard and Deluxe categories; AC and non-AC options", status: "listed" },
];

export const dining = {
  name: "The Seagull",
  summary: "The resort's in-house multi-cuisine restaurant, set close to the beach.",
  facts: [
    { label: "Cuisine", value: "Multi-cuisine", status: "listed" },
    { label: "Service", value: "Lunch and dinner", status: "listed" },
    { label: "Weekends", value: "Buffet spreads", status: "listed" },
    { label: "Breakfast", value: "Depends on your rate or meal plan — confirmed at booking", status: "unknown" },
    { label: "Opening hours", value: "Confirmed on enquiry", status: "unknown" },
    { label: "Meal plans", value: "Confirmed on enquiry", status: "unknown" },
  ] satisfies Fact[],
};

export const events = {
  spaces: [
    {
      name: "The Lawn",
      kind: "Outdoor",
      body: "An open lawn within the resort, used for weddings, receptions and evening celebrations under the sky.",
      media: media.lawn,
    },
    {
      name: "Banquet Hall",
      kind: "Indoor",
      body: "An indoor hall for ceremonies, receptions and family functions — and a sheltered alternative when the weather turns.",
      media: media.reception,
    },
    {
      name: "Conference Hall",
      kind: "Indoor",
      body: "A dedicated hall for meetings, training sessions and corporate gatherings, with rooms and dining on the same property.",
      media: media.hall,
    },
  ],
  capacityNote:
    "Published capacities for our venues vary between third-party listings, so we don't print them here. Share your guest count and we'll confirm the right space and layout.",
};

export const attractions: Attraction[] = [
  {
    name: "Shore Temple",
    media: media.shoreTemple,
    description:
      "The 8th-century granite temple on the seashore, part of the Group of Monuments at Mahabalipuram — a UNESCO World Heritage Site.",
  },
  {
    name: "Pancha Rathas",
    media: media.panchaRathas,
    description:
      "Five monolithic shrines, each carved from a single outcrop of rock, also within the UNESCO-listed group.",
  },
  {
    name: "Arjuna's Penance",
    media: media.arjunasPenance,
    description:
      "One of the largest open-air rock reliefs in the world, carved across two great boulders in the town centre.",
  },
  {
    name: "Krishna's Butter Ball",
    media: media.butterBall,
    description: "A giant granite boulder balanced on a gentle slope — a favourite with families and photographers.",
  },
  {
    name: "Tiger Cave, Saluvankuppam",
    description: "A rock-cut shrine framed by carved tiger heads, a short drive north along the coast.",
  },
  {
    name: "Stone-carving workshops",
    description:
      "Mamallapuram's sculptors still work granite by hand; workshops line the streets of the town.",
  },
];

export const nav = {
  /** Split around the centred wordmark on large screens. */
  primary: [
    { label: "Stay", href: "/rooms" },
    { label: "Experiences", href: "/experiences" },
    { label: "Dining", href: "/dining" },
  ],
  secondary: [
    { label: "Celebrations", href: "/weddings" },
    { label: "Mahabalipuram", href: "/mahabalipuram" },
    { label: "Contact", href: "/contact" },
  ],
  menu: [
    {
      title: "Stay",
      links: [
        { label: "Rooms & Accommodation", href: "/rooms" },
        { label: "Offers & Packages", href: "/offers" },
        { label: "Reservation request", href: "/book" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "About the Resort", href: "/about" },
        { label: "Experiences", href: "/experiences" },
        { label: "Dining", href: "/dining" },
        { label: "Discover Mahabalipuram", href: "/mahabalipuram" },
        { label: "Virtual Tour & Map", href: "/explore" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Celebrate",
      links: [
        { label: "Weddings & Celebrations", href: "/weddings" },
        { label: "Meetings & Corporate", href: "/meetings" },
      ],
    },
    {
      title: "Plan",
      links: [
        { label: "Contact & Location", href: "/contact" },
        { label: "FAQs", href: "/faq" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Booking Policies", href: "/terms" },
  ],
};
