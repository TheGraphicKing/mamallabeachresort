import { PageHero } from "@/components/sections/PageHero";
import { EventLanding } from "@/components/sections/EventLanding";
import { buttonClass } from "@/components/ui/Button";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Meetings & Corporate Events",
  description:
    "Meetings, conferences, offsites and team outings at Mamalla Beach Resort on the ECR, Mahabalipuram — a conference hall, rooms, dining and a lawn on one property.",
  path: "/meetings",
});

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Meetings & corporate"
        title={<>Meet where the <em className="italic text-sand">horizon is wide</em></>}
        lead="A conference hall, rooms and dining on one property — away from the city, a drive down the coast from Chennai."
        media={media.introStone}
        breadcrumbs={[{ label: "Meetings", href: "/meetings" }]}
      >
        <a href="#enquire" className={buttonClass("light")}>Enquire for your team</a>
      </PageHero>
      <EventLanding
        intro={{
          eyebrow: "Work, then the sea",
          title: "Everything your team needs, in one place",
          body: (
            <>
              <p>
                Bring your team to the coast for a day of meetings, a training programme or a multi-day retreat. Sessions run in
                the conference hall; meals at The Seagull; evenings on the lawn.
              </p>
              <p>Our team will help you shape the programme around your group size, dates and agenda.</p>
            </>
          ),
        }}
        occasionsTitle="Gatherings we host"
        occasions={[
          { title: "Meetings & conferences", body: "Day meetings and conferences in the conference hall." },
          { title: "Corporate retreats", body: "Multi-day offsites with rooms, dining and meeting space on one property." },
          { title: "Training programmes", body: "Workshops and training sessions away from office distractions." },
          { title: "Team outings", body: "Day outings by the pool and the beach, with meals at the restaurant." },
          { title: "Group events", body: "Dinners and evening gatherings on the lawn or in the hall." },
          { title: "Group stays", body: "Accommodation for your delegates — ask about group requirements." },
        ]}
        spaceOrder={["Conference Hall", "Banquet Hall", "The Lawn"]}
        feature={media.poolLoungers}
        eventTypes={["Meeting / conference", "Corporate retreat / offsite", "Group stay", "Banquet", "Other"]}
        formTitle="Enquire for your team"
        formLead="Tell us your dates, group size and what you need. Our team will reply with options and a proposal."
        crossLink={{ href: "/weddings", label: "Weddings & celebrations" }}
      />
    </>
  );
}
