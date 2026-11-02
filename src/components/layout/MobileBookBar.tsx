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
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] border-t border-ink/10 bg-ivory/95 pb-safe backdrop-blur-md transition-transform duration-500 ease-[var(--ease-tide)] md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      inert={!show}
    >
      <a
        href={resort.phone.href}
        className="flex min-h-14 items-center gap-2 px-5 text-sm text-ink"
        aria-label={`Call ${resort.phone.display}`}
      >
        <Phone aria-hidden className="h-4 w-4" strokeWidth={1.5} /> Call
      </a>
      <BookButton className="flex min-h-14 items-center justify-center bg-ocean text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory">
        Check availability
      </BookButton>
    </div>
  );
}
