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
      <section
        aria-labelledby="hero-title"
        className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ocean-deep text-ivory"
      >
        <Parallax className="absolute inset-0 -z-10" strength={7}>
          <Media media={media.heroShore} priority sizes="100vw" className="hero-zoom h-full w-full" labelPosition="hero" />
        </Parallax>
        {/* Readability: a low vignette and a soft left wash — no heavy overlay across the photo */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/15 to-ocean-deep/35" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_75%,rgba(18,35,47,0.6),transparent_60%)]" />

        <div className="container-site grid w-full gap-12 pt-40 pb-28 md:pb-44 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="eyebrow rise-in mb-7 flex items-center gap-4 text-sand" style={{ animationDelay: "150ms" }}>
              <span aria-hidden className="h-px w-10 bg-current" />
              Mamalla Beach Resort · Mahabalipuram
            </p>
            <h1 id="hero-title" className="rise-in-solid text-display-xl">
              Where the coast
              <span className="block pl-[0.5em] italic text-sand sm:pl-[1em] sm:whitespace-nowrap">slows you down.</span>
            </h1>
            <p className="rise-in mt-9 max-w-md text-lead text-ivory/85" style={{ animationDelay: "420ms" }}>
              A beachside resort on the East Coast Road, in the temple town of Mamallapuram — pool days, sea air and
              long evenings by the Bay of Bengal.
            </p>
            <div className="rise-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: "560ms" }}>
              <BookButton className={buttonClass("light")}>Book your stay</BookButton>
              <Link href="/experiences" className={buttonClass("outline-light")}>
                Explore the resort
              </Link>
            </div>
          </div>

          {/* Editorial inset — a second, quieter image that gives the hero depth */}
          <figure className="rise-in hidden lg:col-span-3 lg:col-start-10 lg:block" style={{ animationDelay: "700ms" }}>
            <Media media={media.introStone} sizes="22vw" className="aspect-[4/5] w-full outline outline-1 outline-offset-[6px] outline-ivory/35 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]" />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-xs text-ivory/75">
              <span className="font-display text-base italic text-ivory">Evenings by the pool</span>
              <span className="eyebrow text-[0.6rem]">ECR · Tamil Nadu</span>
            </figcaption>
          </figure>
        </div>

        <div aria-hidden className="absolute right-6 bottom-10 hidden flex-col items-center gap-3 text-ivory/70 md:flex">
          <span className="eyebrow text-[0.6rem]">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/20">
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
        <p className="eyebrow mb-2 text-stone-deep">Reservations</p>
        <h2 id="mobile-booking-title" className="mb-2 font-display text-3xl text-ocean-deep">
          Plan your stay
        </h2>
        <BookingForm layout="panel" />
      </section>
    </>
  );
}
