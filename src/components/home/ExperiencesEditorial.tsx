import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experiences } from "@/content/experiences";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

/** Bento grid of experiences — mixed tile sizes, labels on frosted chips, circular arrow on hover. */
const layout: Record<string, string> = {
  beach: "md:col-span-4 md:row-span-2",
  pool: "md:col-span-2",
  family: "md:col-span-2",
  romance: "md:col-span-3",
  dining: "md:col-span-3",
};

export function ExperiencesEditorial() {
  const items = ["beach", "pool", "family", "romance", "dining"].map((slug) => experiences.find((e) => e.slug === slug)!);
  return (
    <section aria-labelledby="exp-title" className="section-y">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Experiences"
              title={<span id="exp-title">Days shaped by <em className="italic text-seaglass-deep">sea and stone</em></span>}
              lead="No itinerary required. The resort gives you the shore, the water and the shade."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowLink href="/experiences" className="whitespace-nowrap">All experiences</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[18rem] gap-3 md:auto-rows-[15rem] md:grid-cols-6 lg:auto-rows-[17rem] lg:gap-4">
          {items.map((e, i) => (
            <Reveal key={e.slug} variant="mask" delay={i * 0.06} className={layout[e.slug]}>
              <Link href={e.cta.href} className="group on-dark relative block h-full overflow-hidden rounded-[var(--radius-media)] text-ivory">
                <Media
                  media={e.media}
                  sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.06]"
                  labelPosition="top-right"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/10 to-transparent" />
                <span
                  aria-hidden
                  className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-paper/85 text-ocean-deep opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span className="inline-block rounded-full border border-ivory/25 bg-ivory/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] backdrop-blur-md">
                    {e.eyebrow}
                  </span>
                  <span className={cn("mt-3 block font-display leading-tight", i === 0 ? "text-3xl md:text-5xl" : "text-2xl")}>{e.title}</span>
                  {i === 0 && <span className="mt-3 hidden max-w-md text-ivory/80 md:block">{e.body}</span>}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
