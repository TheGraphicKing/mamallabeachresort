"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { resort } from "@/content/resort";
import { BookingForm } from "./BookingForm";

const BookingContext = createContext<{ open: () => void }>({ open: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

/**
 * Global booking drawer: a bottom sheet on mobile, a side panel on larger screens.
 * Opened from the header CTA, the mobile sticky bar and in-page "Book" buttons.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
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
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60]">
            <motion.div
              className="absolute inset-0 bg-ocean-deep/55 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-drawer-title"
              className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto bg-ivory pb-safe md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[30rem]"
              initial={reduce ? { opacity: 0 } : { y: "100%", x: 0 }}
              animate={reduce ? { opacity: 1 } : { y: 0, x: 0 }}
              exit={reduce ? { opacity: 0 } : { y: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-ivory px-6 py-4">
                <div aria-hidden className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-ink/15 md:hidden" />
                <h2 id="booking-drawer-title" className="font-display text-2xl text-ocean-deep">
                  Plan your stay
                </h2>
                <button
                  type="button"
                  onClick={close}
                  data-autofocus
                  className="grid h-11 w-11 place-items-center text-ink hover:bg-sand"
                  aria-label="Close booking panel"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="px-6 pt-2 pb-8">
                <BookingForm layout="panel" onDone={close} />
                <div className="mt-8 border-t border-ink/10 pt-6 text-sm text-ink/70">
                  <p>Prefer to speak to someone?</p>
                  <a href={resort.phone.href} className="mt-2 inline-flex items-center gap-2 font-medium text-ocean link-underline">
                    <Phone aria-hidden className="h-4 w-4" strokeWidth={1.5} /> {resort.phone.display}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}

/** Button that opens the booking drawer. Falls back to /book link semantics if JS hasn't loaded. */
export function BookButton({ className, children = "Book your stay" }: { className?: string; children?: ReactNode }) {
  const { open } = useBooking();
  return (
    <a
      href="/book"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        open();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
