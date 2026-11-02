/**
 * Content model. Presentation components consume these types only, so the resort
 * can update facts in `src/content/*` without touching layout code.
 */

/** How confident we are in a published fact. Shown in the UI where it matters. */
export type Verification =
  /** Confirmed by the resort (set this once the resort signs off). */
  | "confirmed"
  /** Taken from a public listing or the official site's search summary; needs sign-off. */
  | "listed"
  /** Not known — the UI shows "confirmed on enquiry" instead of a value. */
  | "unknown";

export type ArtworkScene =
  | "shore"
  | "temple"
  | "pool"
  | "palms"
  | "room"
  | "dining"
  | "lawn"
  | "hall"
  | "stone"
  | "dusk";

/**
 * A remote sample photograph (prototype imagery, NOT the resort).
 * `unsplash` takes the long photo id ("1507525428034-b723cf961d3e");
 * `url` takes any image URL that accepts a `width` query parameter (e.g. Wikimedia Special:FilePath).
 */
export type PhotoSource = { unsplash: string } | { url: string };

export interface MediaAsset {
  id: string;
  /** Authentic, approved photo: path under /public (e.g. "/images/rooms/deluxe-01.jpg"). Takes priority. */
  src?: string;
  width?: number;
  height?: number;
  /**
   * Sample photography used for the prototype, tried in order. If every source fails to load,
   * the illustration for `scene` is shown instead, so a broken URL never breaks the layout.
   */
  photos?: PhotoSource[];
  /** Where the sample photos come from, for the asset manifest (docs/ASSETS.md). */
  credit?: string;
  alt: string;
  /** Final fallback artwork, labelled "Illustration". */
  scene: ArtworkScene;
  /** Short caption shown in galleries. */
  caption?: string;
  /** Gallery grouping. */
  category: "Resort" | "Rooms" | "Pool & Beach" | "Dining" | "Celebrations" | "Mahabalipuram";
}

export interface Fact {
  label: string;
  value: string;
  status: Verification;
}

export interface RoomCategory {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  facts: Fact[];
  amenities: { label: string; status: Verification }[];
  /** Things the resort must supply before launch. Rendered as "confirmed on enquiry". */
  pending: string[];
  hero: MediaAsset;
  gallery: MediaAsset[];
}

export interface Experience {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  details?: string[];
  media: MediaAsset;
  cta: { label: string; href: string };
}

export interface MapZone {
  id: string;
  name: string;
  summary: string;
  facts: string[];
  href: string;
  linkLabel: string;
  media: MediaAsset;
  /** Hotspot coordinates on the 1000 × 640 illustration. */
  x: number;
  y: number;
}

export interface FaqItem {
  q: string;
  a: string;
  category: "Stay" | "Booking" | "Dining" | "Events" | "Getting here";
}

export interface Attraction {
  name: string;
  description: string;
  media?: MediaAsset;
}
