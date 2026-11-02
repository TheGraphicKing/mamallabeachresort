import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { BookingRequest } from "./BookingRequest";

export const metadata = {
  ...pageMetadata({
    title: "Reservation Request",
    description:
      "Request a stay at Mamalla Beach Resort, Mahabalipuram. Choose your dates and guests and our reservations team will reply with availability and rates.",
    path: "/book",
  }),
  robots: { index: false, follow: true },
};

export default function BookPage() {
  return (
    <>
      <PageHero
        size="short"
        eyebrow="Plan your stay"
        title="Request your stay"
        lead="Tell us when you'd like to come. Our reservations team will reply with availability, rates and how to confirm."
        media={media.beach}
        breadcrumbs={[{ label: "Reservation request", href: "/book" }]}
      />
      <Suspense fallback={<div className="container-site section-y" aria-busy="true">Loading…</div>}>
        <BookingRequest />
      </Suspense>
    </>
  );
}
