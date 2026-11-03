import { Reveal } from "../motion/Reveal";

/**
 * Quick-glance facts in large numerals — only counts we can support from public information
 * (no ratings, review scores or invented statistics).
 */
const facts = [
  { n: "02", label: "Room categories", note: "Standard & Deluxe" },
  { n: "02", label: "Pools", note: "Outdoor & children's" },
  { n: "01", label: "Restaurant", note: "The Seagull, multi-cuisine" },
  { n: "UNESCO", label: "Heritage town", note: "Group of Monuments nearby" },
];

export function FactsStrip() {
  return (
    <section aria-label="The resort at a glance" className="pt-24 md:pt-28">
      <div className="container-site">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.07} className="border-ink/10 px-2 text-center lg:border-l lg:first:border-l-0">
              <dd className="font-display text-[clamp(2.4rem,4.2vw,3.8rem)] leading-none text-ocean-deep">{f.n}</dd>
              <dt className="mt-3 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-stone-deep">{f.label}</dt>
              <dd className="mt-1 text-sm text-ink/60">{f.note}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
