"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { RemotePhoto } from "./RemotePhoto";

/**
 * Full-bleed hero film over a photo poster.
 * - The poster photo renders first (server-side), so the hero is never empty and LCP isn't blocked.
 * - Video loads only on screens ≥ 768px, without reduced-motion or data-saver preferences.
 * - Multiple <source>s are tried in order; if none plays, the poster simply stays.
 * - A visible pause/play control satisfies WCAG 2.2.2 for moving content.
 */
export function HeroVideo({ poster, sources, className }: { poster: MediaAsset; sources: string[]; className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (wide && !calm && !saveData && sources.length) setEnabled(true);
  }, [sources.length]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div className={cn("absolute inset-0", className)}>
      <RemotePhoto
        sources={poster.photos ?? []}
        alt={poster.alt}
        sizes="100vw"
        priority
        className="hero-zoom"
        fallbackScene={poster.scene}
      />
      {enabled && (
        <video
          ref={ref}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-out",
            playing ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
        >
          {sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      )}
      {playing && (
        <button
          type="button"
          onClick={toggle}
          className="on-dark absolute top-28 right-6 z-10 hidden h-10 items-center gap-2 border border-ivory/30 bg-ocean-deep/30 px-3 text-[0.62rem] font-medium uppercase tracking-[0.26em] text-ivory/85 backdrop-blur-sm transition-colors hover:bg-ocean-deep/60 md:flex"
          aria-label={paused ? "Play background video" : "Pause background video"}
        >
          {paused ? <Play aria-hidden className="h-3.5 w-3.5" /> : <Pause aria-hidden className="h-3.5 w-3.5" />}
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </div>
  );
}
