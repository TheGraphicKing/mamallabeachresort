import Link from "next/link";
import type { ReactNode } from "react";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";
import { Parallax } from "../motion/Parallax";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  media?: MediaAsset;
  breadcrumbs?: { label: string; href: string }[];
  children?: ReactNode;
  size?: "tall" | "short";
}

/** Internal-page hero: full-bleed artwork/photo with an editorial title block. */
export function PageHero({ eyebrow, title, lead, media, breadcrumbs, children, size = "tall" }: PageHeroProps) {
  return (
    <section
      className={cn(
        "on-dark relative isolate flex items-end overflow-hidden bg-ocean-deep text-ivory",
        size === "tall" ? "min-h-[78svh] md:min-h-[88svh]" : "min-h-[52svh]",
      )}
    >
      {media && (
        <Parallax className="absolute inset-0 -z-10" strength={6}>
          <Media media={media} priority sizes="100vw" className="hero-zoom h-full w-full" labelPosition="hero" />
        </Parallax>
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/35 to-ocean-deep/25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-deep/60 to-transparent" />
      <div className="container-site pt-36 pb-14 md:pb-20">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="rise-in mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ivory/70">
              <li>
                <Link href="/" className="link-underline hover:text-ivory">Home</Link>
              </li>
              {breadcrumbs.map((b) => (
                <li key={b.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={b.href} className="link-underline hover:text-ivory">{b.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow rise-in mb-5 flex items-center gap-4 text-sand" style={{ animationDelay: "80ms" }}>
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
        <h1 className="rise-in-solid max-w-5xl text-display-lg">
          {title}
        </h1>
        {lead && (
          <div className="rise-in mt-6 max-w-2xl text-lead text-ivory/85" style={{ animationDelay: "260ms" }}>
            {lead}
          </div>
        )}
        {children && <div className="rise-in mt-9" style={{ animationDelay: "360ms" }}>{children}</div>}
      </div>
    </section>
  );
}
