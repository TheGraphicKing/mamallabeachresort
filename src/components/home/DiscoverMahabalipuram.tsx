import Link from "next/link";
import { attractions } from "@/content/resort";
import { cn } from "@/lib/cn";
import { Media } from "../media/Media";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { Eyebrow } from "../ui/Typography";

/** Destination section: one tall lead image and a staggered column of monuments. */
export function DiscoverMahabalipuram() {
  const withMedia = attractions.filter((a) => a.media);
  const [lead, ...rest] = withMedia;
  return (
    <section aria-labelledby="discover-title" className="section-y on-dark overflow-hidden bg-ocean-deep text-ivory">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow light className="mb-8">Discover Mahabalipuram</Eyebrow>
            <h2 id="discover-title" className="text-display-lg">
              Thirteen centuries <em className="italic text-sand">of carved granite</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lead text-ivory/80">
              The Group of Monuments at Mahabalipuram is a UNESCO World Heritage Site — temples, rathas and rock reliefs
              carved under the Pallava kings, a short way from the resort along the coast.
            </p>
            <ArrowLink href="/mahabalipuram" light className="mt-8">Explore the town</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12 md:gap-8">
          <Reveal variant="mask" className="md:col-span-7">
            <Link href="/mahabalipuram" className="group block">
              <div className="overflow-hidden">
                <Media
                  media={lead.media!}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="aspect-[4/5] w-full md:aspect-[5/6]"
                  imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-6">
                <h3 className="font-display text-3xl md:text-4xl">{lead.name}</h3>
                <span className="eyebrow text-sand">01</span>
              </div>
              <p className="mt-3 max-w-lg text-ivory/70">{lead.description}</p>
            </Link>
          </Reveal>
          <div className="space-y-12 md:col-span-5 md:pt-24">
            {rest.map((a, i) => (
              <Reveal key={a.name} delay={0.08 * i} className={cn(i === 1 && "md:pl-12")}>
                <Link href="/mahabalipuram" className="group grid grid-cols-[42%_1fr] items-end gap-5">
                  <div className="overflow-hidden">
                    <Media
                      media={a.media!}
                      sizes="(min-width: 768px) 18vw, 40vw"
                      className="aspect-[3/4] w-full"
                      imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-tide)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="pb-1">
                    <span className="eyebrow text-sand">0{i + 2}</span>
                    <h3 className="mt-2 font-display text-2xl leading-tight">{a.name}</h3>
                    <p className="mt-2 text-sm text-ivory/65">{a.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
