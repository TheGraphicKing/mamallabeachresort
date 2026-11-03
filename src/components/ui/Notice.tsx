import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A quiet, bordered note — used for honest disclosures (e.g. illustrative content, pending confirmation). */
export function Notice({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <aside className={cn("flex gap-4 border-l-2 border-brass bg-ivory-deep/70 px-5 py-4 text-sm leading-relaxed text-ink/80", className)}>
      <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" strokeWidth={1.6} />
      <div>
        {title && <p className="mb-1 font-medium text-ink">{title}</p>}
        {children}
      </div>
    </aside>
  );
}
