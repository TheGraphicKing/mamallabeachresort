import Link from "next/link";
import { heroVideo } from "@/content/media";
import { BookButton } from "../booking/BookingDrawer";
import { BookingForm } from "../booking/BookingForm";
import { HeroVideo } from "../media/HeroVideo";
import { buttonClass } from "../ui/Button";

const videoSources = [process.env.NEXT_PUBLIC_HERO_VIDEO_URL, ...heroVideo.sources].filter(Boolean) as string[];

export function HomeHero() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ocean-deep text-ivory"
      >
        <HeroVideo poster={heroVideo.poster} sources={videoSources} className="-z-20" />
        {/* Cinematic grade: soft top and bottom falloff + a gentle overall dim for type contrast */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-ocean-deep/30" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-deep/70 via-transparent to-ocean-deep/85" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,26,28,0.55)_100%)]" />

        <div className="container-site flex flex-1 flex-col items-center justify-center pt-36 pb-24 text-center md:pb-[17rem] lg:pb-56">
          <p className="eyebrow rise-in flex items-center gap-5 text-sand" style={{ animationDelay: "150ms" }}>
            <span aria-hidden className="hidden h-px w-10 bg-current opacity-70 sm:block" />
            Mahabalipuram · Tamil Nadu
            <span aria-hidden className="hidden h-px w-10 bg-current opacity-70 sm:block" />
          </p>
          <h1 id="hero-title" className="rise-in-solid mt-8 text-display-xl">
            Where the coast
            <span className="block italic text-sand">slows you down</span>
          </h1>
          <span aria-hidden className="rise-in mt-10 block h-14 w-px bg-sand/60" style={{ animationDelay: "380ms" }} />
          <p className="rise-in mt-8 max-w-lg text-lead font-light text-ivory/85" style={{ animationDelay: "460ms" }}>
            A beachside resort on the East Coast Road, in the temple town of Mamallapuram.
          </p>
          <div className="rise-in mt-10 flex flex-wrap justify-center gap-3" style={{ animationDelay: "600ms" }}>
            <BookButton className={buttonClass("light")}>Book your stay</BookButton>
            <Link href="/experiences" className={buttonClass("outline-light")}>
              Discover the resort
            </Link>
          </div>
        </div>

        <div aria-hidden className="absolute right-6 bottom-8 hidden flex-col items-center gap-3 text-ivory/70 md:bottom-auto md:top-1/2 md:flex md:-translate-y-1/2">
          <span className="eyebrow text-[0.58rem] [writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block h-14 w-px overflow-hidden bg-ivory/20">
            <span className="scroll-cue-line absolute inset-0 bg-ivory" />
          </span>
        </div>
      </section>

      {/* Smoked-glass booking bar, sitting over the bottom of the film (outside the hero so dropdowns aren't clipped) */}
      <section aria-label="Check availability" className="relative z-20 hidden md:block">
        <div className="container-site -mt-[15rem] lg:-mt-40">
          <BookingForm layout="bar" tone="dark" />
        </div>
        <div className="h-24 lg:h-16" aria-hidden />
      </section>

      {/* Compact booking panel on phones */}
      <section aria-labelledby="mobile-booking-title" className="on-dark bg-ocean-deep px-5 pt-10 pb-12 text-ivory md:hidden">
        <p className="eyebrow mb-2 text-sand">Reservations</p>
        <h2 id="mobile-booking-title" className="mb-2 font-display text-3xl">
          Plan your stay
        </h2>
        <BookingForm layout="panel" tone="dark" />
      </section>
    </>
  );
}
