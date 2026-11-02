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
        <Reveal variant="mask" className="lg:col-span-6 lg:col-start-1">
          <Media media={media.dining} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[5/4] w-full" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
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
