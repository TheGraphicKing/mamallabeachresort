import Link from "next/link";
import { experiences } from "@/content/experiences";
import { media } from "@/content/media";
import { Media } from "../media/Media";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { Eyebrow } from "../ui/Typography";

/**
 * Three distinct compositions rather than a card grid:
 * 1. Sticky editorial column + stacked shore/pool stories
 * 2. Family / romance diptych
 * 3. Full-bleed Mahabalipuram heritage band
 */
export function ExperiencesEditorial() {
  const [beach, pool, , family, romance] = experiences;
  const heritage = experiences.find((e) => e.slug === "mahabalipuram")!;
  return (
    <section aria-labelledby="exp-title" className="pt-24 md:pt-36">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow className="mb-8">Experiences</Eyebrow>
              <h2 id="exp-title" className="text-display-md text-ocean-deep">
                Days shaped by <em className="italic text-seaglass-deep">sea and stone</em>
              </h2>
              <p className="mt-6 text-lead text-ink/75">
                No itinerary required. The resort gives you the shore, the water and the shade — Mahabalipuram gives you
                everything else.
              </p>
              <ArrowLink href="/experiences" className="mt-10">All experiences</ArrowLink>
            </Reveal>
          </div>
        </div>
        <div className="space-y-24 lg:col-span-7 lg:col-start-6">
          {[beach, pool].map((e, i) => (
            <article key={e.slug}>
              <Reveal variant="mask">
                <Link href={e.cta.href} className="group block overflow-hidden" tabIndex={-1} aria-hidden>
                  <Media
                    media={e.media}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className={i === 0 ? "aspect-[16/11] w-full" : "aspect-[4/5] w-full md:w-4/5 md:ml-auto"}
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                  />
                </Link>
              </Reveal>
              <Reveal delay={0.1} className={i === 1 ? "md:ml-auto md:w-4/5" : ""}>
                <p className="eyebrow mt-8 text-stone-deep">{e.eyebrow}</p>
                <h3 className="mt-3 text-display-sm text-ocean-deep">{e.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-ink/75">{e.body}</p>
                <ArrowLink href={e.cta.href} className="mt-6">{e.cta.label}</ArrowLink>
              </Reveal>
            </article>
          ))}
        </div>
      </div>

      {/* Diptych */}
      <div className="container-site mt-28 grid gap-6 md:mt-40 md:grid-cols-2 md:gap-4">
        {[family, romance].map((e, i) => (
          <Reveal key={e.slug} delay={i * 0.12}>
            <Link href={e.cta.href} className="group on-dark relative block aspect-[4/5] overflow-hidden text-ivory md:aspect-[5/6]">
              <Media
                media={e.media}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0"
                imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.05]"
                labelPosition="top-right"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/50 to-ocean-deep/5" />
              <span className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                <span className="eyebrow text-sand">{e.eyebrow}</span>
                <span className="mt-3 block font-display text-display-sm">{e.title}</span>
                <span className="mt-3 block max-w-md text-ivory/80">{e.body}</span>
                <span className="eyebrow mt-6 inline-flex items-center gap-3">
                  <span className="link-underline pb-1">{e.cta.label}</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Heritage band */}
      <div id="heritage" className="on-dark relative mt-28 overflow-hidden text-ivory md:mt-40">
        <Parallax className="absolute inset-0" strength={10}>
          <Media media={media.shoreTemple} sizes="100vw" className="h-full w-full" labelPosition="top-right" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ocean-deep/85 via-ocean-deep/45 to-transparent" />
        <div className="container-site relative py-32 md:py-48">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-sand">{heritage.eyebrow}</p>
            <h3 className="mt-5 text-display-md">{heritage.title}</h3>
            <p className="mt-6 text-lead text-ivory/85">{heritage.body}</p>
            <ArrowLink href={heritage.cta.href} light className="mt-10">{heritage.cta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
