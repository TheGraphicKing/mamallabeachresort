import { FinalCta } from "@/components/home/FinalCta";
import { Gallery } from "@/components/gallery/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { Notice } from "@/components/ui/Notice";
import { galleryMedia, media } from "@/content/media";
import { resort } from "@/content/resort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "A visual journey through Mamalla Beach Resort and Mahabalipuram — the pool, the beach, rooms, dining and celebrations.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        size="short"
        eyebrow="Gallery"
        title="Moments on the coast"
        lead="The pool, the shore, the rooms and the celebrations — and the temple town beyond."
        media={media.dusk}
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }]}
      />
      <section className="section-y">
        <div className="container-site">
          <Notice title="About our imagery" className="mb-14 max-w-3xl">
            The images in this gallery are original illustrations, not photographs of the property. We&apos;re replacing
            them with authentic resort photography. Until then, our team is happy to share recent photographs on request —
            email <a href={resort.email.href} className="underline underline-offset-2">{resort.email.display}</a>.
          </Notice>
          <Gallery items={galleryMedia} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
