import type { ReactNode } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Media } from "@/components/media/Media";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { SectionHeading } from "@/components/ui/Typography";
import { events, resort } from "@/content/resort";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/cn";

interface Occasion {
  title: string;
  body: string;
}

/** Shared body for the Weddings and Meetings landing pages. */
export function EventLanding({
  intro,
  occasions,
  occasionsTitle,
  spaceOrder,
  feature,
  eventTypes,
  formTitle,
  formLead,
  crossLink,
}: {
  intro: { eyebrow: string; title: ReactNode; body: ReactNode };
  occasions: Occasion[];
  occasionsTitle: string;
  spaceOrder: string[];
  feature: MediaAsset;
  eventTypes: readonly string[];
  formTitle: string;
  formLead: string;
  crossLink: { href: string; label: string };
}) {
  const spaces = spaceOrder.map((n) => events.spaces.find((s) => s.name === n)!).filter(Boolean);
  return (
    <>
      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={intro.eyebrow} title={intro.title} />
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lead text-ink/80 lg:col-span-6 lg:col-start-7">
            {intro.body}
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-36" aria-labelledby="occasions-title">
        <div className="container-site">
          <h2 id="occasions-title" className="eyebrow mb-8 text-stone-deep">{occasionsTitle}</h2>
          <ol className="grid border-t border-ink/12 md:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 3) * 0.08} className="border-b border-ink/12 py-8 md:pr-10">
                <p className="font-display text-lg text-brass-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl text-ocean-deep md:text-3xl">{o.title}</h3>
                <p className="mt-3 text-ink/70">{o.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y on-dark mx-3 my-3 overflow-hidden rounded-[var(--radius-frame)] md:my-5 bg-ocean-deep text-ivory md:mx-6" aria-labelledby="venues-title">
        <div className="container-site">
          <Reveal>
            <SectionHeading light eyebrow="Venues" title={<span id="venues-title">Spaces at the resort</span>} lead={events.capacityNote} />
          </Reveal>
          <div className="mt-16 space-y-20">
            {spaces.map((s, i) => (
              <article key={s.name} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <Reveal variant="mask" className={cn("md:col-span-7", i % 2 === 1 && "md:order-2 md:col-start-6")}>
                  <Media media={s.media} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/10] w-full" />
                </Reveal>
                <Reveal delay={0.1} className={cn("md:col-span-4", i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
                  <p className="eyebrow text-sand">{s.kind}</p>
                  <h3 className="mt-3 text-display-sm">{s.name}</h3>
                  <p className="mt-4 text-ivory/75">{s.body}</p>
                  <dl className="mt-6 border-t border-ivory/15 pt-4 text-sm">
                    <dt className="eyebrow text-sand">Capacity</dt>
                    <dd className="mt-1 italic text-ivory/70">Confirmed on enquiry for your layout</dd>
                  </dl>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Reveal variant="mask" className="px-3 pt-16 md:px-6 md:pt-24">
        <Media media={feature} sizes="100vw" className="aspect-[16/9] w-full rounded-[var(--radius-frame)] md:aspect-[21/8]" />
      </Reveal>

      <section id="enquire" className="section-y scroll-mt-24" aria-labelledby="enquire-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 id="enquire-title" className="text-display-md text-ocean-deep">{formTitle}</h2>
              <p className="mt-5 text-ink/75">{formLead}</p>
              <dl className="mt-10 space-y-5 text-sm">
                <div>
                  <dt className="eyebrow text-stone-deep">Call</dt>
                  <dd className="mt-1"><a href={resort.phone.href} className="link-underline text-lg">{resort.phone.display}</a></dd>
                </div>
                <div>
                  <dt className="eyebrow text-stone-deep">Email</dt>
                  <dd className="mt-1"><a href={resort.email.href} className="link-underline break-all text-lg">{resort.email.display}</a></dd>
                </div>
              </dl>
              <Notice className="mt-10">Rates, packages and availability are shared by our events team in reply to your enquiry.</Notice>
              <ArrowLink href={crossLink.href} className="mt-10">{crossLink.label}</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm kind="event" eventTypes={eventTypes} submitLabel="Send event enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
