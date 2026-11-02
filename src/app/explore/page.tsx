import { FinalCta } from "@/components/home/FinalCta";
import { ResortMap } from "@/components/explore/ResortMap";
import { TourEmbed } from "@/components/explore/TourEmbed";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/Typography";
import { media } from "@/content/media";
import { virtualTourUrl } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Virtual Tour & Resort Map",
  description:
    "Explore Mamalla Beach Resort before you arrive — a 360° virtual tour and an interactive map of the beach, pools, rooms, The Seagull restaurant, lawn and halls.",
  path: "/explore",
});

export default function ExplorePage() {
  return (
    <>
      <PageHero
        eyebrow="Explore the resort"
        title={<>Look around <em className="italic text-sand">before you arrive</em></>}
        lead="Step inside with the 360° tour, then find your way around the beach, pools, rooms, restaurant and event spaces."
        media={media.gardens}
        breadcrumbs={[{ label: "Explore", href: "/explore" }]}
      />
      <section className="section-y" aria-labelledby="tour-title">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="360° virtual tour"
              title={<span id="tour-title">Step inside</span>}
              lead="The tour loads only when you start it, so this page stays quick on mobile data."
            />
          </Reveal>
          <div className="mt-12">
            <TourEmbed url={virtualTourUrl} />
          </div>
        </div>
      </section>
      <section className="section-y on-dark bg-ocean-deep text-ivory" aria-labelledby="map-title">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Resort map"
              title={<span id="map-title">Find your way around</span>}
              lead="Select a numbered point to see what's there, with links to rooms, dining and events."
            />
          </Reveal>
          <div className="mt-14">
            <ResortMap tone="dark" />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
