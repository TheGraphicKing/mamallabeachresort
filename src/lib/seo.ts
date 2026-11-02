import type { Metadata } from "next";
import { fullAddress, resort } from "@/content/resort";
import { siteUrl } from "./config";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${resort.name}`,
      description,
      url: path,
      siteName: resort.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${resort.name}`, description },
  };
}

/** Structured data limited to verified, non-promotional facts (no ratings, stars or prices). */
export function resortJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Resort",
    "@id": `${siteUrl}/#resort`,
    name: resort.name,
    description: resort.description,
    url: siteUrl,
    telephone: resort.phone.display.replace(/\s/g, ""),
    email: resort.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: resort.address.street,
      addressLocality: "Mamallapuram",
      addressRegion: resort.address.region,
      postalCode: resort.address.postalCode,
      addressCountry: resort.address.countryCode,
    },
    hasMap: resort.maps.href,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Outdoor swimming pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Children's pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    ],
    containsPlace: [{ "@type": "Restaurant", name: "The Seagull", servesCuisine: "Multi-cuisine" }],
    sameAs: resort.social.map((s) => s.href),
    areaServed: "Mahabalipuram, Tamil Nadu",
    keywords: `beach resort Mahabalipuram, ECR resort, ${fullAddress}`,
  };
}
