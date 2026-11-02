import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className, light }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", light ? "text-sand" : "text-stone-deep", className)}>
      <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  align = "left",
  as: Tag = "h2",
  light,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  light?: boolean;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <Eyebrow light={light} className={cn("mb-6", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag className={cn("text-display-md", light ? "text-ivory" : "text-ocean-deep")}>{title}</Tag>
      {lead && <div className={cn("mt-6 text-lead", light ? "text-ivory/80" : "text-ink/75")}>{lead}</div>}
    </div>
  );
}
