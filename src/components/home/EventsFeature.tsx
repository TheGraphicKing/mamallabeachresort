import Link from "next/link";
import { media } from "@/content/media";
import { Media } from "../media/Media";
import { Reveal } from "../motion/Reveal";
import { SectionHeading } from "../ui/Typography";

const panels = [
  {
    href: "/weddings",
    eyebrow: "Weddings & celebrations",
    title: "Vows on the lawn, the sea close by",
    body: "Ceremonies, receptions and family celebrations — outdoors on the lawn, or in the banquet hall.",
    media: media.lawn,
  },
  {
    href: "/meetings",
    eyebrow: "Meetings & corporate",
    title: "Gather the team by the coast",
    body: "A conference hall, rooms and dining on one property for meetings, offsites and team outings.",
    media: media.hall,
  },
];

export function EventsFeature() {
  return (
    <section aria-labelledby="events-title" className="section-y on-dark mx-3 my-3 overflow-hidden rounded-[var(--radius-frame)] md:my-5 bg-ocean text-ivory md:mx-6">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Celebrate & gather"
            title={<span id="events-title">For the days that matter</span>}
            lead="From weddings to corporate retreats, our team will help you shape the occasion around the resort's lawn and halls."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          {panels.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.12} className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"}>
              <Link href={p.href} className="group block">
                <div className="overflow-hidden">
                  <Media
                    media={p.media}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={i === 0 ? "aspect-[4/3] w-full" : "aspect-[4/5] w-full"}
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow mt-7 text-sand">{p.eyebrow}</p>
                <h3 className="mt-3 text-display-sm">{p.title}</h3>
                <p className="mt-3 max-w-md text-ivory/75">{p.body}</p>
                <span className="eyebrow mt-6 inline-flex items-center gap-3">
                  <span className="link-underline pb-1">Explore & enquire</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
