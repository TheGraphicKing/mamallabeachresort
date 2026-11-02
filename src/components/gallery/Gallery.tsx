"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";

const layoutPattern = ["md:col-span-7 aspect-[4/3]", "md:col-span-5 aspect-[4/5]", "md:col-span-5 aspect-[4/5]", "md:col-span-7 aspect-[4/3]"];

export function Gallery({ items, filterable = true }: { items: MediaAsset[]; filterable?: boolean }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);
  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i === null ? i : (i + d + visible.length) % visible.length));
    },
    [visible.length],
  );

  useEffect(() => {
    if (index === null) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, go]);

  const current = index !== null ? visible[index] : null;

  return (
    <div>
      {filterable && (
        <div role="group" aria-label="Filter gallery" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "min-h-11 border px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                filter === c ? "border-ocean bg-ocean text-ivory" : "border-ink/20 text-ink hover:border-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ul className="grid gap-4 md:grid-cols-12 md:gap-5">
        {visible.map((m, i) => (
          <motion.li
            key={m.id + filter}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={cn("relative", layoutPattern[i % layoutPattern.length].split(" ")[0])}
          >
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setDir(0);
                setIndex(i);
              }}
              className="group block w-full text-left"
              aria-label={`Open ${m.caption ?? m.alt} in full screen`}
            >
              <span className="block overflow-hidden">
                <Media
                  media={m}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className={cn("w-full", layoutPattern[i % layoutPattern.length].split(" ")[1], "aspect-[4/3] md:aspect-auto")}
                  imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-3 flex items-center justify-between gap-4 text-sm text-ink/70">
                <span>{m.caption}</span>
                <Maximize2 aria-hidden className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${index + 1} of ${visible.length}: ${current.caption ?? current.alt}`}
            className="on-dark fixed inset-0 z-[70] flex flex-col bg-ocean-deep/97 text-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-8">
              <p className="text-sm tabular-nums text-ivory/70" aria-live="polite">
                {index + 1} / {visible.length}
              </p>
              <button type="button" data-autofocus onClick={close} className="grid h-12 w-12 place-items-center hover:bg-ivory/10" aria-label="Close full-screen view">
                <X className="h-6 w-6" strokeWidth={1.3} />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 md:px-20">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={current.id}
                  custom={dir}
                  className="w-full max-w-6xl touch-pan-y"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  drag={reduce ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                >
                  <Media media={current} sizes="100vw" className="mx-auto aspect-[3/2] max-h-[75dvh] w-full" />
                </motion.div>
              </AnimatePresence>
              {visible.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} className="absolute left-2 grid h-12 w-12 place-items-center bg-ocean-deep/60 hover:bg-ivory/15 md:left-6" aria-label="Previous image">
                    <ChevronLeft className="h-6 w-6" strokeWidth={1.3} />
                  </button>
                  <button type="button" onClick={() => go(1)} className="absolute right-2 grid h-12 w-12 place-items-center bg-ocean-deep/60 hover:bg-ivory/15 md:right-6" aria-label="Next image">
                    <ChevronRight className="h-6 w-6" strokeWidth={1.3} />
                  </button>
                </>
              )}
            </div>
            <p className="px-6 pt-4 pb-8 text-center text-sm text-ivory/75 pb-safe">
              {current.caption}
              {!current.src && <span className="ml-2 text-ivory/50">· Sample image</span>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
