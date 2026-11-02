import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookButton } from "@/components/booking/BookingDrawer";
import { Gallery } from "@/components/gallery/Gallery";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink, buttonClass } from "@/components/ui/Button";
import { FactList } from "@/components/ui/FactList";
import { Notice } from "@/components/ui/Notice";
import { Eyebrow } from "@/components/ui/Typography";
import { resort } from "@/content/resort";
import { getRoom, rooms } from "@/content/rooms";
import { siteUrl } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return pageMetadata({ title: room.name, description: `${room.summary} At ${resort.name}, Mahabalipuram.`, path: `/rooms/${room.slug}` });
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();
  const others = rooms.filter((r) => r.slug !== room.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.summary,
    url: `${siteUrl}/rooms/${room.slug}`,
    containedInPlace: { "@id": `${siteUrl}/#resort` },
  };

  return (
    <>
      <PageHero
        eyebrow="Rooms & accommodation"
        title={room.name}
        lead={room.summary}
        media={room.hero}
        breadcrumbs={[
          { label: "Rooms", href: "/rooms" },
          { label: room.name, href: `/rooms/${room.slug}` },
        ]}
      >
        <BookButton className={buttonClass("light")}>Check availability</BookButton>
      </PageHero>

      <section className="section-y">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-8">The room</Eyebrow>
            <div className="space-y-6 text-lead text-ink/80">
              {room.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h2 className="mt-14 font-display text-3xl text-ocean-deep">Amenities</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a.label} className="flex items-center gap-3 border-b border-ink/10 pb-3">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass" /> {a.label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <aside className="lg:sticky lg:top-32" aria-labelledby="at-a-glance">
              <h2 id="at-a-glance" className="eyebrow mb-4 text-stone-deep">At a glance</h2>
              <FactList facts={room.facts} />
              <div className="mt-8 grid gap-3">
                <BookButton className={buttonClass("primary", "w-full")}>Check availability</BookButton>
                <a href={resort.phone.href} className={buttonClass("secondary", "w-full")}>Call {resort.phone.display}</a>
              </div>
              <Notice className="mt-8" title="To be confirmed by the resort">
                {room.pending.join(" · ")}. Ask us and we&apos;ll confirm before you book.
              </Notice>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-36" aria-labelledby="room-gallery">
        <div className="container-site">
          <h2 id="room-gallery" className="mb-10 text-display-sm text-ocean-deep">Gallery</h2>
          <Gallery items={room.gallery} filterable={false} />
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-y bg-ivory-deep" aria-labelledby="other-rooms">
          <div className="container-site">
            <h2 id="other-rooms" className="text-display-sm text-ocean-deep">Also consider</h2>
            <ul className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
              {others.map((o) => (
                <li key={o.slug} className="flex flex-col justify-between gap-4 py-8 md:flex-row md:items-center">
                  <div>
                    <p className="font-display text-3xl text-ocean-deep">{o.name}</p>
                    <p className="mt-2 max-w-xl text-ink/70">{o.summary}</p>
                  </div>
                  <ArrowLink href={`/rooms/${o.slug}`}>View room</ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
