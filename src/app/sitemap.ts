import type { MetadataRoute } from "next";
import { rooms } from "@/content/rooms";
import { siteUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: [string, number][] = [
    ["/", 1],
    ["/rooms", 0.9],
    ...rooms.map((r): [string, number] => [`/rooms/${r.slug}`, 0.8]),
    ["/weddings", 0.8],
    ["/meetings", 0.8],
    ["/experiences", 0.7],
    ["/dining", 0.7],
    ["/explore", 0.7],
    ["/about", 0.6],
    ["/gallery", 0.6],
    ["/offers", 0.6],
    ["/contact", 0.7],
    ["/faq", 0.5],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];
  return paths.map(([p, priority]) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "monthly", priority }));
}
