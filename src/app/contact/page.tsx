import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Notice } from "@/components/ui/Notice";
import { media } from "@/content/media";
import { fullAddress, resort } from "@/content/resort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Location",
  description: `Contact Mamalla Beach Resort — ${fullAddress}. Phone ${resort.phone.display}. Directions via the East Coast Road (ECR) from Chennai.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        size="short"
        eyebrow="Contact & location"
        title="We'd love to hear from you"
        lead="Questions about rooms, dining or an event? Get in touch and our team will reply."
        media={media.coastSunset}
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <section className="section-y">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="space-y-10 lg:col-span-4">
            <div>
              <p className="eyebrow flex items-center gap-2 text-stone-deep"><MapPin aria-hidden className="h-4 w-4" /> Address</p>
              <address className="mt-3 text-lg not-italic leading-relaxed">{fullAddress}</address>
              <a href={resort.maps.href} target="_blank" rel="noopener noreferrer" className="eyebrow mt-4 inline-flex items-center gap-2 text-ocean link-underline pb-1">
                Get directions <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2 text-stone-deep"><Phone aria-hidden className="h-4 w-4" /> Phone</p>
              <a href={resort.phone.href} className="mt-3 block text-lg link-underline w-fit">{resort.phone.display}</a>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2 text-stone-deep"><Mail aria-hidden className="h-4 w-4" /> Email</p>
              <a href={resort.email.href} className="mt-3 block text-lg link-underline w-fit break-all">{resort.email.display}</a>
            </div>
            <div>
              <p className="eyebrow text-stone-deep">Getting here</p>
              <p className="mt-3 leading-relaxed text-ink/75">
                The resort is on the East Coast Road (ECR) at Mamallapuram. Most guests drive or take a taxi down the ECR
                from Chennai; the coast road passes through Kovalam on the way. Travel time depends on traffic — allow extra
                time at weekends.
              </p>
            </div>
            <Notice>Looking for event or reservation enquiries? Use the forms on <Link className="underline" href="/weddings#enquire">Weddings</Link>, <Link className="underline" href="/meetings#enquire">Meetings</Link> or <Link className="underline" href="/book">Reservations</Link>.</Notice>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="mb-10 text-display-sm text-ocean-deep">Send us a message</h2>
            <EnquiryForm kind="contact" submitLabel="Send message" />
          </div>
        </div>
      </section>
      <section aria-label="Map" className="border-t border-ink/10">
        <a
          href={resort.maps.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group on-dark relative flex min-h-[40svh] items-center justify-center overflow-hidden bg-ocean-deep text-ivory"
        >
          <svg aria-hidden className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
            <path d="M560,0 C540,120 600,220 570,400 L800,400 L800,0 Z" fill="#4f7468" />
            <path d="M0,200 C200,180 400,230 560,200" stroke="#e5d7bf" strokeWidth="2" fill="none" strokeDasharray="8 8" />
            <path d="M300,0 C320,120 280,260 320,400" stroke="#e5d7bf" strokeWidth="6" fill="none" />
            <circle cx="520" cy="205" r="8" fill="#a85a36" />
          </svg>
          <span className="relative flex flex-col items-center gap-3 text-center">
            <span className="eyebrow text-sand">Mamallapuram · Tamil Nadu</span>
            <span className="font-display text-3xl md:text-4xl">Open in Google Maps</span>
            <span className="eyebrow inline-flex items-center gap-2">Directions <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
          </span>
        </a>
      </section>
    </>
  );
}
