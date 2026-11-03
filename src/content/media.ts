import type { MediaAsset, PhotoSource } from "./types";

/**
 * Media manifest — every image slot on the site, in one place.
 *
 * PROTOTYPE IMAGERY: the photographs referenced below are SAMPLE images from Unsplash
 * (free for commercial use under the Unsplash License) and Wikimedia Commons (licence per file,
 * verify before production). They do NOT depict Mamalla Beach Resort and must be replaced with
 * approved resort photography before launch — see docs/ASSETS.md.
 *
 * To publish an approved photo: put it in /public/images/… and set `src`, `width`, `height`.
 * `src` always wins over `photos`. If all `photos` fail to load, the illustration for `scene` is shown.
 */

const u = (...ids: string[]): PhotoSource[] => ids.map((unsplash) => ({ unsplash }));
const commons = (...files: string[]): PhotoSource[] =>
  files.map((f) => ({ url: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}` }));

const UNSPLASH = "Unsplash (sample)";

export const media = {
  // ——— Coast ———
  heroShore: {
    id: "hero-shore",
    photos: u("1507525428034-b723cf961d3e", "1519046904884-53103b34b206"),
    credit: UNSPLASH,
    alt: "Waves running up a quiet beach in soft evening light",
    scene: "shore",
    caption: "Evening on the shore",
    category: "Pool & Beach",
  },
  beach: {
    id: "beach",
    photos: u("1471922694854-ff1b63b20054", "1510414842594-a61c69b5ae57"),
    credit: UNSPLASH,
    alt: "Shallow waves on an empty beach",
    scene: "shore",
    caption: "The water's edge",
    category: "Pool & Beach",
  },
  dusk: {
    id: "dusk",
    photos: u("1500375592092-40eb2168fd21", "1506929562872-bb421503ef21"),
    credit: UNSPLASH,
    alt: "A wave curling over in clear light",
    scene: "dusk",
    caption: "The Bay of Bengal",
    category: "Pool & Beach",
  },
  coastSunset: {
    id: "coast-sunset",
    photos: u("1473116763249-2faaef81ccda", "1505228395891-9a51e7e86bf6"),
    credit: UNSPLASH,
    alt: "The sea at sunset",
    scene: "dusk",
    caption: "Last light on the coast",
    category: "Pool & Beach",
  },
  romance: {
    id: "romance",
    photos: u("1506953823976-52e1fdc0149a", "1544551763-46a013bb70d5"),
    credit: UNSPLASH,
    alt: "A calm stretch of coastline in warm light",
    scene: "dusk",
    caption: "Slow evenings",
    category: "Pool & Beach",
  },
  family: {
    id: "family",
    photos: u("1476673160081-cf065607f449", "1502086223501-7ea6ecd79368"),
    credit: UNSPLASH,
    alt: "A family walking together along the shore",
    scene: "palms",
    caption: "Family time by the sea",
    category: "Pool & Beach",
  },

  // ——— Resort ———
  introPalms: {
    id: "resort-grounds",
    photos: u("1520250497591-112f2f40a3f4", "1551882547-ff40c63fe5fa"),
    credit: UNSPLASH,
    alt: "Resort grounds with palms, loungers and a pool",
    scene: "palms",
    caption: "Palms and open sky",
    category: "Resort",
  },
  introStone: {
    id: "resort-evening",
    photos: u("1566073771259-6a8506099945", "1445019980597-93fa8acb246c"),
    credit: UNSPLASH,
    alt: "A resort building and pool lit up at dusk",
    scene: "stone",
    caption: "Evenings at the resort",
    category: "Resort",
  },
  gardens: {
    id: "gardens",
    photos: u("1551882547-ff40c63fe5fa", "1445019980597-93fa8acb246c"),
    credit: UNSPLASH,
    alt: "Low resort buildings among tropical planting",
    scene: "palms",
    caption: "Garden paths",
    category: "Resort",
  },
  pool: {
    id: "pool",
    photos: u("1571003123894-1f0594d2b5d9", "1540541338287-41700207dee6"),
    credit: UNSPLASH,
    alt: "An outdoor swimming pool framed by palms",
    scene: "pool",
    caption: "The outdoor pool",
    category: "Pool & Beach",
  },
  poolLoungers: {
    id: "pool-loungers",
    photos: u("1540541338287-41700207dee6", "1584132967334-10e028bd69f7"),
    credit: UNSPLASH,
    alt: "Sun loungers beside a resort pool",
    scene: "pool",
    caption: "Afternoons by the water",
    category: "Pool & Beach",
  },

  // ——— Rooms ———
  roomDeluxe: {
    id: "room-deluxe",
    photos: u("1582719478250-c89cae4dc85b", "1618773928121-c32242e63f39"),
    credit: UNSPLASH,
    alt: "A calm hotel bedroom with crisp white linen",
    scene: "room",
    caption: "Deluxe Room (sample image)",
    category: "Rooms",
  },
  roomDeluxe2: {
    id: "room-deluxe-2",
    photos: u("1618773928121-c32242e63f39", "1631049307264-da0ec9d70304"),
    credit: UNSPLASH,
    alt: "A double bed with soft natural light",
    scene: "room",
    caption: "Rest and light (sample image)",
    category: "Rooms",
  },
  roomDeluxe3: {
    id: "room-deluxe-3",
    photos: u("1590490360182-c33d57733427", "1578683010236-d716f9a3f461"),
    credit: UNSPLASH,
    alt: "A hotel room seating corner",
    scene: "room",
    caption: "Room detail (sample image)",
    category: "Rooms",
  },
  roomStandard: {
    id: "room-standard",
    photos: u("1611892440504-42a792e24d32", "1631049307264-da0ec9d70304"),
    credit: UNSPLASH,
    alt: "A simple, comfortable hotel bedroom",
    scene: "room",
    caption: "Standard Room (sample image)",
    category: "Rooms",
  },
  roomStandard2: {
    id: "room-standard-2",
    photos: u("1631049307264-da0ec9d70304", "1578683010236-d716f9a3f461"),
    credit: UNSPLASH,
    alt: "Neatly made beds in a bright room",
    scene: "room",
    caption: "Simple comfort (sample image)",
    category: "Rooms",
  },

  // ——— Dining ———
  dining: {
    id: "dining",
    photos: u("1517248135467-4c7edcad34c4", "1555396273-367ea4eb4db5"),
    credit: UNSPLASH,
    alt: "A warmly lit restaurant dining room",
    scene: "dining",
    caption: "Dinner, unhurried",
    category: "Dining",
  },
  diningPlate: {
    id: "dining-plate",
    photos: u("1414235077428-338989a2e8c0", "1504674900247-0877df9cc836"),
    credit: UNSPLASH,
    alt: "Plated dishes on a restaurant table",
    scene: "dining",
    caption: "At the table",
    category: "Dining",
  },
  diningIndian: {
    id: "dining-indian",
    photos: u("1585937421612-70a008356fbe", "1589302168068-964664d93dc0"),
    credit: UNSPLASH,
    alt: "Bowls of Indian curry and rice",
    scene: "dining",
    caption: "Flavours of the south",
    category: "Dining",
  },

  // ——— Celebrations & meetings ———
  lawn: {
    id: "wedding",
    photos: u("1519741497674-611481863552", "1519225421980-715cb0215aed"),
    credit: UNSPLASH,
    alt: "A couple on their wedding day",
    scene: "lawn",
    caption: "Celebrations",
    category: "Celebrations",
  },
  reception: {
    id: "reception",
    photos: u("1464366400600-7168b8af9bc3", "1511795409834-ef04bbd61622"),
    credit: UNSPLASH,
    alt: "Reception tables dressed for an evening celebration",
    scene: "lawn",
    caption: "An evening reception",
    category: "Celebrations",
  },
  celebrationTable: {
    id: "celebration-table",
    photos: u("1511795409834-ef04bbd61622", "1505236858219-8359eb29e329"),
    credit: UNSPLASH,
    alt: "A long table set with flowers and candles",
    scene: "hall",
    caption: "A table for everyone",
    category: "Celebrations",
  },
  hall: {
    id: "meeting",
    photos: u("1431540015161-0bf868a2d407", "1497366216548-37526070297c"),
    credit: UNSPLASH,
    alt: "A meeting room set up for a team session",
    scene: "hall",
    caption: "Meetings",
    category: "Celebrations",
  },

  // ——— Mahabalipuram (public monuments) ———
  shoreTemple: {
    id: "shore-temple",
    photos: commons("Shore Temple Mamallapuram.jpg", "Mahabalipuram Shore Temple.jpg"),
    credit: "Wikimedia Commons (verify licence & attribution)",
    alt: "The Shore Temple at Mamallapuram, part of a UNESCO World Heritage Site",
    scene: "temple",
    caption: "The Shore Temple",
    category: "Mahabalipuram",
  },
  panchaRathas: {
    id: "pancha-rathas",
    photos: commons("Pancha Rathas.jpg", "Five Rathas Mahabalipuram.jpg"),
    credit: "Wikimedia Commons (verify licence & attribution)",
    alt: "The Pancha Rathas, monolithic shrines at Mamallapuram",
    scene: "temple",
    caption: "Pancha Rathas",
    category: "Mahabalipuram",
  },
  arjunasPenance: {
    id: "arjunas-penance",
    photos: commons("Arjuna's Penance.jpg", "Descent of the Ganges, Mahabalipuram.jpg"),
    credit: "Wikimedia Commons (verify licence & attribution)",
    alt: "Arjuna's Penance, the great rock relief at Mamallapuram",
    scene: "stone",
    caption: "Arjuna's Penance",
    category: "Mahabalipuram",
  },
  butterBall: {
    id: "butter-ball",
    photos: commons("Krishna's Butterball.jpg", "Krishna's Butter Ball.jpg"),
    credit: "Wikimedia Commons (verify licence & attribution)",
    alt: "Krishna's Butter Ball, a giant balanced boulder in Mamallapuram",
    scene: "stone",
    caption: "Krishna's Butter Ball",
    category: "Mahabalipuram",
  },
} satisfies Record<string, MediaAsset>;

/** Curated gallery order — every image appears once. */
export const galleryMedia: MediaAsset[] = [
  media.heroShore,
  media.pool,
  media.roomDeluxe,
  media.dining,
  media.introPalms,
  media.reception,
  media.shoreTemple,
  media.diningIndian,
  media.coastSunset,
  media.roomStandard,
  media.poolLoungers,
  media.lawn,
  media.introStone,
  media.diningPlate,
  media.panchaRathas,
  media.beach,
  media.celebrationTable,
  media.roomDeluxe2,
];

/**
 * Hero film — SAMPLE stock footage, tried in order; the hero photo shows until (and unless) one plays.
 * Pexels videos are free to use (Pexels License). These URLs could not be previewed from the build
 * environment — check them on the live site. To use the resort's own film, set NEXT_PUBLIC_HERO_VIDEO_URL
 * (e.g. "/video/hero.mp4" placed in /public/video/) — it is tried first.
 * Keep hero films short (10–20 s), muted, 1080p, H.264 MP4, ideally under 8 MB.
 */
export const heroVideo = {
  poster: media.heroShore,
  sources: [
    "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_24fps.mp4",
    "https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4",
  ],
  credit: "Pexels (sample)",
};
