"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fullAddress, nav, resort } from "@/content/resort";
import { cn } from "@/lib/cn";
import { BookButton } from "../booking/BookingDrawer";
import { Wordmark } from "./Wordmark";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function NavLinks({ items, pathname }: { items: { label: string; href: string }[]; pathname: string }) {
  return (
    <ul className="flex items-center gap-6 2xl:gap-8">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group/nav relative block py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-opacity duration-300",
                active ? "opacity-100" : "opacity-75 hover:opacity-100",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-tide)]",
                  "w-full",
                  active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /** What sits behind the header right now: a dark surface (hero, green panels, footer) or a light one. */
  const [behind, setBehind] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The header never hides. On scroll/resize we sample what is underneath it and adapt its colours.
  useEffect(() => {
    let frame = 0;
    const sample = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
      const header = headerRef.current;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const y = Math.min(window.innerHeight - 1, rect.bottom - rect.height / 2);
      let dark = 0;
      const xs = [0.18, 0.5, 0.82].map((f) => window.innerWidth * f);
      for (const x of xs) {
        const under = document
          .elementsFromPoint(x, y)
          .find((el) => !header.contains(el) && !el.closest("[data-nav-ignore]"));
        // Dark surfaces are marked with .on-dark (hero frames, green panels, CTA banner, footer…)
        if (under?.closest(".on-dark")) dark++;
      }
      setBehind(dark >= 2 ? "dark" : "light");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Re-sample after late layout shifts (fonts, images, route changes)
    const t = setTimeout(sample, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(t);
    };
  }, [pathname]);

  // Close the menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const all = [menuBtn.current!, ...Array.from(f)];
        const first = all[0];
        const last = all[all.length - 1];
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
  }, [menuOpen]);

  /**
   * Tone:
   *  - "clear": at the top of a page over the hero → transparent, light text
   *  - "ink":   over a LIGHT background → solid deep pill, light text
   *  - "paper": over a DARK background (after scrolling) → light pill, dark text
   */
  const tone: "clear" | "ink" | "paper" = menuOpen ? "clear" : behind === "light" ? "ink" : scrolled ? "paper" : "clear";
  const solid = tone !== "clear";
  const light = tone !== "paper"; // light text

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[80] -translate-y-24 bg-ocean px-4 py-3 text-sm text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header ref={headerRef} data-tone={tone} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div
          className={cn(
            "mx-auto grid h-16 max-w-[92rem] grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-full px-4 transition-[background-color,color,box-shadow,padding] duration-500 ease-[var(--ease-tide)] md:h-[4.5rem] md:px-7",
            tone === "clear" && "bg-transparent text-ivory",
            tone === "ink" && "bg-ocean-deep/95 text-ivory shadow-[0_18px_50px_-20px_rgba(10,20,18,0.55)] ring-1 ring-ivory/10 backdrop-blur-xl",
            tone === "paper" && "bg-paper/92 text-ink shadow-[0_18px_50px_-24px_rgba(0,0,0,0.5)] ring-1 ring-ink/5 backdrop-blur-xl",
            light && "on-dark",
          )}
        >
          <div className="flex items-center gap-8">
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="group -ml-2 flex h-11 items-center gap-3 px-2"
            >
              <span aria-hidden className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-tide)]",
                    menuOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-tide)]",
                    menuOpen ? "top-1.5 w-full -rotate-45" : "top-3 w-4 group-hover:w-full",
                  )}
                />
              </span>
              <span aria-hidden className="eyebrow hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
            </button>
            <nav aria-label="Primary" className="hidden xl:block">
              <NavLinks items={nav.primary} pathname={pathname} />
            </nav>
          </div>

          <Link href="/" aria-label={`${resort.name} — home`} className="justify-self-center">
            <Wordmark compact={solid} />
          </Link>

          <div className="flex items-center justify-end gap-2 md:gap-5">
            <nav aria-label="Secondary" className="hidden xl:block">
              <NavLinks items={nav.secondary} pathname={pathname} />
            </nav>
            <a
              href={resort.phone.href}
              className="hidden h-11 items-center gap-2 px-2 text-sm 2xl:flex"
              aria-label={`Call the resort on ${resort.phone.display}`}
            >
              <Phone aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              <span className="tabular-nums">{resort.phone.display}</span>
            </a>
            <BookButton
              className={cn(
                "inline-flex min-h-11 items-center rounded-full px-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-colors md:px-6",
                tone === "paper" ? "bg-ocean-deep text-ivory hover:bg-ocean" : tone === "ink" ? "bg-sand text-ocean-deep hover:bg-ivory" : "bg-paper text-ocean-deep hover:bg-sand",
              )}
            >
              Book<span className="hidden sm:inline xl:hidden 2xl:inline">&nbsp;your stay</span>
            </BookButton>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark fixed inset-0 z-40 overflow-y-auto bg-ocean-deep text-ivory"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="container-site grid min-h-full gap-12 pt-28 pb-16 md:pt-36 lg:grid-cols-[1.6fr_1fr]">
              <nav aria-label="Site" className="grid gap-10 sm:grid-cols-2">
                {nav.menu.map((group, gi) => (
                  <motion.div
                    key={group.title}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + gi * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="eyebrow mb-4 text-sand/80">{group.title}</p>
                    <ul className="space-y-1">
                      {group.links.map((l) => {
                        const active = isActive(pathname, l.href);
                        return (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "group inline-flex items-baseline gap-3 py-1 font-display text-3xl leading-tight transition-colors md:text-4xl",
                                active ? "text-sand" : "text-ivory hover:text-sand",
                              )}
                            >
                              {l.label}
                              {active && <span className="eyebrow text-[0.6rem] text-sand/80">Current</span>}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col justify-end gap-8 border-t border-ivory/15 pt-10 text-ivory/80 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
              >
                <div>
                  <p className="eyebrow mb-3 text-sand/80">Find us</p>
                  <address className="not-italic leading-relaxed">{fullAddress}</address>
                </div>
                <div>
                  <p className="eyebrow mb-3 text-sand/80">Reservations</p>
                  <p>
                    <a href={resort.phone.href} className="link-underline">
                      {resort.phone.display}
                    </a>
                  </p>
                  <p>
                    <a href={resort.email.href} className="link-underline break-all">
                      {resort.email.display}
                    </a>
                  </p>
                </div>
                <BookButton className="inline-flex min-h-12 w-fit items-center bg-ivory px-7 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ocean-deep hover:bg-sand">
                  Book your stay
                </BookButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
