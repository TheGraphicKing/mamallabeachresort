"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

/** Copies text to the clipboard with accessible feedback. */
export function CopyButton({ text, label = "Copy address", className }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2400);
  };
  return (
    <button type="button" onClick={copy} className={cn("eyebrow inline-flex min-h-11 items-center gap-2 text-ocean", className)}>
      {state === "copied" ? <Check aria-hidden className="h-3.5 w-3.5" /> : <Copy aria-hidden className="h-3.5 w-3.5" />}
      <span className="link-underline pb-1">{state === "copied" ? "Copied" : state === "failed" ? "Select and copy above" : label}</span>
      <span className="sr-only" aria-live="polite">{state === "copied" ? "Address copied to clipboard" : ""}</span>
    </button>
  );
}
