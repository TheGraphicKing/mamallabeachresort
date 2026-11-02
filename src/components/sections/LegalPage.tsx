import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Notice } from "../ui/Notice";

/** Long-form policy layout with a sticky table of contents. */
export function LegalPage({
  title,
  path,
  label,
  updated,
  sections,
  note,
}: {
  title: string;
  path: string;
  label: string;
  updated: string;
  sections: { id: string; title: string; body: ReactNode }[];
  note?: ReactNode;
}) {
  return (
    <>
      <PageHero size="short" eyebrow="Policies" title={title} breadcrumbs={[{ label, href: path }]} lead={`Last updated ${updated}`} />
      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <nav aria-label="Contents" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-4 text-stone-deep">Contents</p>
              <ol className="space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="link-underline text-ink/75 hover:text-ink">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <article className="max-w-prose lg:col-span-8 lg:col-start-5">
            {note && <Notice className="mb-12">{note}</Notice>}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mb-14 scroll-mt-28">
                <h2 className="font-display text-3xl text-ocean-deep">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-5 space-y-4 leading-relaxed text-ink/80 [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
