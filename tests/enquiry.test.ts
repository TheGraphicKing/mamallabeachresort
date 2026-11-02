import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidPhone, looksLikeSpam, validateEnquiry } from "../src/lib/enquiry.ts";

const ok = { kind: "contact" as const, name: "Asha R", email: "asha@example.com", phone: "+91 98400 12345", message: "Hello", consent: true };

test("valid contact enquiry", () => {
  assert.deepEqual(validateEnquiry(ok), {});
});

test("required fields and formats", () => {
  const e = validateEnquiry({ ...ok, name: "", email: "nope", phone: "12", consent: false, message: "" });
  assert.ok(e.name && e.email && e.phone && e.consent && e.message);
});

test("event requires type and numeric guests", () => {
  const e = validateEnquiry({ ...ok, kind: "event", guestCount: "lots" });
  assert.ok(e.eventType && e.guestCount);
});

test("phone formats", () => {
  assert.ok(isValidPhone("044 2744 2475"));
  assert.ok(isValidPhone("+1 (415) 555-0100"));
  assert.ok(!isValidPhone("abc123"));
});

test("spam heuristics", () => {
  assert.ok(looksLikeSpam({ ...ok, website: "http://spam" }));
  assert.ok(looksLikeSpam({ ...ok, startedAt: 1000 }, 2000));
  assert.ok(!looksLikeSpam({ ...ok, startedAt: 1000 }, 10_000));
});
