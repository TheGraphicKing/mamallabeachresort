import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "ghost";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.26em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-tide)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ocean-deep text-ivory hover:bg-brass hover:text-ocean-deep",
  secondary: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ocean-deep hover:bg-sand",
  "outline-light": "border border-ivory/60 text-ivory hover:border-ivory hover:bg-ivory hover:text-ocean-deep on-dark",
  ghost: "px-0 text-ink hover:text-terracotta",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-tide)] group-hover:translate-x-1"
      strokeWidth={1.5}
    />
  );
}

interface LinkButtonProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function LinkButton({ variant = "primary", arrow, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  arrow?: boolean;
}

export function Button({ variant = "primary", arrow, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClass(variant, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

/** Editorial text link with animated arrow. */
export function ArrowLink({ href, children, className, light }: { href: string; children: ReactNode; className?: string; light?: boolean }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const cls = cn(
    "group inline-flex items-center gap-3 eyebrow transition-colors",
    light ? "text-ivory hover:text-sand on-dark" : "text-ink hover:text-terracotta",
    className,
  );
  const inner = (
    <>
      <span className="link-underline pb-1">{children}</span>
      <Arrow />
    </>
  );
  return external ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
