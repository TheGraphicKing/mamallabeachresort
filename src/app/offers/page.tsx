import { FinalCta } from "@/components/home/FinalCta";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { media } from "@/content/media";
import { resort } from "@/content/resort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Offers & Packages",
  description:
    "Ask about current stay offers, meal plans and packages for families, couples, groups and corporate guests at Mamalla Beach Resort, Mahabalipuram.",
  path: "/offers",
});

const asks = [
  { t: "Family stays", b: "Room combinations, children's pool days and meal plans for the whole family.", href: "/experiences#family" },
  { t: "Couples & occasions", b: "Anniversaries, honeymoons and quiet weekends by the sea.", href: "/experiences#romance" },
  { t: "Group & wedding stays", b: "Rooms for wedding guests and family groups travelling together.", href: "/weddings" },
  { t: "Corporate & team stays", b: "Day outings, offsites and delegate accommodation.", href: "/meetings" },
];

export default function OffersPage() {
  return (
    <>
      <PageHero
        size="short"
        eyebrow="Offers & packages"
        title="Ask us about this season"
        lead="Rates, meal plans and packages change with the season. Tell us your plans and we'll share what's available for your dates."
        media={media.pool}
        breadcrumbs={[{ label: "Offers", href: "/offers" }]}
      />
      <section className="section-y">
        <div className="container-site">
          <Notice title="No offers are published right now" className="max-w-3xl">
            We only list offers once their prices and terms are confirmed. For the best available rate, send a request
            below or call {resort.phone.display}.
          </Notice>
          <ul className="mt-16 grid border-t border-ink/12 md:grid-cols-2">
            {asks.map((a, i) => (
              <Reveal as="li" key={a.t} delay={(i % 2) * 0.08} className="border-b border-ink/12 py-10 md:odd:pr-12 md:even:border-l md:even:pl-12">
                <p className="eyebrow text-stone-deep">Ask about</p>
                <h2 className="mt-3 font-display text-3xl text-ocean-deep">{a.t}</h2>
                <p className="mt-3 text-ink/70">{a.b}</p>
                <ArrowLink href={a.href} className="mt-6">Learn more</ArrowLink>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="pb-24 md:pb-36" aria-labelledby="offer-form">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="offer-form" className="text-display-sm text-ocean-deep">Request a quote</h2>
            <p className="mt-4 text-ink/75">Share your dates and who&apos;s travelling. We&apos;ll reply with current rates and any applicable offers.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm kind="reservation" submitLabel="Request a quote" />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
