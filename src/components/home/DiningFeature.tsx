import { dining } from "@/content/resort";
import { media } from "@/content/media";
import { Media } from "../media/Media";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { Eyebrow } from "../ui/Typography";

export function DiningFeature() {
  const known = dining.facts.filter((f) => f.status !== "unknown");
  return (
    <section aria-labelledby="dining-title" className="section-y">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-6 lg:col-start-1">
          <Reveal variant="mask">
            <Media media={media.dining} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] w-full sm:aspect-[5/4]" />
          </Reveal>
          <Reveal
            variant="mask"
            delay={0.2}
            className="absolute -right-3 -bottom-10 w-[42%] overflow-hidden rounded-[calc(var(--radius-media)+6px)] border-[6px] border-ivory shadow-[0_30px_60px_-30px_rgba(18,35,47,0.5)] sm:-right-8 lg:-right-16"
          >
            <Media media={media.diningPlate} sizes="22vw" className="aspect-square w-full" labelPosition="bottom-right" />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="pt-10 lg:col-span-5 lg:col-start-8 lg:pt-0">
          <Eyebrow className="mb-8">Dining</Eyebrow>
          <h2 id="dining-title" className="text-display-md text-ocean-deep">
            {dining.name}
          </h2>
          <p className="mt-6 text-lead text-ink/75">{dining.summary} Come in from the beach for lunch, or linger over dinner as the evening cools.</p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/12 pt-8">
            {known.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow text-stone-deep">{f.label}</dt>
                <dd className="mt-2 font-display text-xl text-ocean-deep">{f.value}</dd>
              </div>
            ))}
          </dl>
          <ArrowLink href="/dining" className="mt-10">Discover dining</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
