import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  buildEngineUrl,
  nightsBetween,
  parseISODate,
  queryFromParams,
  validateBooking,
  isValid,
} from "../src/lib/booking.ts";

const today = "2026-11-02";
const base = { checkIn: "2026-11-10", checkOut: "2026-11-12", adults: 2, children: 0, rooms: 1 };

test("valid booking passes", () => {
  assert.ok(isValid(validateBooking(base, today)));
});

test("check-out must follow check-in", () => {
  assert.ok(validateBooking({ ...base, checkOut: "2026-11-10" }, today).checkOut);
  assert.ok(validateBooking({ ...base, checkOut: "2026-11-09" }, today).checkOut);
});

test("past check-in rejected", () => {
  assert.ok(validateBooking({ ...base, checkIn: "2026-11-01" }, today).checkIn);
});

test("guest and room limits", () => {
  assert.ok(validateBooking({ ...base, adults: 0 }, today).adults);
  assert.ok(validateBooking({ ...base, children: -1 }, today).children);
  assert.ok(validateBooking({ ...base, rooms: 3, adults: 2 }, today).rooms);
  assert.ok(validateBooking({ ...base, adults: 1.5 }, today).adults);
});

test("invalid dates detected", () => {
  assert.equal(parseISODate("2026-02-30"), null);
  assert.equal(parseISODate("hello"), null);
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(nightsBetween("2026-11-10", "2026-11-12"), 2);
});

test("query parsing tolerates junk", () => {
  const q = queryFromParams({ checkin: "bad", adults: "x", rooms: "2" });
  assert.equal(q.checkIn, "");
  assert.equal(q.adults, 2);
  assert.equal(q.rooms, 2);
});

test("engine URL only includes configured params", () => {
  assert.equal(buildEngineUrl(base, null), null);
  assert.equal(buildEngineUrl(base, { url: "http://insecure.example", params: {}, dateFormat: "yyyy-mm-dd" }), null);
  const bare = buildEngineUrl(base, { url: "https://book.example.com/p/1", params: {}, dateFormat: "yyyy-mm-dd" });
  assert.equal(bare, "https://book.example.com/p/1");
  const full = buildEngineUrl(base, {
    url: "https://book.example.com/p/1?hotel=9",
    params: { checkIn: "arr", checkOut: "dep", adults: "ad" },
    dateFormat: "dd/mm/yyyy",
  });
  const u = new URL(full!);
  assert.equal(u.searchParams.get("hotel"), "9");
  assert.equal(u.searchParams.get("arr"), "10/11/2026");
  assert.equal(u.searchParams.get("dep"), "12/11/2026");
  assert.equal(u.searchParams.get("ad"), "2");
  assert.equal(u.searchParams.has("children"), false);
});
