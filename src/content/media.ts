import type { MediaAsset } from "./types";

/**
 * Media registry — every image slot on the site.
 *
 * No authentic photography could be obtained while building (see docs/ASSETS.md),
 * so every entry currently renders original illustrated artwork, labelled on-screen
 * as "Illustration". To publish a real photograph, place the file in /public/images/…
 * and add `src`, `width` and `height` to the entry. Nothing else needs to change.
 *
 * Do not add AI-generated or stock images that depict rooms, food, pools or buildings
 * as if they were Mamalla Beach Resort.
 */
export const media = {
  heroShore: {
    id: "hero-shore",
    alt: "Morning light over the Bay of Bengal at Mamallapuram",
    scene: "shore",
    caption: "Morning on the Coromandel Coast",
    category: "Pool & Beach",
  },
  introPalms: {
    id: "intro-palms",
    alt: "Coconut palms within the resort grounds",
    scene: "palms",
    caption: "Palms and open sky",
    category: "Resort",
  },
  introStone: {
    id: "intro-stone",
    alt: "Hand-carved granite, the signature craft of Mamallapuram",
    scene: "stone",
    caption: "Granite, the town's oldest craft",
    category: "Mahabalipuram",
  },
  pool: {
    id: "pool",
    alt: "The resort's outdoor swimming pool",
    scene: "pool",
    caption: "The outdoor pool",
    category: "Pool & Beach",
  },
  beach: {
    id: "beach",
    alt: "The beach beside the resort at first light",
    scene: "shore",
    caption: "The beach at first light",
    category: "Pool & Beach",
  },
  dusk: {
    id: "dusk",
    alt: "Evening sky over the coast at Mamallapuram",
    scene: "dusk",
    caption: "Evening on the coast",
    category: "Pool & Beach",
  },
  roomDeluxe: {
    id: "room-deluxe",
    alt: "Deluxe Room at Mamalla Beach Resort",
    scene: "room",
    caption: "Deluxe Room",
    category: "Rooms",
  },
  roomStandard: {
    id: "room-standard",
    alt: "Standard Room at Mamalla Beach Resort",
    scene: "room",
    caption: "Standard Room",
    category: "Rooms",
  },
  dining: {
    id: "dining",
    alt: "The Seagull, the resort's multi-cuisine restaurant",
    scene: "dining",
    caption: "The Seagull",
    category: "Dining",
  },
  lawn: {
    id: "lawn",
    alt: "The resort lawn prepared for an evening celebration",
    scene: "lawn",
    caption: "The lawn, set for a celebration",
    category: "Celebrations",
  },
  hall: {
    id: "hall",
    alt: "The resort's banquet and conference hall",
    scene: "hall",
    caption: "Banquet and conference hall",
    category: "Celebrations",
  },
  shoreTemple: {
    id: "shore-temple",
    alt: "The Shore Temple at Mamallapuram, part of a UNESCO World Heritage Site",
    scene: "temple",
    caption: "The Shore Temple, Mamallapuram",
    category: "Mahabalipuram",
  },
  gardens: {
    id: "gardens",
    alt: "Shaded garden paths between the resort buildings",
    scene: "palms",
    caption: "Garden paths",
    category: "Resort",
  },
} satisfies Record<string, MediaAsset>;

export const galleryMedia: MediaAsset[] = [
  media.heroShore,
  media.pool,
  media.roomDeluxe,
  media.dining,
  media.introPalms,
  media.lawn,
  media.shoreTemple,
  media.hall,
  media.dusk,
  media.introStone,
  media.roomStandard,
  media.gardens,
];
