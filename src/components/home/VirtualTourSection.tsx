import { resort } from "@/content/resort";
import { virtualTourUrl } from "@/lib/config";
import { TourEmbed } from "../explore/TourEmbed";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

/** The resort's own 360° photo sphere from Google Maps, loaded on demand. */
export function VirtualTourSection() {
  return (
    <section aria-labelledby="tour-title" className="section-y pt-0 md:pt-0">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="360° view"
              title={
                <span id="tour-title">
                  Step inside <em className="italic text-seaglass-deep">before you arrive</em>
                </span>
              }
              lead="Look around the resort in 360°. Drag to turn, scroll or pinch to zoom."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowLink href="/explore" className="whitespace-nowrap">Map & more</ArrowLink>
          </Reveal>
        </div>
        <Reveal variant="mask" className="mt-12">
          <TourEmbed url={virtualTourUrl} externalUrl={resort.virtualTour.mapsUrl} aspect="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" />
        </Reveal>
      </div>
    </section>
  );
}
