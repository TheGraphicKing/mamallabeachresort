"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * The same element is always rendered on server and client (no branching on
 * reduced-motion, which would cause hydration mismatches that leave content hidden).
 * <MotionProvider> sets reducedMotion="user", so for visitors who prefer reduced
 * motion Framer skips transform/clip animation and only fades.
 */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } }),
};

const mask: Variants = {
  hidden: { clipPath: "inset(12% 8% 12% 8%)", opacity: 0.4 },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.3, ease: EASE, delay },
  }),
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "fade" — rise and fade; "mask" — clip-path reveal for imagery. */
  variant?: "fade" | "mask";
  as?: "div" | "section" | "li" | "article" | "figure";
}

/** Scroll-triggered reveal. */
export function Reveal({ children, className, delay = 0, variant = "fade", as = "div" }: RevealProps) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={variant === "mask" ? mask : fadeUp}
      custom={delay}
    >
      {children}
    </M>
  );
}
