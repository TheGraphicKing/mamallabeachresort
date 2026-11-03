import { ResortMap } from "../explore/ResortMap";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

export function ExploreTeaser() {
  return (
    <section aria-labelledby="explore-title" className="section-y on-dark mx-3 my-3 overflow-hidden rounded-[var(--radius-frame)] md:my-5 bg-ocean-deep text-ivory md:mx-6">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              light
              eyebrow="Explore"
              title={<span id="explore-title">Find your way around</span>}
              lead="Select a place on the illustrated map to see what you'll find there — then step inside with the virtual tour."
            />
            <ArrowLink href="/explore" light className="mt-10">Virtual tour & full map</ArrowLink>
          </Reveal>
        </div>
        <Reveal className="mt-14" delay={0.1}>
          <ResortMap tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
