"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroOptions } from "@/content/media";
import { themes } from "@/content/themes";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";
import { usePreview } from "./PreviewProvider";

/** Floating panel for choosing a colour palette and hero image. Choices are saved in this browser only. */
export function PreviewPanel() {
  const { theme, setTheme, hero, setHero } = usePreview();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node) && !btn.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="fixed bottom-24 left-3 z-[55] md:bottom-6 md:left-auto md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            id="preview-panel"
            role="dialog"
            aria-label="Preview options"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 left-0 max-h-[75dvh] md:left-auto md:right-0 w-[min(22rem,calc(100vw-1.5rem))] overflow-y-auto rounded-[1.5rem] bg-paper p-5 text-ink shadow-[0_30px_70px_-25px_rgba(0,0,0,0.45)] ring-1 ring-ink/10"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-xl text-ocean-deep">Preview options</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-ivory-deep"
                aria-label="Close preview options"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-ink/65">
              Saved in this browser only. Tell us your favourites and we&apos;ll make them the default.
            </p>

            <fieldset className="mt-5">
              <legend className="eyebrow mb-3 text-stone-deep">Colour palette</legend>
              <div className="space-y-2">
                {themes.map((t) => (
                  <label
                    key={t.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-full border px-3 py-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-terracotta",
                      theme === t.id ? "border-ocean-deep bg-ivory-deep" : "border-ink/10 hover:border-ink/30",
                    )}
                  >
                    <input
                      type="radio"
                      name="palette"
                      value={t.id}
                      checked={theme === t.id}
                      onChange={() => setTheme(t.id)}
                      className="sr-only"
                    />
                    <span className="flex -space-x-1.5" aria-hidden>
                      {t.swatches.map((c) => (
                        <span key={c} className="h-6 w-6 rounded-full ring-2 ring-paper" style={{ background: c }} />
                      ))}
                    </span>
                    <span className="text-sm">{t.name}</span>
                    {theme === t.id && <Check aria-hidden className="ml-auto h-4 w-4 text-ocean-deep" />}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="eyebrow mb-3 text-stone-deep">Hero image</legend>
              <div className="grid grid-cols-2 gap-3">
                {heroOptions.map((h, i) => (
                  <label key={h.name} className="group cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-terracotta">
                    <input
                      type="radio"
                      name="hero"
                      value={i}
                      checked={hero === i}
                      onChange={() => setHero(i)}
                      className="sr-only"
                    />
                    <Media
                      media={h.media}
                      sizes="160px"
                      showLabel={false}
                      className={cn(
                        "aspect-[4/3] w-full rounded-[0.9rem] ring-2 ring-offset-2 ring-offset-paper transition",
                        hero === i ? "ring-ocean-deep" : "ring-transparent group-hover:ring-ink/20",
                      )}
                    />
                    <span className="mt-1.5 block text-xs text-ink/75">{h.name}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink/55">Hero choices apply to the home page.</p>
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        ref={btn}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="preview-panel"
        className="flex h-12 items-center gap-2 rounded-full bg-paper/90 px-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ocean-deep shadow-[0_16px_40px_-18px_rgba(0,0,0,0.5)] ring-1 ring-ink/10 backdrop-blur-xl transition hover:bg-paper"
      >
        <Palette aria-hidden className="h-4 w-4" />
        Preview
      </button>
    </div>
  );
}
