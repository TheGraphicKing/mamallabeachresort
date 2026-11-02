import type { Metadata } from "next";
import { DiningFeature } from "@/components/home/DiningFeature";
import { EventsFeature } from "@/components/home/EventsFeature";
import { ExperiencesEditorial } from "@/components/home/ExperiencesEditorial";
import { ExploreTeaser } from "@/components/home/ExploreTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { Intro } from "@/components/home/Intro";
import { RoomsShowcase } from "@/components/home/RoomsShowcase";
import { TrustSection } from "@/components/home/TrustSection";
import { HomeHero } from "@/components/sections/HomeHero";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Intro />
      <RoomsShowcase />
      <ExperiencesEditorial />
      <DiningFeature />
      <ExploreTeaser />
      <EventsFeature />
      <TrustSection />
      <FinalCta />
    </>
  );
}
