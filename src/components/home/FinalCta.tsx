import Link from "next/link";
import { media } from "@/content/media";
import { BookButton } from "../booking/BookingDrawer";
import { Media } from "../media/Media";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { buttonClass } from "../ui/Button";

export function FinalCta({ title = "The coast is calling.", lead = "Choose your dates and tell us who's coming. We'll take care of the rest." }: { title?: string; lead?: string }) {
  return (
    <section aria-labelledby="final-cta-title" className="on-dark relative isolate overflow-hidden text-ivory">
      <Parallax className="absolute inset-0 -z-10" strength={10}>
        <Media media={media.dusk} sizes="100vw" className="h-full w-full" labelPosition="top-right" />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ocean-deep/60" />
      <div className="container-site flex min-h-[80svh] flex-col items-center justify-center py-32 text-center">
        <Reveal>
          <p className="eyebrow text-sand">Plan your stay</p>
          <h2 id="final-cta-title" className="mx-auto mt-6 max-w-4xl text-display-lg">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lead text-ivory/85">{lead}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <BookButton className={buttonClass("light")}>Check availability</BookButton>
            <Link href="/contact" className={buttonClass("outline-light")}>Contact the resort</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
