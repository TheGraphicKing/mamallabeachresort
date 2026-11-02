import type { Fact } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Definition list of facts. Unknown values are shown in a muted style so guests
 * understand they will be confirmed by the resort, never guessed.
 */
export function FactList({ facts, className, light }: { facts: Fact[]; className?: string; light?: boolean }) {
  return (
    <dl className={cn("divide-y border-y hairline", light ? "divide-ivory/15 border-ivory/15" : "divide-ink/12", className)}>
      {facts.map((f) => (
        <div key={f.label} className="grid grid-cols-[minmax(7rem,40%)_1fr] gap-4 py-4">
          <dt className={cn("eyebrow pt-0.5", light ? "text-sand" : "text-stone-deep")}>{f.label}</dt>
          <dd className={cn(f.status === "unknown" && "italic opacity-70", light ? "text-ivory" : "text-ink")}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
