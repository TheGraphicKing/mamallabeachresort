import { cn } from "@/lib/cn";

/** Text-based wordmark with a small line-drawn tower motif (original; not an official logo). */
export function Wordmark({ compact, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn("flex flex-col items-center leading-none", className)}>
      <svg
        aria-hidden
        viewBox="0 0 40 28"
        className={cn("mb-1.5 h-5 w-auto transition-all duration-500", compact && "h-0 opacity-0 md:mb-0")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      >
        <path d="M6 27h28M10 27v-5h20v5M12 22v-4h16v4M14.5 18v-4h11v4M17 14v-4h6v4M18.5 10 20 4l1.5 6" />
        <path d="M2 27c3-1.6 5-1.6 8 0" opacity=".6" />
        <path d="M30 27c3-1.6 5-1.6 8 0" opacity=".6" />
      </svg>
      <span className="font-display text-[1.45rem] tracking-[0.32em] md:text-[1.7rem]">MAMALLA</span>
      <span className={cn("mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.38em] opacity-80 transition-all duration-500", compact && "md:mt-0.5")}>
        Beach Resort
      </span>
    </span>
  );
}
