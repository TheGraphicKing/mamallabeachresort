import Link from "next/link";
import { FinalCta } from "@/components/home/FinalCta";
import { Media } from "@/components/media/Media";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { FactList } from "@/components/ui/FactList";
import { Notice } from "@/components/ui/Notice";
import { media } from "@/content/media";
import { facilities } from "@/content/resort";
import { rooms } from "@/content/rooms";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rooms & Accommodation",
  description:
    "Standard and Deluxe rooms at Mamalla Beach Resort, Mahabalipuram — air-conditioned and non-AC options, steps from the outdoor pool and the beach on the East Coast Road.",
  path: "/rooms",
});

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Rooms & accommodation"
        title={<>Rest easy, <em className="italic text-sand">close to the shore</em></>}
        lead="Two categories of room, with air-conditioned and non-AC options — a calm base for pool days, beach walks and evenings in Mahabalipuram."
        media={media.roomDeluxe}
        breadcrumbs={[{ label: "Rooms", href: "/rooms" }]}
      />

      <section className="section-y">
        <div className="container-site space-y-28 md:space-y-40">
          {rooms.map((room, i) => (
            <article key={room.slug} className="grid gap-10 lg:grid-cols-12 lg:gap-14" aria-labelledby={`${room.slug}-title`}>
              <Reveal variant="mask" className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                <Link href={`/rooms/${room.slug}`} className="group block overflow-hidden" tabIndex={-1} aria-hidden>
                  <Media
                    media={room.hero}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                  />
                </Link>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-5">
                <p className="eyebrow text-stone-deep">Room 0{i + 1}</p>
                <h2 id={`${room.slug}-title`} className="mt-4 text-display-md text-ocean-deep">
                  {room.name}
                </h2>
                <p className="mt-5 text-lead text-ink/75">{room.summary}</p>
                <FactList facts={room.facts} className="mt-8" />
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <ArrowLink href={`/rooms/${room.slug}`}>Room details</ArrowLink>
                  <ArrowLink href={`/book?room=${encodeURIComponent(room.name)}`}>Request this room</ArrowLink>
                </div>
              </Reveal>
            </article>
          ))}
          <Notice title="Why some details say “confirmed on enquiry”">
            We only publish room details we can verify. Occupancy, bed configurations and in-room amenities that aren&apos;t
            listed here will be confirmed by our team when you enquire — and added to this page as soon as they&apos;re
            confirmed.
          </Notice>
        </div>
      </section>

      <section className="section-y bg-ivory-deep" aria-labelledby="included-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="included-title" className="text-display-md text-ocean-deep">Every stay includes the resort</h2>
            <p className="mt-6 text-ink/75">Wherever you sleep, the pool, the beach and The Seagull are part of your stay.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <FactList facts={facilities} />
          </Reveal>
        </div>
      </section>
      <FinalCta title="Find the right room for your dates." />
    </>
  );
}
