import Link from "next/link";
import { rooms } from "@/content/rooms";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

export function RoomsShowcase() {
  return (
    <section aria-labelledby="rooms-title" className="section-y bg-ivory-deep">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Stay"
              title={<span id="rooms-title">Rooms to return to</span>}
              lead="Two categories of room, each a calm base for days spent between the pool, the sand and the temples."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowLink href="/rooms">All rooms</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {rooms.map((room, i) => (
            <article key={room.slug} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
              <Reveal variant="mask" className={cn("md:col-span-7", i % 2 === 1 && "md:order-2 md:col-start-6")}>
                <Link href={`/rooms/${room.slug}`} className="group block overflow-hidden" aria-label={`${room.name} — view details`}>
                  <Media
                    media={room.hero}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                  />
                </Link>
              </Reveal>
              <Reveal delay={0.12} className={cn("md:col-span-4", i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
                <p className="eyebrow text-stone-deep">0{i + 1} / 0{rooms.length}</p>
                <h3 className="mt-4 text-display-sm text-ocean-deep">
                  <Link href={`/rooms/${room.slug}`} className="link-underline">{room.name}</Link>
                </h3>
                <p className="mt-5 leading-relaxed text-ink/75">{room.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
                  {room.facts
                    .filter((f) => f.status !== "unknown")
                    .map((f) => (
                      <li key={f.label} className="flex items-center gap-2">
                        <span aria-hidden className="h-1 w-1 rounded-full bg-brass" />
                        {f.value}
                      </li>
                    ))}
                </ul>
                <ArrowLink href={`/rooms/${room.slug}`} className="mt-8">Discover the room</ArrowLink>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
