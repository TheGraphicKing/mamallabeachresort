import { FinalCta } from "@/components/home/FinalCta";
import { Media } from "@/components/media/Media";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { FactList } from "@/components/ui/FactList";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { media } from "@/content/media";
import { attractions, facilities, fullAddress } from "@/content/resort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the Resort",
  description:
    "Mamalla Beach Resort is a beachside resort on the East Coast Road at Mahabalipuram (Mamallapuram), Tamil Nadu — rooms, pools, The Seagull restaurant and spaces for weddings and corporate events.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the resort"
        title={<>A coastal retreat in <em className="italic text-sand">the temple town</em></>}
        lead="On the East Coast Road at Mamallapuram, between the Bay of Bengal and the carved granite of the Pallavas."
        media={media.introPalms}
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow className="mb-8">Our place on the coast</Eyebrow>
            <h2 className="text-display-md text-ocean-deep">Simple pleasures, done well</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lead text-ink/80 lg:col-span-6 lg:col-start-7">
            <p>
              Mamalla Beach Resort is a place to slow down. Guests come for the beach and the pool, for meals at The Seagull,
              and for the easy pace of a town where sculptors still work granite by hand.
            </p>
            <p>
              It is also a place to gather. The resort&apos;s lawn and indoor halls host weddings, receptions and family
              celebrations, while companies come for meetings and team retreats away from the city.
            </p>
            <p className="text-base text-ink/60">{fullAddress}</p>
          </Reveal>
        </div>
      </section>

      <Reveal variant="mask">
        <Parallax className="relative aspect-[16/9] w-full md:aspect-[21/9]" strength={8}>
          <Media media={media.pool} sizes="100vw" className="h-full w-full" />
        </Parallax>
      </Reveal>

      <section className="section-y" aria-labelledby="facilities-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow="At the resort" title={<span id="facilities-title">What you&apos;ll find</span>} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <FactList facts={facilities} />
            <div className="mt-10 flex flex-wrap gap-8">
              <ArrowLink href="/rooms">Rooms</ArrowLink>
              <ArrowLink href="/dining">Dining</ArrowLink>
              <ArrowLink href="/explore">Explore the resort</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y on-dark bg-ocean-deep text-ivory" aria-labelledby="town-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              light
              eyebrow="Mahabalipuram"
              title={<span id="town-title">A town carved from stone</span>}
              lead="The Group of Monuments at Mahabalipuram — temples, rathas and rock reliefs created under the Pallava kings — is a UNESCO World Heritage Site."
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
              {attractions.slice(0, 4).map((a) => (
                <li key={a.name} className="py-6">
                  <p className="font-display text-2xl">{a.name}</p>
                  <p className="mt-2 text-ivory/70">{a.description}</p>
                </li>
              ))}
            </ul>
            <ArrowLink href="/experiences#mahabalipuram" light className="mt-10">More to explore</ArrowLink>
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
