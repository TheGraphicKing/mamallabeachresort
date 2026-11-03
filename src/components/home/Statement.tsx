import { Reveal } from "../motion/Reveal";

/** A typographic pause after the hero — one sentence, set large, with generous air around it. */
export function Statement() {
  return (
    <section aria-label="Introduction" className="pt-28 pb-8 md:pt-40 md:pb-12">
      <div className="container-site">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-stone-deep">The Coromandel Coast</p>
          <p className="mt-10 font-display text-[clamp(1.7rem,3.4vw,3.2rem)] leading-[1.22] tracking-[-0.015em] text-ocean-deep">
            Between the Bay of Bengal and the carved granite of the Pallavas, days here are measured by the
            <em className="italic text-brass-deep"> tide</em> — a morning swim, a long lunch, the{" "}
            <em className="italic text-brass-deep">Shore Temple</em> at dusk.
          </p>
          <span aria-hidden className="mx-auto mt-12 block h-16 w-px bg-brass/50" />
        </Reveal>
      </div>
    </section>
  );
}
