"use client";

import { CheckCircle2, ExternalLink, Mail, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { buttonClass } from "@/components/ui/Button";
import { resort } from "@/content/resort";
import { buildEngineUrl, isValid, nightsBetween, queryFromParams, validateBooking } from "@/lib/booking";
import { bookingEngine } from "@/lib/config";

const longFmt = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function BookingRequest() {
  const params = useSearchParams();
  const query = useMemo(() => queryFromParams(Object.fromEntries(params.entries())), [params]);
  const room = params.get("room") ?? "";
  const valid = query.checkIn && query.checkOut && isValid(validateBooking(query));
  const nights = valid ? nightsBetween(query.checkIn, query.checkOut) : 0;
  const engineUrl = valid ? buildEngineUrl(query, bookingEngine) : null;

  const defaults = useMemo(
    () => ({
      checkIn: query.checkIn,
      checkOut: query.checkOut,
      adults: String(query.adults),
      children: String(query.children),
      rooms: String(query.rooms),
      roomPreference: room,
    }),
    [query, room],
  );

  return (
    <section className="section-y" id="request">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-10">
            {valid ? (
              <div className="border border-ink/12 bg-ivory-deep p-7">
                <p className="eyebrow flex items-center gap-2 text-success">
                  <CheckCircle2 aria-hidden className="h-4 w-4" /> Your dates
                </p>
                <dl className="mt-5 space-y-3">
                  <div className="flex justify-between gap-4"><dt className="text-ink/60">Arrival</dt><dd>{longFmt.format(new Date(query.checkIn))}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-ink/60">Departure</dt><dd>{longFmt.format(new Date(query.checkOut))}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-ink/60">Nights</dt><dd>{nights}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-ink/60">Guests</dt><dd>{query.adults} adult{query.adults === 1 ? "" : "s"}{query.children ? `, ${query.children} child${query.children === 1 ? "" : "ren"}` : ""}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-ink/60">Rooms</dt><dd>{query.rooms}</dd></div>
                </dl>
                {engineUrl && (
                  <a href={engineUrl} className={buttonClass("primary", "mt-7 w-full")}>
                    Continue to secure booking <ExternalLink aria-hidden className="h-4 w-4" />
                  </a>
                )}
              </div>
            ) : (
              <div>
                <h2 className="font-display text-3xl text-ocean-deep">Choose your dates</h2>
                <p className="mt-2 text-sm text-ink/65">Pick dates and guests to pre-fill your request.</p>
                <div className="mt-4">
                  <BookingForm layout="panel" initial={query} />
                </div>
              </div>
            )}
            <div className="space-y-3 text-sm text-ink/75">
              <p className="eyebrow text-stone-deep">How this works</p>
              <ol className="list-decimal space-y-2 pl-5 leading-relaxed">
                <li>Send your request — it takes a minute.</li>
                <li>Our team replies with availability, rates and meal-plan options.</li>
                <li>Your booking is confirmed only when the resort confirms it in writing.</li>
              </ol>
              <p className="pt-2">We never ask for card details on this website.</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="eyebrow text-stone-deep">Prefer to talk?</p>
              <a href={resort.phone.href} className="flex items-center gap-2 text-ocean link-underline w-fit"><Phone aria-hidden className="h-4 w-4" /> {resort.phone.display}</a>
              <a href={resort.email.href} className="flex items-center gap-2 text-ocean link-underline w-fit break-all"><Mail aria-hidden className="h-4 w-4" /> {resort.email.display}</a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="text-display-sm text-ocean-deep">Your details</h2>
          <p className="mt-3 mb-10 text-ink/70">This is a request, not a confirmed reservation. No payment is taken.</p>
          <EnquiryForm kind="reservation" defaults={defaults} submitLabel="Send reservation request" />
        </div>
      </div>
    </section>
  );
}
