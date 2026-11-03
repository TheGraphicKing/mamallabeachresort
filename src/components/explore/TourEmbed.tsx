"use client";

import { AlertTriangle, Expand, Loader2, Mail, Phone, RotateCcw, View } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { media } from "@/content/media";
import { resort } from "@/content/resort";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";

type State = "idle" | "loading" | "ready" | "error";

/**
 * 360° tour integration point.
 * - Loads nothing until the guest chooses to start the tour (protects page performance).
 * - Shows loading, timeout/error and full-screen states.
 * - When no tour URL is configured, shows a designed fallback with contact actions.
 */
export function TourEmbed({
  url,
  title = "360° view of Mamalla Beach Resort",
  externalUrl,
  credit = "360° view on Google Maps. Content loads from Google when you start the tour.",
  aspect = "aspect-[4/5] sm:aspect-video",
}: {
  url: string;
  title?: string;
  /** Link for "Open in new tab" (defaults to the embed URL). */
  externalUrl?: string;
  credit?: string;
  aspect?: string;
}) {
  const openUrl = externalUrl || url;
  const [state, setState] = useState<State>("idle");
  const [attempt, setAttempt] = useState(0);
  const frameWrap = useRef<HTMLDivElement>(null);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => setCanFullscreen(Boolean(document.fullscreenEnabled)), []);

  useEffect(() => {
    if (state !== "loading") return;
    const t = setTimeout(() => setState((s) => (s === "loading" ? "error" : s)), 20000);
    return () => clearTimeout(t);
  }, [state, attempt]);

  const start = () => {
    setAttempt((a) => a + 1);
    setState("loading");
  };

  const fullscreen = () => {
    const el = frameWrap.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => {});
  };

  if (!url) {
    return (
      <div className="on-dark relative isolate overflow-hidden bg-ocean-deep text-ivory">
        <Media media={media.heroShore} className="absolute inset-0 -z-10 opacity-60" sizes="100vw" labelPosition="top-right" />
        <div className="absolute inset-0 -z-10 bg-ocean-deep/60" aria-hidden />
        <div className="flex min-h-[60svh] flex-col items-center justify-center px-6 py-20 text-center">
          <View aria-hidden className="h-10 w-10 text-sand" strokeWidth={1.2} />
          <h3 className="mt-6 max-w-xl font-display text-3xl md:text-4xl">The 360° tour is being connected</h3>
          <p className="mt-4 max-w-lg text-ivory/80">
            Our immersive tour will appear here shortly. In the meantime, our team is happy to share photographs and
            answer any questions about the rooms, pool, lawn and halls.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={resort.phone.href} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ivory px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ocean-deep hover:bg-sand">
              <Phone aria-hidden className="h-4 w-4" strokeWidth={1.5} /> Call us
            </a>
            <a href={resort.email.href} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ivory/50 px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] hover:border-ivory">
              <Mail aria-hidden className="h-4 w-4" strokeWidth={1.5} /> Email us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div ref={frameWrap} className={cn("on-dark relative w-full overflow-hidden rounded-[var(--radius-frame)] bg-ocean-deep text-ivory", aspect)}>
        {state === "idle" || state === "error" ? (
          <>
            <Media media={media.heroShore} className="absolute inset-0 opacity-70" sizes="100vw" labelPosition="top-right" />
            <div className="absolute inset-0 bg-ocean-deep/50" aria-hidden />
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              {state === "error" ? (
                <>
                  <AlertTriangle aria-hidden className="h-9 w-9 text-sand" strokeWidth={1.3} />
                  <p className="mt-4 max-w-md font-display text-2xl" role="alert">
                    The tour didn&apos;t load. It may be blocked by your network or temporarily unavailable.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={start} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ivory px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ocean-deep hover:bg-sand">
                      <RotateCcw aria-hidden className="h-4 w-4" /> Try again
                    </button>
                    <a href={openUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-ivory/50 px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em]">
                      Open in a new tab
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={start}
                    className="group relative grid h-32 w-32 place-items-center rounded-full border border-ivory/60 bg-ivory/10 backdrop-blur-md transition-colors hover:bg-ivory hover:text-ocean-deep"
                  >
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-ivory/30 motion-reduce:hidden" />
                    <span className="flex flex-col items-center gap-1">
                      <span className="font-display text-3xl leading-none">360°</span>
                      <span className="eyebrow text-[0.6rem]">Start view</span>
                    </span>
                  </button>
                  <p className="mt-6 max-w-sm text-sm text-ivory/80">
                    Drag to look around, scroll or pinch to zoom.
                  </p>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <iframe
              key={attempt}
              src={url}
              title={title}
              className={cn("absolute inset-0 h-full w-full border-0 transition-opacity duration-700", state === "ready" ? "opacity-100" : "opacity-0")}
              allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setState("ready")}
            />
            {state === "loading" && (
              <div className="absolute inset-0 grid place-items-center" role="status">
                <span className="flex items-center gap-3 text-sm text-ivory/80">
                  <Loader2 aria-hidden className="h-5 w-5 animate-spin" /> Loading the tour…
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/70">
        <p>{credit}</p>
        <div className="flex gap-2">
          {canFullscreen && state === "ready" && (
            <button type="button" onClick={fullscreen} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-5 hover:border-ink">
              <Expand aria-hidden className="h-4 w-4" strokeWidth={1.5} /> Full screen
            </button>
          )}
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 hover:border-ink">
            {externalUrl ? "Open in Google Maps" : "Open in new tab"}
          </a>
        </div>
      </div>
    </div>
  );
}
