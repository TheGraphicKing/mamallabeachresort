import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/types";

/** Accessible accordion built on native <details>/<summary> — works without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/12 border-y border-ink/12">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
            <span className="font-display text-xl leading-snug text-ocean-deep md:text-2xl">{f.q}</span>
            <Plus
              aria-hidden
              className="mt-1.5 h-5 w-5 shrink-0 text-seaglass-deep transition-transform duration-500 ease-[var(--ease-tide)] group-open:rotate-45"
              strokeWidth={1.4}
            />
          </summary>
          <div className="details-body max-w-2xl pb-7 leading-relaxed text-ink/75">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
