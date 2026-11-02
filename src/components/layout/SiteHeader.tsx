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

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const solid = scrolled && !menuOpen;
  const light = !solid; // light text over imagery / open menu

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[80] -translate-y-24 bg-ocean px-4 py-3 text-sm text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-500 ease-[var(--ease-tide)]",
          solid ? "bg-ivory/95 text-ink shadow-[0_1px_0_rgba(43,41,37,0.08)] backdrop-blur-md" : "bg-transparent text-ivory",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        {!solid && !menuOpen && (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-40 bg-gradient-to-b from-ocean-deep/45 to-transparent" />
        )}
        <div className={cn("container-site grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4 md:h-24", light && "on-dark")}>
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
              <ul className="flex items-center gap-7">
                {nav.primary.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn("eyebrow relative py-2 transition-opacity hover:opacity-100", active ? "opacity-100" : "opacity-80")}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-500",
                            active ? "w-full" : "w-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <Link href="/" aria-label={`${resort.name} — home`} className="justify-self-center">
            <Wordmark compact={solid} />
          </Link>

          <div className="flex items-center justify-end gap-2 md:gap-5">
            <a
              href={resort.phone.href}
              className="hidden h-11 items-center gap-2 px-2 text-sm lg:flex"
              aria-label={`Call the resort on ${resort.phone.display}`}
            >
              <Phone aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              <span className="tabular-nums">{resort.phone.display}</span>
            </a>
            <BookButton
              className={cn(
                "inline-flex min-h-11 items-center px-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors md:px-6",
                solid ? "bg-ocean text-ivory hover:bg-ocean-deep" : "border border-ivory/60 hover:bg-ivory hover:text-ocean-deep",
              )}
            >
              Book<span className="hidden sm:inline">&nbsp;your stay</span>
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
                <BookButton className="inline-flex min-h-12 w-fit items-center bg-ivory px-7 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ocean-deep hover:bg-sand">
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
