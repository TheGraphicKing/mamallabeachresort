import { Baby, Presentation, Snowflake, Trees, Umbrella, UtensilsCrossed, Waves, type LucideIcon } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

/** Facilities supported by public listings (see docs/CONTENT-VERIFICATION.md). */
const amenities: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Umbrella, title: "Beach access", body: "Walks along the Bay of Bengal, from first light to sunset." },
  { icon: Waves, title: "Outdoor pool", body: "Lengths in the morning, slow afternoons in the water." },
  { icon: Baby, title: "Children's pool", body: "A separate, shallower pool for younger guests." },
  { icon: UtensilsCrossed, title: "The Seagull", body: "Multi-cuisine lunch and dinner; buffets at weekends." },
  { icon: Trees, title: "The lawn", body: "Open-air space for weddings and evening gatherings." },
  { icon: Presentation, title: "Halls", body: "Banquet and conference halls for events and meetings." },
  { icon: Snowflake, title: "AC & non-AC rooms", body: "Choose the room that suits your stay." },
];

export function AmenitiesGrid() {
  return (
    <section aria-labelledby="amenities-title" className="section-y">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="At the resort"
              title={<span id="amenities-title">Everything close at hand</span>}
              lead="The essentials of an easy coastal stay, all on one property."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowLink href="/about" className="whitespace-nowrap">About the resort</ArrowLink>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {amenities.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={(i % 4) * 0.06}
              className="group rounded-[var(--radius-card)] bg-paper p-7 ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-tide)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(23,48,42,0.45)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ivory-deep text-ocean-deep transition-colors duration-500 group-hover:bg-ocean-deep group-hover:text-sand">
                <a.icon aria-hidden className="h-5 w-5" strokeWidth={1.4} />
              </span>
              <h3 className="mt-6 font-display text-2xl text-ocean-deep">{a.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/65">{a.body}</p>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.18} className="rounded-[var(--radius-card)] bg-ocean-deep p-7 text-ivory on-dark">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-sand">Planning a visit?</p>
            <p className="mt-4 font-display text-2xl leading-snug">Ask us anything about rooms, dining or events.</p>
            <ArrowLink href="/contact" light className="mt-6">Contact the resort</ArrowLink>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
