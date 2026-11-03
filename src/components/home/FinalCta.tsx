import Link from "next/link";
import { media } from "@/content/media";
import { BookButton } from "../booking/BookingDrawer";
import { Media } from "../media/Media";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { ArrowDot, buttonClass } from "../ui/Button";

/** Rounded photographic banner inside the page margins. */
export function FinalCta({ title = "The coast is calling.", lead = "Choose your dates and tell us who's coming. We'll take care of the rest." }: { title?: string; lead?: string }) {
  return (
    <section aria-labelledby="final-cta-title" className="px-3 py-16 md:px-6 md:py-24">
      <div className="on-dark relative isolate overflow-hidden rounded-[var(--radius-frame)] text-ivory">
        <Parallax className="media-bleed absolute inset-0 -z-10" strength={10}>
          <Media media={media.coastSunset} sizes="100vw" className="h-full w-full" labelPosition="top-right" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-ocean-deep/55" />
        <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 py-24 text-center">
          <Reveal>
            <p className="inline-flex rounded-full border border-ivory/25 bg-ivory/10 px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.24em] backdrop-blur-md">
              Plan your stay
            </p>
            <h2 id="final-cta-title" className="mx-auto mt-7 max-w-4xl text-display-lg">{title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lead text-ivory/85">{lead}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <BookButton className={buttonClass("light", "pr-5")}>
                Check availability <ArrowDot />
              </BookButton>
              <Link href="/contact" className={buttonClass("outline-light")}>Contact the resort</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
