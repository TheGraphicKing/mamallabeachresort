"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ExternalLink, Loader2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  addDays,
  buildEngineUrl,
  isValid,
  LIMITS,
  nightsBetween,
  parseISODate,
  queryToSearch,
  todayInIndia,
  validateBooking,
  type BookingErrors,
  type BookingQuery,
} from "@/lib/booking";
import { bookingEngine } from "@/lib/config";
import { cn } from "@/lib/cn";
import { DateRangeCalendar } from "./DateRangeCalendar";
import { GuestSelector, guestSummary } from "./GuestSelector";

const shortFmt = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const fmt = (iso: string) => (iso && parseISODate(iso) ? shortFmt.format(parseISODate(iso)!) : "");

type Panel = null | "checkIn" | "checkOut" | "guests";

interface Props {
  /** "bar" — horizontal with dropdowns (desktop hero); "panel" — stacked with inline pickers (drawer, /book). */
  layout?: "bar" | "panel";
  initial?: Partial<BookingQuery>;
  /** Called after a successful hand-off so a parent drawer can close. */
  onDone?: () => void;
  tone?: "light" | "dark";
}

export function BookingForm({ layout = "bar", initial, onDone, tone = "light" }: Props) {
  const router = useRouter();
  const uid = useId();
  const [today, setToday] = useState("");
  const [q, setQ] = useState<BookingQuery>({
    checkIn: initial?.checkIn ?? "",
    checkOut: initial?.checkOut ?? "",
    adults: initial?.adults ?? 2,
    children: initial?.children ?? 0,
    rooms: initial?.rooms ?? 1,
  });
  const [panel, setPanel] = useState<Panel>(null);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const rootRef = useRef<HTMLFormElement>(null);

  // Compute "today" on the client to avoid stale static values.
  useEffect(() => setToday(todayInIndia()), []);

  // Close dropdowns on outside click / Escape (bar layout).
  useEffect(() => {
    if (!panel || layout !== "bar") return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        rootRef.current?.querySelector<HTMLButtonElement>(`[data-trigger="${panel}"]`)?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [panel, layout]);

  // Make sure an opened dropdown is fully visible (the bar sits near the bottom of the hero).
  useEffect(() => {
    if (!panel || layout !== "bar" || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const overflow = rect.bottom + (panel === "guests" ? 330 : 470) - window.innerHeight;
    if (overflow > 0) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollBy({ top: overflow + 24, behavior: smooth ? "smooth" : "auto" });
    }
  }, [panel, layout]);

  const min = today || "1970-01-01";
  const max = today ? addDays(today, LIMITS.maxAdvanceDays) : "2999-12-31";
  const nights = q.checkIn && q.checkOut ? nightsBetween(q.checkIn, q.checkOut) : 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateBooking(q, today || todayInIndia());
    setErrors(errs);
    if (!isValid(errs)) {
      const first = (["checkIn", "checkOut", "adults", "children", "rooms"] as const).find((k) => errs[k]);
      if (first === "checkIn" || first === "checkOut") setPanel(first);
      else if (first) setPanel("guests");
      return;
    }
    setSubmitting(true);
    const external = buildEngineUrl(q, bookingEngine);
    if (external) {
      window.location.assign(external);
    } else {
      router.push(`/book?${queryToSearch(q)}#request`);
      onDone?.();
      setSubmitting(false);
    }
  };

  const errorList = Object.values(errors).filter(Boolean);
  const dark = tone === "dark";

  const fieldBtn = (key: Exclude<Panel, null>, label: string, value: string, placeholder: string, Icon: typeof CalendarDays) => (
    <button
      type="button"
      data-trigger={key}
      aria-expanded={panel === key}
      aria-controls={`${uid}-${key === "checkOut" ? "checkIn" : key}-panel`}
      data-invalid={Boolean(key === "guests" ? errors.adults || errors.rooms || errors.children : errors[key]) || undefined}
      onClick={() => setPanel(panel === key ? null : key)}
      className={cn(
        "group flex w-full items-center gap-4 text-left transition-colors",
        layout === "bar" ? "h-full px-6 py-5 hover:bg-ivory-deep/70" : "border-b py-4",
        layout === "panel" && (dark ? "border-ivory/20" : "border-ink/15"),
        panel === key && layout === "bar" && "bg-ivory-deep",
        "data-[invalid]:shadow-[inset_0_-2px_0_0_var(--color-error)]",
      )}
    >
      <Icon aria-hidden className={cn("h-5 w-5 shrink-0", dark ? "text-sand" : "text-seaglass-deep")} strokeWidth={1.4} />
      <span className="min-w-0">
        <span className={cn("eyebrow block", dark ? "text-sand" : "text-stone-deep")}>{label}</span>
        <span className={cn("mt-1 block truncate font-display text-xl", value ? (dark ? "text-ivory" : "text-ocean-deep") : dark ? "text-ivory/75" : "text-ink/75")}>
          {value || placeholder}
        </span>
      </span>
    </button>
  );

  const calendar = (
    <DateRangeCalendar
      key={panel === "checkOut" ? "out" : "in"}
      checkIn={q.checkIn}
      checkOut={q.checkOut}
      min={min}
      max={max}
      months={layout === "bar" ? 2 : 1}
      focus={panel === "checkOut" ? "checkOut" : "checkIn"}
      onChange={(range, completed) => {
        setQ((prev) => ({ ...prev, ...range }));
        setErrors((prev) => ({ ...prev, checkIn: undefined, checkOut: undefined }));
        setPanel(completed ? (layout === "bar" ? "guests" : null) : "checkOut");
      }}
    />
  );

  const dateHelp = (
    <p className={cn("mt-4 text-sm", dark ? "text-ivory/70" : "text-ink/60")} aria-live="polite">
      {q.checkIn && q.checkOut
        ? `${fmt(q.checkIn)} – ${fmt(q.checkOut)} · ${nights} night${nights === 1 ? "" : "s"}. Select dates again to change them.`
        : panel === "checkOut" && q.checkIn
          ? `Arriving ${fmt(q.checkIn)} — now choose your departure.`
          : "Choose your arrival date."}
    </p>
  );

  const submitLabel = "Check availability";

  return (
    <form ref={rootRef} onSubmit={submit} noValidate aria-label="Book your stay" className="relative">
      {layout === "bar" ? (
        <div className={cn("grid bg-ivory text-ink shadow-[0_30px_80px_-40px_rgba(18,35,47,0.6)] md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.25fr_auto]")}>
          <div className="border-b border-ink/10 md:border-r lg:border-b-0">
            {fieldBtn("checkIn", "Arrival", fmt(q.checkIn), "Add date", CalendarDays)}
          </div>
          <div className="border-b border-ink/10 lg:border-r lg:border-b-0">
            {fieldBtn("checkOut", "Departure", fmt(q.checkOut), "Add date", CalendarDays)}
          </div>
          <div className="border-b border-ink/10 md:border-r md:border-b-0 lg:border-r-0">
            {fieldBtn("guests", "Guests & rooms", guestSummary(q), "", Users)}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="group flex min-h-16 items-center justify-center gap-3 bg-ocean px-8 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-ocean-deep disabled:opacity-70"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            {submitting ? "One moment" : submitLabel}
          </button>

          <AnimatePresence>
            {panel && (
              <motion.div
                id={`${uid}-${panel === "guests" ? "guests" : "checkIn"}-panel`}
                role="dialog"
                aria-label={panel === "guests" ? "Choose guests and rooms" : "Choose your dates"}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "absolute top-full z-30 mt-2 bg-ivory p-6 shadow-[0_40px_80px_-30px_rgba(18,35,47,0.45)]",
                  panel === "guests" ? "right-0 w-full md:w-[24rem]" : "left-0 w-full md:w-[44rem]",
                )}
              >
                {panel === "guests" ? (
                  <>
                    <GuestSelector value={q} onChange={(g) => setQ((p) => ({ ...p, ...g }))} />
                    <div className="mt-4 flex justify-end">
                      <button type="button" className="eyebrow text-ocean link-underline pb-1" onClick={() => setPanel(null)}>
                        Done
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {calendar}
                    {dateHelp}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className={cn(dark ? "text-ivory" : "text-ink")}>
          {fieldBtn("checkIn", "Arrival", fmt(q.checkIn), "Add date", CalendarDays)}
          {fieldBtn("checkOut", "Departure", fmt(q.checkOut), "Add date", CalendarDays)}
          <AnimatePresence initial={false}>
            {(panel === "checkIn" || panel === "checkOut") && (
              <motion.div
                id={`${uid}-checkIn-panel`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className={cn("py-5", dark && "bg-ivory px-4 text-ink")}>
                  {calendar}
                  {dateHelp}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {fieldBtn("guests", "Guests & rooms", guestSummary(q), "", Users)}
          <AnimatePresence initial={false}>
            {panel === "guests" && (
              <motion.div
                id={`${uid}-guests-panel`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className={cn(dark && "mt-3 bg-ivory px-4 text-ink")}>
                  <GuestSelector value={q} onChange={(g) => setQ((p) => ({ ...p, ...g }))} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "mt-6 flex min-h-14 w-full items-center justify-center gap-3 px-8 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors disabled:opacity-70",
              dark ? "bg-ivory text-ocean-deep hover:bg-sand" : "bg-ocean text-ivory hover:bg-ocean-deep",
            )}
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {submitting ? "One moment" : submitLabel}
          </button>
        </div>
      )}

      <div aria-live="assertive" className="empty:hidden">
        {errorList.length > 0 && (
          <ul className={cn("mt-3 space-y-1 text-sm", layout === "bar" ? "bg-ivory px-6 py-3 text-error" : dark ? "text-[#ffb4a6]" : "text-error")}>
            {errorList.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
      </div>

      <p className={cn("mt-3 flex items-center gap-2 text-xs", dark ? "text-ivory/75" : "text-ink/70")}>
        {bookingEngine ? (
          <>
            <ExternalLink aria-hidden className="h-3.5 w-3.5" /> You&apos;ll continue to the resort&apos;s secure booking engine to see rates and confirm.
          </>
        ) : (
          <>Send a reservation request — the resort replies with availability and rates. Nothing is charged here.</>
        )}
      </p>
    </form>
  );
}
