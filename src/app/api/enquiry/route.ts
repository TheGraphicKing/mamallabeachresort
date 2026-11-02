import { NextResponse } from "next/server";
import { enquirySubject, enquiryText, looksLikeSpam, validateEnquiry, type EnquiryPayload } from "@/lib/enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 20_000;

/** Very small in-memory rate limit (per server instance). Use a shared store in multi-instance deployments. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string, now = Date.now()) {
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > 8;
}

function clean(p: Record<string, unknown>): EnquiryPayload {
  const s = (v: unknown, max = 500) => (typeof v === "string" ? v.slice(0, max).trim() : undefined);
  const kind = p.kind === "reservation" || p.kind === "event" || p.kind === "contact" ? p.kind : "contact";
  return {
    kind,
    name: s(p.name, 200) ?? "",
    email: s(p.email, 254) ?? "",
    phone: s(p.phone, 40) ?? "",
    message: s(p.message, 3000),
    eventType: s(p.eventType, 80),
    preferredDate: s(p.preferredDate, 10),
    guestCount: s(p.guestCount, 6),
    checkIn: s(p.checkIn, 10),
    checkOut: s(p.checkOut, 10),
    adults: s(p.adults, 3),
    children: s(p.children, 3),
    rooms: s(p.rooms, 3),
    roomPreference: s(p.roomPreference, 80),
    consent: p.consent === true,
    website: s(p.website, 200),
    startedAt: typeof p.startedAt === "number" ? p.startedAt : undefined,
  };
}

async function deliver(p: EnquiryPayload): Promise<"sent" | "not-configured" | "failed"> {
  const subject = enquirySubject(p);
  const text = enquiryText(p);
  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL, ENQUIRY_WEBHOOK_URL } = process.env;
  let attempted = false;
  let anySent = false;

  if (RESEND_API_KEY && ENQUIRY_FROM_EMAIL && ENQUIRY_TO_EMAIL) {
    attempted = true;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: ENQUIRY_FROM_EMAIL,
          to: ENQUIRY_TO_EMAIL.split(",").map((e) => e.trim()),
          reply_to: p.email,
          subject,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) anySent = true;
      else console.error("[enquiry] Resend responded", res.status);
    } catch (err) {
      console.error("[enquiry] Resend failed", err);
    }
  }

  if (ENQUIRY_WEBHOOK_URL) {
    attempted = true;
    try {
      const res = await fetch(ENQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, enquiry: { ...p, website: undefined, startedAt: undefined }, receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) anySent = true;
      else console.error("[enquiry] Webhook responded", res.status);
    } catch (err) {
      console.error("[enquiry] Webhook failed", err);
    }
  }

  if (!attempted) return "not-configured";
  return anySent ? "sent" : "failed";
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ ok: false, message: "Your message is too long." }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "We couldn't read your enquiry. Please try again." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many enquiries from your connection. Please call or email us instead." }, { status: 429 });
  }

  const payload = clean(body);

  // Pretend success to bots so they don't retry; nothing is delivered.
  if (looksLikeSpam(payload)) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(payload);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const result = await deliver(payload);
  if (result === "sent") return NextResponse.json({ ok: true });

  if (result === "not-configured") {
    console.error("[enquiry] No delivery channel configured (set RESEND_* or ENQUIRY_WEBHOOK_URL). Enquiry NOT delivered.");
    return NextResponse.json(
      { ok: false, message: "Online enquiries aren't connected yet, so we couldn't send this form." },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: false, message: "We couldn't send your enquiry just now." }, { status: 502 });
}
