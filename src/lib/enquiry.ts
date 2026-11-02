/**
 * Enquiry model and validation, shared by the browser forms and the /api/enquiry route.
 * Framework-free so it can be unit-tested.
 */

export type EnquiryKind = "reservation" | "event" | "contact";

export const EVENT_TYPES = [
  "Wedding",
  "Reception",
  "Engagement / family celebration",
  "Banquet",
  "Meeting / conference",
  "Corporate retreat / offsite",
  "Group stay",
  "Other",
] as const;

export interface EnquiryPayload {
  kind: EnquiryKind;
  name: string;
  email: string;
  phone: string;
  message?: string;
  // event
  eventType?: string;
  preferredDate?: string;
  guestCount?: string;
  // reservation
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  rooms?: string;
  roomPreference?: string;
  consent?: boolean;
  /** Honeypot — must be empty. */
  website?: string;
  /** ms timestamp when the form was rendered — used for a minimum fill-time check. */
  startedAt?: number;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts Indian and international numbers: optional +, 8–15 digits, common separators. */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^\+?[\d\s\-().]{8,22}$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function isValidEmail(value: string): boolean {
  return EMAIL.test(value.trim()) && value.length <= 254;
}

export function validateEnquiry(p: EnquiryPayload): EnquiryErrors {
  const e: EnquiryErrors = {};
  const name = (p.name ?? "").trim();
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (name.length > 120) e.name = "Please shorten your name.";

  if (!p.email?.trim()) e.email = "Please enter your email address.";
  else if (!isValidEmail(p.email)) e.email = "Please enter a valid email address, like name@example.com.";

  if (!p.phone?.trim()) e.phone = "Please enter a phone number so we can reach you.";
  else if (!isValidPhone(p.phone)) e.phone = "Please enter a valid phone number, including the country code if outside India.";

  if ((p.message ?? "").length > 3000) e.message = "Please keep your message under 3,000 characters.";

  if (p.kind === "event") {
    if (!p.eventType) e.eventType = "Please choose the type of event.";
    if (p.guestCount && !/^\d{1,5}$/.test(p.guestCount.trim()))
      e.guestCount = "Please enter an approximate number, like 150.";
    if (p.preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(p.preferredDate))
      e.preferredDate = "Please choose a valid date.";
  }

  if (p.kind === "reservation") {
    if (!p.checkIn) e.checkIn = "Choose a check-in date.";
    if (!p.checkOut) e.checkOut = "Choose a check-out date.";
    if (p.checkIn && p.checkOut && p.checkOut <= p.checkIn) e.checkOut = "Check-out must be after check-in.";
  }

  if (p.kind === "contact" && !(p.message ?? "").trim()) e.message = "Please tell us how we can help.";

  if (!p.consent) e.consent = "Please confirm we may contact you about this enquiry.";
  return e;
}

/** Spam heuristics: honeypot filled, or submitted implausibly fast. */
export function looksLikeSpam(p: EnquiryPayload, now: number = Date.now()): boolean {
  if (p.website && p.website.trim() !== "") return true;
  if (typeof p.startedAt === "number" && now - p.startedAt < 2500) return true;
  return false;
}

export function enquirySubject(p: EnquiryPayload): string {
  if (p.kind === "reservation") return `Reservation request: ${p.checkIn} → ${p.checkOut} — ${p.name}`;
  if (p.kind === "event") return `Event enquiry (${p.eventType ?? "event"}) — ${p.name}`;
  return `Website enquiry — ${p.name}`;
}

export function enquiryText(p: EnquiryPayload): string {
  const rows: [string, string | undefined][] = [
    ["Type", p.kind],
    ["Name", p.name],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Event type", p.eventType],
    ["Preferred date", p.preferredDate],
    ["Approx. guests", p.guestCount],
    ["Check-in", p.checkIn],
    ["Check-out", p.checkOut],
    ["Adults", p.adults],
    ["Children", p.children],
    ["Rooms", p.rooms],
    ["Room preference", p.roomPreference],
    ["Message", p.message],
  ];
  return rows
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
