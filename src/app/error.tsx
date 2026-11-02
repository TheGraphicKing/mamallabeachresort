"use client";

import { useEffect } from "react";
import { resort } from "@/content/resort";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-32 pb-20" role="alert">
      <p className="eyebrow text-stone-deep">Something went wrong</p>
      <h1 className="mt-5 max-w-2xl text-display-md text-ocean-deep">We couldn&apos;t load this part of the site.</h1>
      <p className="mt-5 max-w-lg text-ink/75">
        Please try again. If it keeps happening, call us on{" "}
        <a href={resort.phone.href} className="underline underline-offset-2">{resort.phone.display}</a>.
      </p>
      <div className="mt-8">
        <Button onClick={reset}>Try again</Button>
      </div>
    </section>
  );
}
