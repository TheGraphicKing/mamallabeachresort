/**
 * Booking request model, validation and hand-off URL building.
 * Framework-free so it can be unit-tested with `node --test`.
 */

export interface BookingQuery {
  /** ISO date yyyy-mm-dd */
  checkIn: string;
  /** ISO date yyyy-mm-dd */
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export const LIMITS = {
  adults: { min: 1, max: 30 },
  children: { min: 0, max: 20 },
  rooms: { min: 1, max: 15 },
  /** Furthest arrival date accepted, in days from today. */
  maxAdvanceDays: 540,
  maxNights: 30,
} as const;

export type BookingErrors = Partial<Record<keyof BookingQuery | "form", string>>;

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function parseISODate(value: string): Date | null {
  if (!ISO.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return date;
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Today's date in India (the resort's time zone) as yyyy-mm-dd. */
export function todayInIndia(now: Date = new Date()): string {
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return toISODate(ist);
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  if (!date) return iso;
  date.setUTCDate(date.getUTCDate() + days);
  return toISODate(date);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseISODate(checkIn);
  const b = parseISODate(checkOut);
  if (!a || !b) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export function validateBooking(q: BookingQuery, today: string = todayInIndia()): BookingErrors {
  const errors: BookingErrors = {};
  const inDate = parseISODate(q.checkIn);
  const outDate = parseISODate(q.checkOut);

  if (!inDate) errors.checkIn = "Choose a check-in date.";
  else if (q.checkIn < today) errors.checkIn = "Check-in can't be in the past.";
  else if (nightsBetween(today, q.checkIn) > LIMITS.maxAdvanceDays)
    errors.checkIn = "For stays this far ahead, please contact the resort directly.";

  if (!outDate) errors.checkOut = "Choose a check-out date.";
  else if (inDate && q.checkOut <= q.checkIn) errors.checkOut = "Check-out must be after check-in.";
  else if (inDate && nightsBetween(q.checkIn, q.checkOut) > LIMITS.maxNights)
    errors.checkOut = `For stays longer than ${LIMITS.maxNights} nights, please contact the resort.`;

  const intIn = (n: number, min: number, max: number) => Number.isInteger(n) && n >= min && n <= max;
  if (!intIn(q.adults, LIMITS.adults.min, LIMITS.adults.max))
    errors.adults = `Adults must be between ${LIMITS.adults.min} and ${LIMITS.adults.max}.`;
  if (!intIn(q.children, LIMITS.children.min, LIMITS.children.max))
    errors.children = `Children must be between ${LIMITS.children.min} and ${LIMITS.children.max}.`;
  if (!intIn(q.rooms, LIMITS.rooms.min, LIMITS.rooms.max))
    errors.rooms = `Rooms must be between ${LIMITS.rooms.min} and ${LIMITS.rooms.max}.`;
  else if (intIn(q.adults, 1, LIMITS.adults.max) && q.rooms > q.adults)
    errors.rooms = "Each room needs at least one adult.";

  return errors;
}

export function isValid(errors: BookingErrors): boolean {
  return Object.keys(errors).length === 0;
}

/** Read a booking query from URL search params, falling back to sensible defaults. */
export function queryFromParams(params: Record<string, string | string[] | undefined>): BookingQuery {
  const one = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const num = (k: string, fallback: number) => {
    const v = Number(one(k));
    return Number.isFinite(v) ? Math.trunc(v) : fallback;
  };
  const checkIn = parseISODate(one("checkin") ?? "") ? (one("checkin") as string) : "";
  const checkOut = parseISODate(one("checkout") ?? "") ? (one("checkout") as string) : "";
  return {
    checkIn,
    checkOut,
    adults: num("adults", 2),
    children: num("children", 0),
    rooms: num("rooms", 1),
  };
}

export function queryToSearch(q: BookingQuery): string {
  const p = new URLSearchParams({
    checkin: q.checkIn,
    checkout: q.checkOut,
    adults: String(q.adults),
    children: String(q.children),
    rooms: String(q.rooms),
  });
  return p.toString();
}

export interface BookingEngineConfig {
  url: string;
  params: Partial<Record<keyof BookingQuery, string>>;
  dateFormat: "yyyy-mm-dd" | "dd/mm/yyyy" | "dd-mm-yyyy";
}

export function formatForEngine(iso: string, fmt: BookingEngineConfig["dateFormat"]): string {
  const [y, m, d] = iso.split("-");
  if (fmt === "dd/mm/yyyy") return `${d}/${m}/${y}`;
  if (fmt === "dd-mm-yyyy") return `${d}-${m}-${y}`;
  return iso;
}

/**
 * Build the external booking-engine URL. Only parameters whose names have been
 * configured (from the provider's documentation) are appended — never guessed.
 * Returns null when no engine is configured or the URL is not https.
 */
export function buildEngineUrl(q: BookingQuery, config: BookingEngineConfig | null): string | null {
  if (!config || !config.url) return null;
  let url: URL;
  try {
    url = new URL(config.url);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const values: Record<keyof BookingQuery, string> = {
    checkIn: formatForEngine(q.checkIn, config.dateFormat),
    checkOut: formatForEngine(q.checkOut, config.dateFormat),
    adults: String(q.adults),
    children: String(q.children),
    rooms: String(q.rooms),
  };
  (Object.keys(values) as (keyof BookingQuery)[]).forEach((key) => {
    const name = config.params[key]?.trim();
    if (name) url.searchParams.set(name, values[key]);
  });
  return url.toString();
}
