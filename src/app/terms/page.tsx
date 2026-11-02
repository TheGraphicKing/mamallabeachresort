import { LegalPage } from "@/components/sections/LegalPage";
import { resort } from "@/content/resort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Booking Policies",
  description: "Website terms and how bookings, confirmations, payments and cancellations work at Mamalla Beach Resort, Mahabalipuram.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Booking Policies"
      label="Terms"
      path="/terms"
      updated="2 November 2026"
      note="Specific booking terms (check-in and check-out times, deposits, cancellation and child policies) have not yet been confirmed by the resort, so they are not stated here. They will be stated in your booking confirmation. This page should be reviewed by the resort before launch."
      sections={[
        {
          id: "website",
          title: "Using this website",
          body: (
            <p>
              This website gives general information about {resort.name}. We work to keep it accurate, but facilities, services
              and arrangements can change. Where a detail matters to your plans, please confirm it with us before you book.
            </p>
          ),
        },
        {
          id: "requests",
          title: "Reservation requests are not bookings",
          body: (
            <>
              <p>
                Sending a reservation request or event enquiry through this website does not create a booking. Your booking is
                confirmed only when the resort sends you a written confirmation stating your dates, rooms, rate and terms.
              </p>
              <p>If you are redirected to an external booking engine, the confirmation issued there governs your booking.</p>
            </>
          ),
        },
        {
          id: "payments",
          title: "Payments",
          body: (
            <p>
              This website never asks for or stores card details. Any advance payment is made only through the resort&apos;s
              authorised booking or payment provider, as described in your confirmation. If you are ever asked for payment
              through another channel, please call us on <a href={resort.phone.href}>{resort.phone.display}</a> to verify.
            </p>
          ),
        },
        {
          id: "cancellation",
          title: "Changes and cancellations",
          body: (
            <p>
              Cancellation and amendment terms depend on the rate, season and booking channel. The terms that apply to your
              booking are stated in your confirmation. Please ask us before booking if you need flexibility.
            </p>
          ),
        },
        {
          id: "stay",
          title: "During your stay",
          body: (
            <p>
              Check-in and check-out times, identification requirements and resort guidelines are shared with your confirmation
              and at check-in. Sea conditions vary; please follow local guidance before entering the water.
            </p>
          ),
        },
        {
          id: "events",
          title: "Events",
          body: (
            <p>
              Event spaces, capacities, packages and payment schedules are agreed in writing with our events team for each
              occasion.
            </p>
          ),
        },
        {
          id: "imagery",
          title: "Imagery",
          body: (
            <p>
              Photographs on this website are representative sample imagery and do not depict the property, its rooms, food or venues unless stated. Ask us for current photographs of the resort.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about these terms: <a href={resort.email.href}>{resort.email.display}</a> or{" "}
              <a href={resort.phone.href}>{resort.phone.display}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
