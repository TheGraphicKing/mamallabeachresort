import { PageHero } from "@/components/sections/PageHero";
import { EventLanding } from "@/components/sections/EventLanding";
import { buttonClass } from "@/components/ui/Button";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Weddings & Celebrations",
  description:
    "Beachside weddings, receptions and family celebrations at Mamalla Beach Resort, Mahabalipuram — an open-air lawn and an indoor banquet hall on the East Coast Road. Send an event enquiry.",
  path: "/weddings",
});

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Weddings & celebrations"
        title={<>Celebrate <em className="italic text-sand">by the sea</em></>}
        lead="Ceremonies, receptions and family occasions on the resort lawn — with an indoor banquet hall close at hand."
        media={media.lawn}
        breadcrumbs={[{ label: "Weddings", href: "/weddings" }]}
      >
        <a href="#enquire" className={buttonClass("light")}>Plan your celebration</a>
      </PageHero>
      <EventLanding
        intro={{
          eyebrow: "Your day, your way",
          title: "Open skies, sea air and room for everyone",
          body: (
            <>
              <p>
                From an intimate ceremony to a full reception, the resort gives you an outdoor lawn for the open-air moments
                and a banquet hall for the rest — with rooms on the same property for family and guests.
              </p>
              <p>Tell us about your plans and our team will help you choose the right spaces and layout for your guest count.</p>
            </>
          ),
        }}
        occasionsTitle="Celebrations we host"
        occasions={[
          { title: "Weddings", body: "Ceremonies on the lawn or in the banquet hall, with rooms for family close by." },
          { title: "Receptions", body: "Evening receptions under the sky, with the hall as a sheltered alternative." },
          { title: "Engagements & family occasions", body: "Engagements, anniversaries, birthdays and family get-togethers." },
          { title: "Banquets", body: "Seated dinners and functions in the banquet hall." },
          { title: "Guest stays", body: "Rooms for your guests on the same property — ask about group stays." },
          { title: "Pre-wedding gatherings", body: "Relaxed get-togethers for families arriving for the celebrations." },
        ]}
        spaceOrder={["The Lawn", "Banquet Hall"]}
        feature={media.dusk}
        eventTypes={["Wedding", "Reception", "Engagement / family celebration", "Banquet", "Group stay", "Other"]}
        formTitle="Plan your celebration"
        formLead="Share a few details and our events team will be in touch to discuss dates, spaces and arrangements."
        crossLink={{ href: "/meetings", label: "Meetings & corporate events" }}
      />
    </>
  );
}
