import { FinalCta } from "@/components/home/FinalCta";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Media } from "@/components/media/Media";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { FactList } from "@/components/ui/FactList";
import { Notice } from "@/components/ui/Notice";
import { Eyebrow } from "@/components/ui/Typography";
import { media } from "@/content/media";
import { dining, resort } from "@/content/resort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dining at The Seagull",
  description:
    "The Seagull is the multi-cuisine restaurant at Mamalla Beach Resort, Mahabalipuram — lunch and dinner close to the beach, with buffet spreads at weekends.",
  path: "/dining",
});

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Dining"
        title={<>The Seagull, <em className="italic text-sand">by the sea</em></>}
        lead={dining.summary}
        media={media.dining}
        breadcrumbs={[{ label: "Dining", href: "/dining" }]}
      />
      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-8">The restaurant</Eyebrow>
            <h2 className="text-display-md text-ocean-deep">Unhurried meals, close to the water</h2>
            <div className="mt-8 space-y-5 text-lead text-ink/75">
              <p>
                The Seagull is the resort&apos;s own multi-cuisine restaurant. Come in from the beach or the pool for lunch, and
                return in the evening for dinner when the air cools.
              </p>
              <p>At weekends, the restaurant serves buffet spreads — a relaxed way for families and groups to eat together.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <h2 className="eyebrow mb-4 text-stone-deep">At a glance</h2>
            <FactList facts={dining.facts} />
            <Notice className="mt-8">
              We don&apos;t publish menus, timings or meal-plan prices until the resort confirms them. Ask us — we&apos;ll share
              current details with your quote.
            </Notice>
          </Reveal>
        </div>
      </section>

      <Reveal variant="mask" className="container-site">
        <div className="grid gap-4 md:grid-cols-3">
          <Media media={media.dining} className="aspect-[4/5] md:col-span-2 md:aspect-[16/10]" sizes="(min-width: 768px) 66vw, 100vw" />
          <Media media={media.dusk} className="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      </Reveal>

      <section className="section-y" aria-labelledby="dining-enquiry">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="dining-enquiry" className="text-display-sm text-ocean-deep">Dining enquiries</h2>
            <p className="mt-4 text-ink/75">
              Planning a group meal, a special-occasion dinner or have dietary requirements? Send us a note or call{" "}
              <a href={resort.phone.href} className="underline underline-offset-2">{resort.phone.display}</a>.
            </p>
            <ArrowLink href="/weddings" className="mt-8">Celebration dining & events</ArrowLink>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm kind="contact" defaults={{ message: "" }} submitLabel="Send dining enquiry" />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
