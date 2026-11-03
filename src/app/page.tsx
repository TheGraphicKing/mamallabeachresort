import type { Metadata } from "next";
import { AmenitiesGrid } from "@/components/home/AmenitiesGrid";
import { DiningFeature } from "@/components/home/DiningFeature";
import { DiscoverMahabalipuram } from "@/components/home/DiscoverMahabalipuram";
import { EventsFeature } from "@/components/home/EventsFeature";
import { ExperiencesEditorial } from "@/components/home/ExperiencesEditorial";
import { ExploreTeaser } from "@/components/home/ExploreTeaser";
import { FactsStrip } from "@/components/home/FactsStrip";
import { FinalCta } from "@/components/home/FinalCta";
import { GalleryStrip } from "@/components/home/GalleryStrip";
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
      <FactsStrip />
      <Intro />
      <RoomsShowcase />
      <AmenitiesGrid />
      <ExperiencesEditorial />
      <DiningFeature />
      <DiscoverMahabalipuram />
      <EventsFeature />
      <GalleryStrip />
      <ExploreTeaser />
      <TrustSection />
      <FinalCta />
    </>
  );
}
