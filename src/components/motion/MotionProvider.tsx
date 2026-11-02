"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Honour the visitor's reduced-motion preference across all Framer Motion animations. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
