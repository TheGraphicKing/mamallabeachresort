import { FinalCta } from "@/components/home/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { faqs } from "@/content/experiences";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common questions about booking, rooms, dining, events and getting to Mamalla Beach Resort in Mahabalipuram.",
  path: "/faq",
});

const order = ["Booking", "Stay", "Dining", "Events", "Getting here"] as const;

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero size="short" eyebrow="FAQs" title="Questions, answered" media={media.introStone} breadcrumbs={[{ label: "FAQs", href: "/faq" }]} />
      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <nav aria-label="FAQ categories" className="lg:col-span-3">
            <ul className="space-y-3 lg:sticky lg:top-32">
              {order.map((c) => (
                <li key={c}>
                  <a href={`#${c.toLowerCase().replace(/\s/g, "-")}`} className="eyebrow link-underline pb-1 text-ink/75 hover:text-ink">{c}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-8 lg:col-start-5">
            {order.map((c) => (
              <section key={c} id={c.toLowerCase().replace(/\s/g, "-")} className="scroll-mt-28" aria-labelledby={`faq-${c}`}>
                <h2 id={`faq-${c}`} className="mb-4 text-display-sm text-ocean-deep">{c}</h2>
                <Faq items={faqs.filter((f) => f.category === c)} />
              </section>
            ))}
            <ArrowLink href="/contact">Still have a question? Contact us</ArrowLink>
          </div>
        </div>
      </section>
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
