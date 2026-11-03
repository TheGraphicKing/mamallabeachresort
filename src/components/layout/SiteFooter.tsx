import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, nav, resort } from "@/content/resort";
import { rooms } from "@/content/rooms";
import { BookButton } from "../booking/BookingDrawer";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const columns = [
    { title: "Stay", links: [...rooms.map((r) => ({ label: r.name, href: `/rooms/${r.slug}` })), { label: "All rooms", href: "/rooms" }, { label: "Offers & packages", href: "/offers" }] },
    { title: "Experiences", links: [{ label: "Experiences", href: "/experiences" }, { label: "Dining", href: "/dining" }, { label: "Virtual tour & map", href: "/explore" }, { label: "Gallery", href: "/gallery" }, { label: "About the resort", href: "/about" }] },
    { title: "Celebrate", links: [{ label: "Weddings & celebrations", href: "/weddings" }, { label: "Meetings & corporate", href: "/meetings" }, { label: "Event enquiry", href: "/weddings#enquire" }] },
    { title: "Help", links: [{ label: "Reservation request", href: "/book" }, { label: "Contact & location", href: "/contact" }, { label: "FAQs", href: "/faq" }, ...nav.legal] },
  ];

  return (
    <footer className="px-3 pb-3 md:px-6 md:pb-5">
     <div className="on-dark overflow-hidden rounded-[var(--radius-frame)] bg-ocean-deep text-ivory/80">
      <div className="container-site pt-20 pb-6">
        <div className="grid gap-14 border-b border-ivory/12 pb-14 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-8">
            <Link href="/" aria-label={`${resort.name} — home`} className="inline-block text-ivory">
              <Wordmark />
            </Link>
            <address className="space-y-4 not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sand" strokeWidth={1.5} />
                <span>{fullAddress}</span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sand" strokeWidth={1.5} />
                <a href={resort.phone.href} className="link-underline">{resort.phone.display}</a>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sand" strokeWidth={1.5} />
                <a href={resort.email.href} className="link-underline break-all">{resort.email.display}</a>
              </p>
              {resort.whatsapp && (
                <p>
                  <a href={resort.whatsapp.href} className="link-underline">WhatsApp {resort.whatsapp.display}</a>
                </p>
              )}
            </address>
            <div className="flex flex-wrap gap-3">
              <BookButton className="inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ocean-deep hover:bg-sand">
                Book your stay
              </BookButton>
              <a
                href={resort.maps.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ivory/40 px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory hover:border-ivory"
              >
                Directions <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="eyebrow mb-5 text-sand">{c.title}</p>
                <ul className="space-y-3 text-[0.95rem]">
                  {c.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="link-underline hover:text-ivory">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>© {year} {resort.name}, Mahabalipuram. All rights reserved.</p>
          <p>
            Photography on this site is representative sample imagery, not the resort itself.{" "}
            <Link href="/gallery" className="underline underline-offset-2 hover:text-ivory">About our imagery</Link>
          </p>
        </div>
        {resort.social.length > 0 && (
          <ul className="mt-6 flex gap-6 text-sm">
            {resort.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">{s.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.18em] select-none text-center font-display text-[21vw] leading-[0.85] tracking-[-0.04em] text-ivory/[0.07]"
      >
        Mamalla
      </p>
      <div className="h-24 md:hidden" aria-hidden />
     </div>
    </footer>
  );
}
