import Link from "next/link";
import { FinalCta } from "@/components/home/FinalCta";
import { Media } from "@/components/media/Media";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { SectionHeading } from "@/components/ui/Typography";
import { experiences } from "@/content/experiences";
import { media } from "@/content/media";
import { attractions } from "@/content/resort";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experiences & Activities",
  description:
    "Beach mornings, pool afternoons, family holidays, romantic escapes and the UNESCO-listed monuments of Mahabalipuram — experiences at and around Mamalla Beach Resort.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  const atResort = experiences.filter((e) => e.slug !== "mahabalipuram");
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title={<>Sea, sand <em className="italic text-sand">and stone</em></>}
        lead="Unhurried days at the resort, and a thirteen-century-old town on the doorstep."
        media={media.coastSunset}
        breadcrumbs={[{ label: "Experiences", href: "/experiences" }]}
      />

      <nav aria-label="On this page" className="sticky top-0 z-30 hidden border-b border-ink/10 bg-ivory/95 backdrop-blur md:block">
        <ul className="container-site flex gap-8 overflow-x-auto py-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink/70">
          {experiences.map((e) => (
            <li key={e.slug} className="shrink-0">
              <a href={`#${e.slug}`} className="link-underline hover:text-ink">{e.eyebrow}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="section-y space-y-28 md:space-y-40">
        {atResort.map((e, i) => {
          const wide = i % 3 === 0;
          return (
            <section key={e.slug} id={e.slug} aria-labelledby={`${e.slug}-t`} className="scroll-mt-24">
              <div className={cn("container-site grid items-center gap-10 lg:grid-cols-12", !wide && "lg:gap-16")}>
                <Reveal
                  variant="mask"
                  className={cn(
                    wide ? "lg:col-span-12" : "lg:col-span-6",
                    !wide && i % 2 === 0 && "lg:order-2",
                  )}
                >
                  <Media
                    media={e.media}
                    sizes={wide ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
                    className={wide ? "aspect-[16/9] w-full md:aspect-[21/9]" : "aspect-[4/5] w-full"}
                  />
                </Reveal>
                <Reveal delay={0.1} className={cn(wide ? "lg:col-span-6 lg:col-start-2" : "lg:col-span-5", !wide && i % 2 === 0 && "lg:col-start-1")}>
                  <p className="eyebrow text-stone-deep">{e.eyebrow}</p>
                  <h2 id={`${e.slug}-t`} className="mt-4 text-display-md text-ocean-deep">{e.title}</h2>
                  <p className="mt-6 text-lead text-ink/75">{e.body}</p>
                  {e.details && (
                    <ul className="mt-6 space-y-2 text-ink/75">
                      {e.details.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brass" /> {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ArrowLink href={e.cta.href} className="mt-8">{e.cta.label}</ArrowLink>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <section id="mahabalipuram" className="section-y scroll-mt-24 on-dark mx-3 my-3 overflow-hidden rounded-[var(--radius-frame)] md:my-5 bg-ocean-deep text-ivory md:mx-6" aria-labelledby="mb-title">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                light
                eyebrow="Nearby"
                title={<span id="mb-title">Mahabalipuram, on your doorstep</span>}
                lead="The Group of Monuments at Mahabalipuram is a UNESCO World Heritage Site. Early mornings and late afternoons are the gentlest times to explore."
              />
            </Reveal>
            <Reveal variant="mask" delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <Media media={media.shoreTemple} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
          <ol className="mt-16 grid gap-px bg-ivory/12 md:grid-cols-2 lg:grid-cols-3">
            {attractions.map((a, i) => (
              <li key={a.name} className="bg-ocean-deep p-8">
                <p className="font-display text-lg text-sand">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-2xl">{a.name}</h3>
                <p className="mt-3 text-ivory/70">{a.description}</p>
              </li>
            ))}
          </ol>
          <Notice className="mt-12 !bg-ivory/5 !text-ivory/80">
            Visiting hours and ticketing for the monuments are set by the Archaeological Survey of India. Please check
            current timings before you go — our front desk can help.
          </Notice>
          <p className="mt-10">
            <Link href="/mahabalipuram" className="eyebrow link-underline text-sand">Discover Mahabalipuram →</Link>
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
