import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { heroVideo, media } from "@/content/media";
import { BookButton } from "../booking/BookingDrawer";
import { BookingForm } from "../booking/BookingForm";
import { HeroVideo } from "../media/HeroVideo";
import { Media } from "../media/Media";
import { ArrowDot, buttonClass } from "../ui/Button";

const videoSources = [process.env.NEXT_PUBLIC_HERO_VIDEO_URL, ...heroVideo.sources].filter(Boolean) as string[];

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="px-3 pt-3 md:px-6 md:pt-5">
      {/* Framed film: inset from the page edge with soft corners */}
      <div className="on-dark relative isolate flex min-h-[calc(100svh-1.5rem)] flex-col justify-end overflow-hidden rounded-[var(--radius-frame)] bg-ocean-deep text-ivory md:min-h-[calc(100svh-2.5rem)]">
        <HeroVideo poster={heroVideo.poster} sources={videoSources} className="-z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/25 to-ocean-deep/45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_90%,rgba(23,48,42,0.65),transparent_55%)]" />

        <div className="grid w-full items-end gap-10 px-6 pt-36 pb-16 md:px-12 md:pb-44 lg:grid-cols-12 lg:px-16 lg:pb-32">
          <div className="lg:col-span-8">
            <p
              className="rise-in inline-flex items-center gap-3 rounded-full border border-ivory/25 bg-ivory/10 px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-ivory/90 backdrop-blur-md"
              style={{ animationDelay: "150ms" }}
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sand" />
              Beachside resort · Mahabalipuram
            </p>
            <h1 id="hero-title" className="rise-in-solid mt-7 text-display-xl">
              Where the coast
              <span className="block italic text-sand">slows you down</span>
            </h1>
            <p className="rise-in mt-7 max-w-lg text-lead font-light text-ivory/85" style={{ animationDelay: "420ms" }}>
              Pool days, sea air and long evenings on the East Coast Road — in the temple town of Mamallapuram.
            </p>
            <div className="rise-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: "560ms" }}>
              <BookButton className={buttonClass("light", "pr-5")}>
                Book your stay <ArrowDot />
              </BookButton>
              <Link href="/experiences" className={buttonClass("outline-light")}>
                Discover the resort
              </Link>
            </div>
          </div>

          {/* Frosted destination card */}
          <aside className="rise-in hidden lg:col-span-4 lg:block" style={{ animationDelay: "700ms" }} aria-label="Discover Mahabalipuram">
            <Link
              href="/mahabalipuram"
              className="group ml-auto flex max-w-sm items-center gap-4 rounded-[1.5rem] border border-ivory/20 bg-ivory/10 p-3 pr-5 backdrop-blur-xl transition-colors hover:bg-ivory/20"
            >
              <Media media={media.shoreTemple} sizes="120px" className="aspect-square w-24 shrink-0 rounded-[1.1rem]" showLabel={false} />
              <span className="min-w-0">
                <span className="block text-[0.62rem] font-medium uppercase tracking-[0.24em] text-sand">Nearby</span>
                <span className="mt-1 block font-display text-xl leading-tight">Discover Mahabalipuram</span>
                <span className="mt-1 block text-xs text-ivory/70">UNESCO-listed monuments along the coast</span>
              </span>
              <ArrowUpRight aria-hidden className="ml-auto h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
          </aside>
        </div>
      </div>

      {/* White pill booking bar overlapping the frame's lower edge (outside the frame so dropdowns aren't clipped) */}
      <div className="relative z-20 mx-auto -mt-[7.5rem] hidden max-w-6xl px-6 md:block lg:-mt-11">
        <BookingForm layout="bar" />
      </div>

      {/* Phones: booking card below the frame */}
      <div className="relative z-20 -mt-6 px-3 md:hidden">
        <div className="rounded-[var(--radius-card)] bg-paper p-5 shadow-[0_24px_60px_-30px_rgba(23,48,42,0.5)] ring-1 ring-ink/5">
          <p className="eyebrow text-stone-deep">Reservations</p>
          <h2 className="mt-1 font-display text-3xl text-ocean-deep">Plan your stay</h2>
          <BookingForm layout="panel" />
        </div>
      </div>
    </section>
  );
}
