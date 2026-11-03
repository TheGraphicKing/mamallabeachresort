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
    <section className="px-3 pt-3 md:px-6 md:pt-5">
     <div
      className={cn(
        "on-dark relative isolate flex items-end overflow-hidden rounded-[var(--radius-frame)] bg-ocean-deep text-ivory",
        size === "tall" ? "min-h-[74svh] md:min-h-[84svh]" : "min-h-[52svh]",
      )}
     >
      {media && (
        <Parallax className="media-bleed absolute inset-0 -z-10" strength={6}>
          <Media media={media} priority sizes="100vw" className="hero-zoom h-full w-full" labelPosition="hero" />
        </Parallax>
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/35 to-ocean-deep/25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-deep/60 to-transparent" />
      <div className="w-full px-6 pt-36 pb-12 md:px-12 md:pb-16 lg:px-16">
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
        <p
          className="rise-in mb-6 inline-flex items-center gap-3 rounded-full border border-ivory/25 bg-ivory/10 px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-ivory/90 backdrop-blur-md"
          style={{ animationDelay: "80ms" }}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sand" />
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
     </div>
    </section>
  );
}
