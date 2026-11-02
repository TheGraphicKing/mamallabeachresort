"use client";

import { useEffect, useRef, useState } from "react";
import type { ArtworkScene, PhotoSource } from "@/content/types";
import { cn } from "@/lib/cn";
import { artworkUrl } from "./Artwork";

const WIDTHS = [640, 960, 1280, 1600, 2048];

function build(source: PhotoSource): { src: string; srcSet: string } {
  if ("unsplash" in source) {
    const base = `https://images.unsplash.com/photo-${source.unsplash}?auto=format&fit=crop&q=72`;
    return {
      src: `${base}&w=1600`,
      srcSet: WIDTHS.map((w) => `${base}&w=${w} ${w}w`).join(", "),
    };
  }
  const sep = source.url.includes("?") ? "&" : "?";
  return {
    src: `${source.url}${sep}width=1600`,
    srcSet: WIDTHS.map((w) => `${source.url}${sep}width=${w} ${w}w`).join(", "),
  };
}

/**
 * Sample photograph from a remote library, tried source by source.
 * If every source fails (offline, removed, blocked), the scene illustration is shown,
 * so a broken URL never leaves an empty box. Fades in once decoded.
 */
export function RemotePhoto({
  sources,
  alt,
  sizes,
  priority,
  className,
  fallbackScene,
}: {
  sources: PhotoSource[];
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fallbackScene: ArtworkScene;
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(Boolean(priority));
  const ref = useRef<HTMLImageElement>(null);
  const failed = index >= sources.length;

  // Catch errors/loads that happened before hydration.
  useEffect(() => {
    const img = ref.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth === 0) setIndex((i) => i + 1);
    else setLoaded(true);
  }, [index]);

  if (failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static SVG fallback
      <img
        src={artworkUrl(fallbackScene)}
        alt={`${alt} (illustration)`}
        width={1600}
        height={1000}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  const { src, srcSet } = build(sources[index]);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote library images are already resized/compressed by their CDN
    <img
      key={index}
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={1067}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      onError={() => setIndex((i) => i + 1)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
