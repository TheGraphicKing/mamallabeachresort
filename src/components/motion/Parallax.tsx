"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Subtle vertical parallax for large imagery. The inner layer is oversized so
 * movement never exposes an edge. Disabled for reduced motion.
 * The caller must position the wrapper (e.g. "relative aspect-…" or "absolute inset-0").
 */
export function Parallax({ children, className, strength = 8 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // y is a percentage of the (oversized) layer's own height, so scale it to stay within the bleed.
  const travel = (strength / (100 + 2 * strength)) * 100 * 0.95;
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${travel}%`, `${travel}%`]);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }}
      >
        {children}
      </motion.div>
    </div>
  );
}
