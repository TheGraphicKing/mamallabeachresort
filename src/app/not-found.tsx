import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import { buttonClass } from "@/components/ui/Button";
import { media } from "@/content/media";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ocean-deep text-ivory">
      <Media media={media.dusk} className="absolute inset-0 -z-10 opacity-70" sizes="100vw" labelPosition="hero" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ocean-deep/50" />
      <div className="container-site py-40">
        <p className="eyebrow text-sand">Page not found</p>
        <h1 className="mt-5 max-w-3xl text-display-lg">This path leads out to sea.</h1>
        <p className="mt-6 max-w-lg text-lead text-ivory/80">The page you were looking for has moved or doesn&apos;t exist.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass("light")}>Back to the resort</Link>
          <Link href="/contact" className={buttonClass("outline-light")}>Contact us</Link>
        </div>
      </div>
    </section>
  );
}
