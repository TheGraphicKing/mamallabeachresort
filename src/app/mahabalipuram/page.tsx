import { ArrowUpRight } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { Media } from "@/components/media/Media";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { Eyebrow } from "@/components/ui/Typography";
import { media } from "@/content/media";
import { attractions, fullAddress, resort } from "@/content/resort";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Discover Mahabalipuram",
  description:
    "The Shore Temple, Pancha Rathas, Arjuna's Penance and more — the UNESCO-listed Group of Monuments at Mahabalipuram, close to Mamalla Beach Resort on the East Coast Road.",
  path: "/mahabalipuram",
});

export default function MahabalipuramPage() {
  const featured = attractions.filter((a) => a.media);
  const more = attractions.filter((a) => !a.media);
  return (
    <>
      <PageHero
        eyebrow="Discover Mahabalipuram"
        title={<>A town carved <em className="italic text-sand">from the shore</em></>}
        lead="Mamallapuram's temples, rathas and rock reliefs were cut from granite under the Pallava kings. Today they form a UNESCO World Heritage Site, a short way from the resort."
        media={media.shoreTemple}
        breadcrumbs={[{ label: "Mahabalipuram", href: "/mahabalipuram" }]}
      />

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow className="mb-8">The temple town</Eyebrow>
            <h2 className="text-display-md text-ocean-deep">Stone, sea and the slow pace of the coast</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lead text-ink/80 lg:col-span-6 lg:col-start-7">
            <p>
              The Group of Monuments at Mahabalipuram was inscribed on the UNESCO World Heritage List for its Pallava-era
              rock-cut architecture. Sculptors in the town still work granite by hand, and their workshops line the streets.
            </p>
            <p className="text-base text-ink/65">
              Early mornings and late afternoons are the gentlest times to explore. Visiting hours and tickets for the
              monuments are set by the Archaeological Survey of India — please check current timings before you go.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="space-y-24 pb-24 md:space-y-36 md:pb-36">
        {featured.map((a, i) => (
          <article key={a.name} className="container-site grid items-center gap-8 md:grid-cols-12 md:gap-12" aria-labelledby={`att-${i}`}>
            <Reveal variant="mask" className={cn(i % 2 === 0 ? "md:col-span-7" : "md:order-2 md:col-span-6 md:col-start-7")}>
              <Media
                media={a.media!}
                sizes="(min-width: 768px) 58vw, 100vw"
                className={i % 2 === 0 ? "aspect-[4/3] w-full" : "aspect-[4/5] w-full"}
              />
            </Reveal>
            <Reveal delay={0.1} className={cn(i % 2 === 0 ? "md:col-span-4 md:col-start-9" : "md:order-1 md:col-span-4 md:col-start-2")}>
              <p className="font-display text-xl text-brass-deep">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`att-${i}`} className="mt-3 text-display-sm text-ocean-deep">{a.name}</h2>
              <p className="mt-5 leading-relaxed text-ink/75">{a.description}</p>
            </Reveal>
          </article>
        ))}
      </div>

      <section className="on-dark relative mx-3 overflow-hidden rounded-[var(--radius-frame)] text-ivory md:mx-6" aria-labelledby="more-title">
        <Parallax className="media-bleed absolute inset-0" strength={8}>
          <Media media={media.romance} sizes="100vw" className="h-full w-full" labelPosition="top-right" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-ocean-deep/75" />
        <div className="container-site relative grid gap-12 py-28 md:py-40 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow light className="mb-6">Also nearby</Eyebrow>
            <h2 id="more-title" className="text-display-md">More to find along the coast</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
              {more.map((a) => (
                <li key={a.name} className="py-7">
                  <h3 className="font-display text-2xl">{a.name}</h3>
                  <p className="mt-2 text-ivory/75">{a.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y" aria-labelledby="getting-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="getting-title" className="text-display-sm text-ocean-deep">Staying at Mamalla</h2>
            <p className="mt-5 text-ink/75">
              The resort is on the East Coast Road at Mamallapuram, so the monuments, the beach and the town&apos;s stone-carving
              workshops are all close at hand. Our front desk can help you plan your day.
            </p>
            <ArrowLink href="/rooms" className="mt-8">See the rooms</ArrowLink>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <address className="font-display text-2xl not-italic leading-snug text-ocean-deep md:text-3xl">{fullAddress}</address>
            <a
              href={resort.maps.href}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-6 inline-flex min-h-11 items-center gap-2 text-ocean"
            >
              <span className="link-underline pb-1">Open in Google Maps</span> <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
            <Notice className="mt-8">
              We don&apos;t publish distances or travel times until they&apos;re confirmed. Ask our team for the easiest way to
              reach each site from the resort.
            </Notice>
          </Reveal>
        </div>
      </section>
      <FinalCta title="Stay by the shore. Explore the stone." />
    </>
  );
}
