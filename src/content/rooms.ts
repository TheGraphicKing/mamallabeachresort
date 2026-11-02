import { media } from "./media";
import type { RoomCategory } from "./types";

/**
 * Room categories.
 * Only two categories (Standard, Deluxe) are supported by public sources. Room sizes, bed
 * types and occupancy beyond what is listed below have NOT been verified and are rendered
 * as "confirmed on enquiry". Do not add categories, prices or room counts until the
 * resort supplies them.
 */
export const rooms: RoomCategory[] = [
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    summary: "An air-conditioned room with a double bed — a calm base between the pool, the beach and the temples.",
    description: [
      "The Deluxe Room is the resort's more generous category: air-conditioned, with a double bed and space to settle in after a day by the water.",
      "Some rooms look toward the pool. If a particular outlook matters to you, mention it in your reservation request and the team will advise what is available for your dates.",
    ],
    facts: [
      { label: "Size", value: "Approx. 28 m²", status: "listed" },
      { label: "Bed", value: "One double bed", status: "listed" },
      { label: "Climate", value: "Air-conditioned", status: "listed" },
      { label: "Occupancy", value: "Confirmed on enquiry", status: "unknown" },
      { label: "Outlook", value: "Varies by room — ask when booking", status: "unknown" },
    ],
    amenities: [
      { label: "Air conditioning", status: "listed" },
      { label: "Access to the outdoor pool", status: "listed" },
      { label: "Access to The Seagull restaurant", status: "listed" },
    ],
    pending: ["Maximum occupancy", "Extra bed policy", "In-room amenities list", "Bathroom details", "Room photography"],
    hero: media.roomDeluxe,
    gallery: [media.roomDeluxe, media.pool, media.introPalms],
  },
  {
    slug: "standard-room",
    name: "Standard Room",
    summary: "A simple, comfortable room for guests who plan to spend their days outdoors — available with or without air conditioning.",
    description: [
      "The Standard Room keeps things simple: a comfortable place to rest between mornings on the beach, afternoons at the pool and evenings exploring Mahabalipuram.",
      "Standard Rooms are offered in air-conditioned and non-air-conditioned options. Let us know your preference when you send your reservation request.",
    ],
    facts: [
      { label: "Climate", value: "AC and non-AC options", status: "listed" },
      { label: "Size", value: "Confirmed on enquiry", status: "unknown" },
      { label: "Bed", value: "Confirmed on enquiry", status: "unknown" },
      { label: "Occupancy", value: "Confirmed on enquiry", status: "unknown" },
    ],
    amenities: [
      { label: "Access to the outdoor pool", status: "listed" },
      { label: "Access to The Seagull restaurant", status: "listed" },
    ],
    pending: ["Room size", "Bed configuration", "Maximum occupancy", "In-room amenities list", "Room photography"],
    hero: media.roomStandard,
    gallery: [media.roomStandard, media.gardens, media.beach],
  },
];

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}
