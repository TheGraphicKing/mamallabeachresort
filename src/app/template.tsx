"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

let hasNavigated = false;

/**
 * Page transition: a gentle fade-and-rise on client-side route changes.
 * The first, server-rendered page is never hidden (protects LCP and no-JS users).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasNavigated && !reduce;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
