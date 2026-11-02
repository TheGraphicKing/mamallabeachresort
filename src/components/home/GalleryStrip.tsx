import Link from "next/link";
import { media } from "@/content/media";
import { Media } from "../media/Media";
import { Reveal } from "../motion/Reveal";
import { ArrowLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

/** A composed mosaic of mixed aspect ratios — a teaser for the full gallery. */
const tiles = [
  { m: media.gardens, cls: "col-span-6 row-span-2 md:col-span-5", sizes: "(min-width: 768px) 40vw, 50vw" },
  { m: media.roomDeluxe3, cls: "col-span-6 md:col-span-4", sizes: "(min-width: 768px) 32vw, 50vw" },
  { m: media.diningIndian, cls: "col-span-6 md:col-span-3", sizes: "(min-width: 768px) 24vw, 50vw" },
  { m: media.roomStandard2, cls: "col-span-6 md:col-span-3", sizes: "(min-width: 768px) 24vw, 50vw" },
  { m: media.celebrationTable, cls: "col-span-12 md:col-span-4", sizes: "(min-width: 768px) 32vw, 100vw" },
];

export function GalleryStrip() {
  return (
    <section aria-labelledby="gallery-strip-title" className="section-y">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow="Gallery" title={<span id="gallery-strip-title">Moments on the coast</span>} />
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowLink href="/gallery">View the gallery</ArrowLink>
          </Reveal>
        </div>
        <div className="mt-14 grid auto-rows-[38vw] grid-cols-12 gap-3 md:auto-rows-[16vw] md:gap-4 xl:auto-rows-[13rem]">
          {tiles.map(({ m, cls, sizes }, i) => (
            <Reveal key={m.id} variant="mask" delay={i * 0.06} className={cls}>
              <Link href="/gallery" className="group block h-full overflow-hidden" aria-label={`${m.caption ?? m.alt} — open gallery`}>
                <Media
                  media={m}
                  sizes={sizes}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-[1.05]"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
