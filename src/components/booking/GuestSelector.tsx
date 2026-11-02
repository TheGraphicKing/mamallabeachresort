"use client";

import { Minus, Plus } from "lucide-react";
import { useId } from "react";
import { LIMITS } from "@/lib/booking";

interface StepperProps {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  id: string;
}

function Stepper({ label, hint, value, min, max, onChange, id }: StepperProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-4" role="group" aria-labelledby={`${id}-label`}>
      <div>
        <p id={`${id}-label`} className="font-medium text-ink">
          {label}
        </p>
        {hint && <p className="text-sm text-ink/60">{hint}</p>}
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid h-11 w-11 place-items-center border border-ink/20 text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-ink/20"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <output className="w-10 text-center text-lg tabular-nums" aria-live="polite" aria-label={`${value} ${label.toLowerCase()}`}>
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid h-11 w-11 place-items-center border border-ink/20 text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-ink/20"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export interface Guests {
  adults: number;
  children: number;
  rooms: number;
}

export function GuestSelector({ value, onChange }: { value: Guests; onChange: (g: Guests) => void }) {
  const uid = useId();
  return (
    <div className="divide-y divide-ink/10">
      <Stepper
        id={`${uid}-adults`}
        label="Adults"
        value={value.adults}
        min={LIMITS.adults.min}
        max={LIMITS.adults.max}
        onChange={(adults) => onChange({ ...value, adults, rooms: Math.min(value.rooms, adults) })}
      />
      <Stepper
        id={`${uid}-children`}
        label="Children"
        hint="Child age policy confirmed on booking"
        value={value.children}
        min={LIMITS.children.min}
        max={LIMITS.children.max}
        onChange={(children) => onChange({ ...value, children })}
      />
      <Stepper
        id={`${uid}-rooms`}
        label="Rooms"
        value={value.rooms}
        min={LIMITS.rooms.min}
        max={Math.min(LIMITS.rooms.max, value.adults)}
        onChange={(rooms) => onChange({ ...value, rooms })}
      />
    </div>
  );
}

export function guestSummary(g: Guests) {
  const a = `${g.adults} adult${g.adults === 1 ? "" : "s"}`;
  const c = g.children ? ` · ${g.children} child${g.children === 1 ? "" : "ren"}` : "";
  const r = ` · ${g.rooms} room${g.rooms === 1 ? "" : "s"}`;
  return a + c + r;
}
