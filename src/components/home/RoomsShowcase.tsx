import Link from "next/link";
import { rooms } from "@/content/rooms";
import { BookButton } from "../booking/BookingDrawer";
import { Media } from "../media/Media";
import { Reveal } from "../motion/Reveal";
import { ArrowDot, ArrowLink, buttonClass } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

/** Large rounded room cards with fact chips — no prices or unverified features. */
export function RoomsShowcase() {
  return (
    <section aria-labelledby="rooms-title" className="section-y bg-ivory-deep">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Stay"
              title={<span id="rooms-title">Rooms to return to</span>}
              lead="Two categories of room — a calm base for days between the pool, the sand and the temples."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowLink href="/rooms" className="whitespace-nowrap">All rooms</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {rooms.map((room, i) => {
            const chips = room.facts.filter((f) => f.status !== "unknown").map((f) => f.value);
            return (
              <Reveal as="article" key={room.slug} delay={i * 0.12} className="group rounded-[var(--radius-frame)] bg-paper p-3 ring-1 ring-ink/5">
                <Link href={`/rooms/${room.slug}`} className="relative block" tabIndex={-1} aria-hidden>
                  <Media
                    media={room.hero}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.05]"
                  />
                  <ul className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {chips.map((c) => (
                      <li key={c} className="rounded-full bg-paper/85 px-3 py-1.5 text-[0.7rem] text-ink backdrop-blur-md">
                        {c}
                      </li>
                    ))}
                  </ul>
                </Link>
                <div className="flex flex-col gap-6 px-4 pt-7 pb-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[0.66rem] font-medium uppercase tracking-[0.24em] text-stone-deep">Room 0{i + 1}</p>
                    <h3 className="mt-2 font-display text-3xl text-ocean-deep md:text-4xl">
                      <Link href={`/rooms/${room.slug}`} className="link-underline">{room.name}</Link>
                    </h3>
                    <p className="mt-3 max-w-md text-ink/70">{room.summary}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link href={`/rooms/${room.slug}`} className={buttonClass("secondary", "px-5")}>Details</Link>
                    <BookButton className={buttonClass("primary", "pr-5")}>
                      Book <ArrowDot />
                    </BookButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
