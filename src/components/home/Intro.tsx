import { media } from "@/content/media";
import { Media } from "../media/Media";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { LinkButton } from "../ui/Button";
import { Eyebrow } from "../ui/Typography";

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
            <LinkButton href="/about" variant="secondary" className="mt-10">Our story</LinkButton>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <Reveal variant="mask">
            <Parallax className="media-bleed relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-media)] md:aspect-[5/6]" strength={6}>
              <Media media={media.introPalms} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full" />
            </Parallax>
          </Reveal>
          <Reveal variant="mask" delay={0.2} className="absolute -bottom-12 left-0 w-[46%] shadow-[0_40px_80px_-40px_rgba(18,35,47,0.6)] md:-left-16 lg:-left-24">
            <Media media={media.poolLoungers} sizes="25vw" className="aspect-square w-full border-8 border-ivory" labelPosition="bottom-right" />
          </Reveal>
        </div>
      </div>

    </section>
  );
}
