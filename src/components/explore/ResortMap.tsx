"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { mapZones } from "@/content/experiences";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";

const MW = 1000;
const MH = 640;

/** Conceptual plan artwork — deliberately schematic. NOT the resort's actual layout. */
function PlanArtwork({ dark }: { dark: boolean }) {
  const ground = dark ? "#1b3140" : "#ece2cf";
  const line = dark ? "#e5d7bf" : "#5f564a";
  return (
    <svg viewBox={`0 0 ${MW} ${MH}`} className="h-full w-full" aria-hidden focusable="false">
      <defs>
        <linearGradient id="map-sea" x1="0" x2="1">
          <stop offset="0" stopColor={dark ? "#3c6670" : "#9fc0b8"} />
          <stop offset="1" stopColor={dark ? "#1f3a4b" : "#5e8a8e"} />
        </linearGradient>
        <pattern id="map-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={line} strokeOpacity="0.18" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width={MW} height={MH} fill={ground} />
      {/* Sea and sand along the eastern edge */}
      <path d="M800,0 C770,140 830,260 790,380 C760,480 820,560 800,640 L1000,640 L1000,0 Z" fill={dark ? "#c9b48f" : "#e3cfa8"} opacity={dark ? 0.35 : 1} />
      <path d="M880,0 C850,150 905,270 870,380 C840,480 900,560 880,640 L1000,640 L1000,0 Z" fill="url(#map-sea)" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${895 + i * 30},10 C${865 + i * 30},150 ${920 + i * 30},270 ${885 + i * 30},380 C${855 + i * 30},480 ${915 + i * 30},560 ${895 + i * 30},630`} stroke="#ffffff" strokeOpacity="0.25" fill="none" />
      ))}
      {/* Road on the western edge */}
      <rect x="0" y="0" width="46" height={MH} fill={dark ? "#12232f" : "#d6c7aa"} />
      <line x1="23" y1="0" x2="23" y2={MH} stroke={line} strokeOpacity="0.4" strokeDasharray="14 12" />
      {/* Paths */}
      <path d="M46,320 C200,320 260,260 420,270 C560,280 640,320 790,320" stroke={line} strokeOpacity="0.35" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M420,270 C420,380 500,430 640,470" stroke={line} strokeOpacity="0.3" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Halls */}
      <rect x="90" y="270" width="120" height="140" fill="url(#map-hatch)" stroke={line} strokeOpacity="0.6" />
      {/* Rooms blocks */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={250 + i * 46} y={140 + (i % 2) * 18} width="36" height="90" fill="url(#map-hatch)" stroke={line} strokeOpacity="0.6" />
      ))}
      {/* Pools */}
      <rect x="505" y="255" width="120" height="70" rx="4" fill={dark ? "#5e8a8e" : "#8fb9b3"} stroke={line} strokeOpacity="0.5" />
      <circle cx="660" cy="250" r="20" fill={dark ? "#5e8a8e" : "#8fb9b3"} stroke={line} strokeOpacity="0.5" />
      {/* Lawn */}
      <rect x="270" y="400" width="190" height="130" rx="2" fill={dark ? "#2f4a42" : "#b7c6a4"} opacity="0.9" />
      {/* Restaurant */}
      <rect x="590" y="440" width="110" height="70" fill="url(#map-hatch)" stroke={line} strokeOpacity="0.6" />
      {/* Trees */}
      {Array.from({ length: 34 }).map((_, i) => {
        const x = 70 + ((i * 137) % 700);
        const y = 40 + ((i * 89) % 560);
        return <circle key={i} cx={x} cy={y} r={7 + (i % 3) * 2} fill={dark ? "#4f7468" : "#7f9d88"} opacity="0.55" />;
      })}
      {/* Compass */}
      <g transform="translate(90 70)" stroke={line} strokeOpacity="0.7" fill="none">
        <circle r="18" />
        <path d="M0,-14 L5,4 L0,0 L-5,4 Z" fill={line} fillOpacity="0.7" />
      </g>
      <text x="90" y="110" textAnchor="middle" fontSize="11" fill={line} fillOpacity="0.8" letterSpacing="3">N</text>
      <text x="940" y="320" textAnchor="middle" fontSize="12" fill="#ffffff" fillOpacity="0.8" letterSpacing="4" transform="rotate(90 940 320)">BAY OF BENGAL</text>
      <text x="23" y="600" textAnchor="middle" fontSize="10" fill={line} fillOpacity="0.8" letterSpacing="3" transform="rotate(-90 23 600)">EAST COAST ROAD</text>
    </svg>
  );
}

export function ResortMap({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [activeId, setActiveId] = useState(mapZones[0].id);
  const active = mapZones.find((z) => z.id === activeId) ?? mapZones[0];
  const dark = tone === "dark";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <figure className="lg:col-span-8">
        <div className={cn("relative aspect-[1000/640] w-full overflow-hidden", dark ? "bg-ocean" : "bg-sand")}>
          <PlanArtwork dark={dark} />
          {mapZones.map((z, i) => {
            const selected = z.id === activeId;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => setActiveId(z.id)}
                aria-pressed={selected}
                aria-controls="map-zone-panel"
                className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                style={{ left: `${(z.x / MW) * 100}%`, top: `${(z.y / MH) * 100}%` }}
              >
                <span className="sr-only">Show {z.name}</span>
                <span
                  aria-hidden
                  className={cn(
                    "relative grid h-9 w-9 place-items-center rounded-full text-[0.7rem] font-medium tabular-nums transition-all duration-300 md:h-10 md:w-10",
                    selected ? "scale-110 bg-terracotta text-ivory" : "bg-ivory text-ocean-deep group-hover:bg-sand",
                  )}
                >
                  {selected && <span className="absolute inset-0 animate-ping rounded-full bg-terracotta/40 motion-reduce:hidden" />}
                  <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-1/2 left-full ml-1 hidden -translate-y-1/2 whitespace-nowrap bg-ocean-deep/85 px-2 py-1 text-[0.65rem] tracking-wide text-ivory opacity-0 transition-opacity md:block",
                    "group-hover:opacity-100 group-focus-visible:opacity-100",
                  )}
                >
                  {z.name}
                </span>
              </button>
            );
          })}
        </div>
        <figcaption className={cn("mt-3 text-xs", dark ? "text-ivory/60" : "text-ink/60")}>
          Conceptual illustration for orientation only — not to scale and not an official site plan.
          Locations are indicative and will be updated when the resort supplies its plan.
        </figcaption>
      </figure>

      <div className="lg:col-span-4">
        <ul className={cn("mb-6 flex flex-wrap gap-2", "lg:hidden")} aria-label="Map areas">
          {mapZones.map((z, i) => (
            <li key={z.id}>
              <button
                type="button"
                onClick={() => setActiveId(z.id)}
                aria-pressed={z.id === activeId}
                className={cn(
                  "min-h-10 border px-3 text-xs transition-colors",
                  z.id === activeId
                    ? "border-terracotta bg-terracotta text-ivory"
                    : dark
                      ? "border-ivory/25 text-ivory/80"
                      : "border-ink/20 text-ink/80",
                )}
              >
                {String(i + 1).padStart(2, "0")} {z.name}
              </button>
            </li>
          ))}
        </ul>
        <div id="map-zone-panel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Media media={active.media} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[16/10] w-full" />
              <h3 className={cn("mt-6 text-display-sm", dark ? "text-ivory" : "text-ocean-deep")}>{active.name}</h3>
              <p className={cn("mt-3 leading-relaxed", dark ? "text-ivory/75" : "text-ink/75")}>{active.summary}</p>
              <ul className={cn("mt-5 space-y-2 text-sm", dark ? "text-ivory/80" : "text-ink/80")}>
                {active.facts.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={active.href}
                className={cn("eyebrow link-underline mt-7 inline-block pb-1", dark ? "text-sand" : "text-ocean")}
              >
                {active.linkLabel} →
              </Link>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
