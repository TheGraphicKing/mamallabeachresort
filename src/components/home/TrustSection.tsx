import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/content/experiences";
import { fullAddress, resort } from "@/content/resort";
import { Faq } from "../sections/Faq";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { CopyButton } from "../ui/CopyButton";
import { SectionHeading } from "../ui/Typography";

export function TrustSection() {
  const top = faqs.filter((f) => ["How do I book a room?", "Is my room confirmed when I send a reservation request?", "Is breakfast included?", "Where is the resort?"].includes(f.q));
  return (
    <section aria-labelledby="plan-title" className="section-y bg-ivory-deep">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading eyebrow="Plan your visit" title={<span id="plan-title">Finding us, and good to know</span>} />
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-12 space-y-8">
              <div>
                <dt className="eyebrow text-stone-deep">Where</dt>
                <dd className="mt-2 text-lg leading-relaxed">{fullAddress}</dd>
                <dd className="mt-2 flex flex-wrap items-center gap-x-6">
                  <a href={resort.maps.href} target="_blank" rel="noopener noreferrer" className="eyebrow inline-flex min-h-11 items-center gap-2 text-ocean">
                    <span className="link-underline pb-1">Get directions</span> <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                  <CopyButton text={fullAddress} />
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-stone-deep">Reservations</dt>
                <dd className="mt-2 text-lg">
                  <a href={resort.phone.href} className="link-underline">{resort.phone.display}</a>
                </dd>
                <dd className="text-lg">
                  <a href={resort.email.href} className="link-underline break-all">{resort.email.display}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-stone-deep">Guest reviews</dt>
                <dd className="mt-2 leading-relaxed text-ink/75">
                  We&apos;d rather you hear it from guests directly. Read independent reviews of the resort on Google.
                </dd>
                <dd className="mt-3">
                  <a href={resort.maps.reviewsHref} target="_blank" rel="noopener noreferrer" className="eyebrow inline-flex items-center gap-2 text-ocean link-underline pb-1">
                    Read reviews <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <Faq items={top} />
          <ArrowLink href="/faq" className="mt-10">All questions</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
