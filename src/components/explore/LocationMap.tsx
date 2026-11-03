"use client";

import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { resort } from "@/content/resort";
import { cn } from "@/lib/cn";

/**
 * Location card: a designed placeholder that loads the live Google map on request
 * (keeps third-party scripts off the page until the visitor wants them), plus
 * "Open in Google Maps" (the resort's place page) and "Get directions" actions.
 */
export function LocationMap({ className, tall }: { className?: string; tall?: boolean }) {
  const [live, setLive] = useState(false);
  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-frame)] bg-ocean-deep text-ivory on-dark", className)}>
      <div className={cn("relative w-full", tall ? "aspect-[4/5] sm:aspect-[16/10]" : "aspect-[4/3] sm:aspect-[16/10]")}>
        {live ? (
          <iframe
            title={`Map showing ${resort.name}`}
            src={resort.maps.embedSrc}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label="Load the interactive Google map"
          >
            <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 500">
              <path d="M560,0 C540,140 600,260 570,500 L800,500 L800,0 Z" fill="currentColor" className="text-seaglass-deep" />
              <path d="M300,0 C320,140 280,320 320,500" stroke="currentColor" strokeWidth="7" fill="none" className="text-sand" />
              <path d="M0,240 C200,220 400,270 560,240" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" fill="none" className="text-sand" />
              <text x="285" y="470" fontSize="11" letterSpacing="3" fill="currentColor" className="text-ivory" textAnchor="end">EAST COAST ROAD</text>
            </svg>
            <span className="relative flex flex-col items-center gap-4 text-center">
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-terracotta text-ivory shadow-lg">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-terracotta/40 motion-reduce:hidden" />
                <MapPin aria-hidden className="relative h-6 w-6" strokeWidth={1.6} />
              </span>
              <span className="font-display text-2xl md:text-3xl">{resort.name}</span>
              <span className="rounded-full border border-ivory/40 bg-ivory/10 px-5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] backdrop-blur-md transition-colors group-hover:bg-ivory group-hover:text-ocean-deep">
                Show interactive map
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 p-3">
        <a
          href={resort.maps.directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-sand px-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ocean-deep transition-colors hover:bg-ivory"
        >
          <Navigation aria-hidden className="h-4 w-4" strokeWidth={1.6} /> Get directions
        </a>
        <a
          href={resort.maps.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ivory/35 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-ivory hover:text-ocean-deep"
        >
          Open in Google Maps <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.6} />
        </a>
      </div>
    </div>
  );
}
