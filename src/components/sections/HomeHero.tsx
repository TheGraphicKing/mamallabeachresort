import Link from "next/link";
import { media } from "@/content/media";
import { BookButton } from "../booking/BookingDrawer";
import { BookingForm } from "../booking/BookingForm";
import { Media } from "../media/Media";
import { Parallax } from "../motion/Parallax";
import { buttonClass } from "../ui/Button";

export function HomeHero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ocean-deep text-ivory">
        <Parallax className="absolute inset-0 -z-10" strength={7}>
          <Media media={media.heroShore} priority sizes="100vw" className="hero-zoom h-full w-full" labelPosition="hero" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/30 to-ocean-deep/20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-deep/70 via-ocean-deep/25 to-transparent" />

        <div className="container-site pt-40 pb-28 md:pb-44">
          <p className="eyebrow rise-in mb-6 flex items-center gap-4 text-sand" style={{ animationDelay: "200ms" }}>
            <span aria-hidden className="h-px w-10 bg-current" />
            Mahabalipuram · East Coast Road · Tamil Nadu
          </p>
          <h1 id="hero-title" className="rise-in-solid max-w-6xl text-display-xl">
            Where the granite coast
            <br className="hidden sm:block" /> <em className="font-normal italic text-sand">meets the sea.</em>
          </h1>
          <p className="rise-in mt-8 max-w-xl text-lead text-ivory/85" style={{ animationDelay: "480ms" }}>
            A beachside resort in the temple town of Mamallapuram — pool days, sea air and slow evenings,
            down the coast from Chennai.
          </p>
          <div className="rise-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: "620ms" }}>
            <BookButton className={buttonClass("light")}>Book your stay</BookButton>
            <Link href="/explore" className={buttonClass("outline-light")}>
              Explore the resort
            </Link>
          </div>
        </div>

        <div aria-hidden className="absolute right-6 bottom-10 hidden flex-col items-center gap-3 text-ivory/70 md:flex">
          <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block h-14 w-px overflow-hidden bg-ivory/20">
            <span className="scroll-cue-line absolute inset-0 bg-ivory" />
          </span>
        </div>
      </section>

      {/* Booking bar — overlaps the hero on larger screens */}
      <section aria-label="Check availability" className="relative z-20 hidden md:block">
        <div className="container-site -mt-24">
          <BookingForm layout="bar" />
        </div>
      </section>

      {/* Compact booking panel on phones */}
      <section aria-labelledby="mobile-booking-title" className="bg-ivory-deep px-5 pt-10 pb-12 md:hidden">
        <h2 id="mobile-booking-title" className="mb-2 font-display text-3xl text-ocean-deep">
          Plan your stay
        </h2>
        <BookingForm layout="panel" />
      </section>
    </>
  );
}
