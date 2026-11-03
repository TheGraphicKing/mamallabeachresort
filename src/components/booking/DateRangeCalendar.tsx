"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { addDays, parseISODate, toISODate } from "@/lib/booking";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const monthFmt = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
const dayLabelFmt = new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function monthStart(iso: string) {
  return iso.slice(0, 8) + "01";
}
function shiftMonth(iso: string, n: number) {
  const d = parseISODate(monthStart(iso))!;
  d.setUTCMonth(d.getUTCMonth() + n);
  return toISODate(d);
}
function monthGrid(firstISO: string): (string | null)[] {
  const first = parseISODate(firstISO)!;
  const lead = (first.getUTCDay() + 6) % 7; // Monday-first
  const days = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  const cells: (string | null)[] = Array(lead).fill(null);
  for (let i = 0; i < days; i++) cells.push(addDays(firstISO, i));
  while (cells.length % 7) cells.push(null);
  return cells;
}

interface Props {
  checkIn: string;
  checkOut: string;
  min: string;
  max: string;
  /** Which end of the range the next click sets. */
  focus: "checkIn" | "checkOut";
  onChange: (range: { checkIn: string; checkOut: string }, completed: boolean) => void;
  months?: 1 | 2;
}

/**
 * Accessible range calendar.
 * Keyboard: arrows move by day/week, PageUp/PageDown by month, Home/End to week bounds, Enter/Space selects.
 */
export function DateRangeCalendar({ checkIn, checkOut, min, max, focus, onChange, months = 2 }: Props) {
  const [view, setView] = useState(() => monthStart(checkIn || min));
  const [active, setActive] = useState(() => (focus === "checkOut" ? checkOut || checkIn : checkIn) || min);
  const [hover, setHover] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${active}"]`)?.focus();
  }, [active, view]);

  const viewMonths = useMemo(() => Array.from({ length: months }, (_, i) => shiftMonth(view, i)), [view, months]);
  const canPrev = view > monthStart(min);
  const canNext = shiftMonth(view, months - 1) < monthStart(max);

  const select = (iso: string) => {
    if (iso < min || iso > max) return;
    if (focus === "checkIn" || !checkIn || iso <= checkIn) {
      // Start a new range; keep an existing check-out if still valid.
      const keepOut = checkOut && checkOut > iso && focus === "checkIn" ? checkOut : "";
      onChange({ checkIn: iso, checkOut: keepOut }, false);
    } else {
      onChange({ checkIn, checkOut: iso }, true);
    }
  };

  const move = (iso: string) => {
    const clamped = iso < min ? min : iso > max ? max : iso;
    shouldFocus.current = true;
    setActive(clamped);
    const first = viewMonths[0];
    const last = viewMonths[viewMonths.length - 1];
    if (clamped < first) setView(monthStart(clamped));
    else if (monthStart(clamped) > last) setView(shiftMonth(monthStart(clamped), -(months - 1)));
  };

  const onKey = (e: React.KeyboardEvent, iso: string) => {
    const map: Record<string, () => string> = {
      ArrowLeft: () => addDays(iso, -1),
      ArrowRight: () => addDays(iso, 1),
      ArrowUp: () => addDays(iso, -7),
      ArrowDown: () => addDays(iso, 7),
      PageUp: () => shiftMonth(iso, -1).slice(0, 8) + iso.slice(8),
      PageDown: () => shiftMonth(iso, 1).slice(0, 8) + iso.slice(8),
      Home: () => addDays(iso, -((parseISODate(iso)!.getUTCDay() + 6) % 7)),
      End: () => addDays(iso, 6 - ((parseISODate(iso)!.getUTCDay() + 6) % 7)),
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      let next = fn();
      if (!parseISODate(next)) next = addDays(monthStart(next), 27);
      move(next);
    }
  };

  const tabbable = (() => {
    if (viewMonths.includes(monthStart(active))) return active;
    const first = viewMonths[0];
    return first < min ? min : first;
  })();

  const rangeEnd = checkOut || (focus === "checkOut" && hover && checkIn && hover > checkIn ? hover : "");

  return (
    <div ref={gridRef} className="select-none">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(shiftMonth(view, -1))}
          disabled={!canPrev}
          className="grid h-10 w-10 place-items-center text-ink transition-colors hover:bg-sand disabled:opacity-25"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <p className="sr-only" aria-live="polite">
          {viewMonths.map((m) => monthFmt.format(parseISODate(m)!)).join(" and ")}
        </p>
        <button
          type="button"
          onClick={() => setView(shiftMonth(view, 1))}
          disabled={!canNext}
          className="grid h-10 w-10 place-items-center text-ink transition-colors hover:bg-sand disabled:opacity-25"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
      <div className={cn("grid gap-8", months === 2 && "md:grid-cols-2")}>
        {viewMonths.map((m, mi) => (
          <div key={m} className={cn(mi === 1 && "hidden md:block")}>
            <p className="mb-3 text-center font-display text-xl text-ocean-deep">{monthFmt.format(parseISODate(m)!)}</p>
            <table role="grid" className="w-full border-collapse" aria-label={monthFmt.format(parseISODate(m)!)}>
              <thead>
                <tr>
                  {WEEKDAYS.map((d) => (
                    <th key={d} scope="col" className="pb-2 text-[0.65rem] font-medium uppercase tracking-widest text-stone-deep">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody onMouseLeave={() => setHover(null)}>
                {Array.from({ length: monthGrid(m).length / 7 }).map((_, row) => (
                  <tr key={row}>
                    {monthGrid(m)
                      .slice(row * 7, row * 7 + 7)
                      .map((iso, i) => {
                        if (!iso) return <td key={i} />;
                        const disabled = iso < min || iso > max;
                        const isStart = iso === checkIn;
                        const isEnd = iso === checkOut;
                        const inRange = checkIn && rangeEnd && iso > checkIn && iso < rangeEnd;
                        return (
                          <td key={i} className="p-0 text-center">
                            <button
                              type="button"
                              data-date={iso}
                              tabIndex={iso === tabbable ? 0 : -1}
                              disabled={disabled}
                              aria-pressed={isStart || isEnd}
                              aria-label={`${dayLabelFmt.format(parseISODate(iso)!)}${isStart ? ", check-in" : ""}${isEnd ? ", check-out" : ""}`}
                              onClick={() => {
                                setActive(iso);
                                select(iso);
                              }}
                              onMouseEnter={() => setHover(iso)}
                              onKeyDown={(e) => onKey(e, iso)}
                              className={cn(
                                "relative h-11 w-full text-sm tabular-nums transition-colors duration-150",
                                disabled && "cursor-not-allowed text-ink/25 line-through decoration-ink/20",
                                !disabled && !isStart && !isEnd && "hover:bg-sand",
                                inRange && "bg-seaglass/35",
                                (isStart || isEnd) && "bg-ocean text-ivory",
                              )}
                            >
                              {Number(iso.slice(8))}
                            </button>
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
