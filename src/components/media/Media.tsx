import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { artworkUrl } from "./Artwork";

interface MediaProps {
  media: MediaAsset;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Class applied to the image/artwork itself (e.g. hover scale). */
  imgClassName?: string;
  /** Show the "Illustration" label when artwork is rendered. */
  showLabel?: boolean;
  labelPosition?: "bottom-left" | "top-right" | "bottom-right" | "hero";
}

/**
 * Renders an authentic photograph when one has been supplied (`media.src`),
 * otherwise original illustrated artwork with a visible "Illustration" label.
 * The wrapper always reserves its box, so a missing image never collapses the layout.
 */
export function Media({
  media,
  sizes = "100vw",
  priority,
  className,
  imgClassName,
  showLabel = true,
  labelPosition = "bottom-left",
}: MediaProps) {
  const positioned = /(^|\s)(absolute|fixed|relative|sticky)(\s|$)/.test(className ?? "");
  return (
    <div className={cn(!positioned && "relative", "overflow-hidden bg-sand", className)}>
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG; next/image adds nothing here */}
          <img
            src={artworkUrl(media.scene)}
            alt={`${media.alt} (illustration)`}
            width={1600}
            height={1000}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
          />
          {showLabel && (
            <span
              className={cn(
                "pointer-events-none absolute z-[1] bg-ivory/80 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink/70 backdrop-blur-sm",
                labelPosition === "bottom-left" && "bottom-3 left-3",
                labelPosition === "bottom-right" && "bottom-3 right-3",
                labelPosition === "top-right" && "top-3 right-3",
                labelPosition === "hero" && "top-32 right-4 md:top-44 md:right-10",
              )}
            >
              Illustration
            </span>
          )}
        </>
      )}
    </div>
  );
}
