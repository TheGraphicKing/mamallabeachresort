"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { resort } from "@/content/resort";
import { cn } from "@/lib/cn";
import { BookButton } from "../booking/BookingDrawer";

/** Persistent booking CTA on small screens, revealed once the visitor scrolls past the hero. */
export function MobileBookBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname === "/book") return null;
  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-[auto_1fr] gap-1 rounded-full bg-paper/90 p-1.5 shadow-[0_20px_50px_-20px_rgba(23,48,42,0.55)] ring-1 ring-ink/5 backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-tide)] md:hidden",
        show ? "translate-y-0" : "translate-y-[150%]",
      )}
      inert={!show}
    >
      <a
        href={resort.phone.href}
        className="flex min-h-12 items-center gap-2 rounded-full px-5 text-sm text-ink"
        aria-label={`Call ${resort.phone.display}`}
      >
        <Phone aria-hidden className="h-4 w-4" strokeWidth={1.5} /> Call
      </a>
      <BookButton className="flex min-h-12 items-center justify-center rounded-full bg-ocean-deep text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory">
        Check availability
      </BookButton>
    </div>
  );
}
