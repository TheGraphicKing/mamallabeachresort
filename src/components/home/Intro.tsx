import { media } from "@/content/media";
import { Media } from "../media/Media";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { Eyebrow } from "../ui/Typography";

const notes = [
  { k: "The shore", v: "Beach access from the resort" },
  { k: "The water", v: "Outdoor pool & children's pool" },
  { k: "The table", v: "The Seagull, multi-cuisine" },
  { k: "The gatherings", v: "A lawn and indoor halls" },
];

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="section-y overflow-hidden">
      <div className="container-site grid items-start gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5 lg:pt-16">
          <Reveal>
            <Eyebrow className="mb-8">The resort</Eyebrow>
            <h2 id="intro-title" className="text-display-md text-ocean-deep">
              Leave the city on the coast road. <em className="italic text-seaglass-deep">Arrive somewhere slower.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-prose space-y-5 text-lead text-ink/75">
              <p>
                Mamalla Beach Resort sits on the East Coast Road at Mamallapuram, the town that Pallava sculptors
                carved out of granite thirteen centuries ago. Here, days follow the sea: an early walk on the sand,
                long afternoons by the pool, dinner as the light goes.
              </p>
              <p>For families, couples, wedding parties and teams alike, it is an easy escape from Chennai.</p>
            </div>
            <ArrowLink href="/about" className="mt-10">About the resort</ArrowLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <Reveal variant="mask">
            <Parallax className="relative aspect-[4/5] w-full md:aspect-[5/6]" strength={6}>
              <Media media={media.introPalms} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full" />
            </Parallax>
          </Reveal>
          <Reveal variant="mask" delay={0.2} className="absolute -bottom-12 -left-4 w-[46%] shadow-[0_40px_80px_-40px_rgba(18,35,47,0.6)] md:-left-16 lg:-left-24">
            <Media media={media.introStone} sizes="25vw" className="aspect-square w-full border-8 border-ivory" labelPosition="bottom-right" />
          </Reveal>
        </div>
      </div>

      <div className="container-site mt-28 md:mt-36">
        <dl className="grid grid-cols-2 border-t border-ink/12 lg:grid-cols-4">
          {notes.map((n, i) => (
            <Reveal key={n.k} delay={i * 0.08} className="border-b border-ink/12 py-8 pr-6 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <dt className="eyebrow text-stone-deep">{n.k}</dt>
              <dd className="mt-3 font-display text-2xl text-ocean-deep">{n.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
