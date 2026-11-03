"use client";

import { AlertCircle, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { resort } from "@/content/resort";
import { rooms } from "@/content/rooms";
import { EVENT_TYPES, validateEnquiry, type EnquiryErrors, type EnquiryKind, type EnquiryPayload } from "@/lib/enquiry";
import { cn } from "@/lib/cn";
import { Button } from "../ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  kind: EnquiryKind;
  /** Pre-filled values (e.g. booking query on /book). */
  defaults?: Partial<EnquiryPayload>;
  /** Event types offered (event forms only). */
  eventTypes?: readonly string[];
  submitLabel?: string;
}

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block text-stone-deep">
        {label}
        {required ? <span aria-hidden className="text-terracotta"> *</span> : <span className="ml-2 normal-case tracking-normal text-ink/45">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ink/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-2 text-sm text-error">
          <AlertCircle aria-hidden className="h-4 w-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

/**
 * Enquiry form for reservations, events and general contact.
 * Posts to /api/enquiry. Validation runs on both the client and the server.
 * On delivery failure the guest is shown direct phone/email alternatives — nothing is silently lost.
 */
export function EnquiryForm({ kind, defaults, eventTypes = EVENT_TYPES, submitLabel }: Props) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [values, setValues] = useState<EnquiryPayload>({
    kind,
    name: "",
    email: "",
    phone: "",
    message: "",
    eventType: kind === "event" ? defaults?.eventType ?? "" : undefined,
    ...defaults,
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef<number>(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Keep booking defaults in sync if the URL query changes.
  useEffect(() => {
    if (defaults) setValues((v) => ({ ...v, ...defaults }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaults?.checkIn, defaults?.checkOut, defaults?.adults, defaults?.children, defaults?.rooms]);

  const set = <K extends keyof EnquiryPayload>(k: K, v: EnquiryPayload[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const describedBy = (k: keyof EnquiryPayload, hint?: boolean) =>
    errors[k] ? `${id(k)}-error` : hint ? `${id(k)}-hint` : undefined;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: EnquiryErrors };
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        if (data.errors) setErrors(data.errors);
        setServerMessage(data.message || "We couldn't send your enquiry just now.");
        setStatus("error");
      }
    } catch {
      setServerMessage("We couldn't reach our server. Please check your connection and try again.");
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-success/30 bg-ivory p-8 outline-none md:p-12">
        <CheckCircle2 aria-hidden className="h-8 w-8 text-success" strokeWidth={1.4} />
        <h3 className="mt-5 font-display text-3xl text-ocean-deep">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-ink/75">
          {kind === "reservation"
            ? "Your reservation request has reached our team. This is not yet a confirmed booking — we'll reply by email or phone with availability, rates and how to confirm."
            : "Your enquiry has reached our team, and we'll be in touch by email or phone."}
        </p>
        <p className="mt-4 text-sm text-ink/60">
          Need us sooner? Call <a href={resort.phone.href} className="underline underline-offset-2">{resort.phone.display}</a>.
        </p>
      </div>
    );
  }

  const inputProps = (k: keyof EnquiryPayload, hint?: boolean) => ({
    id: id(k),
    name: k,
    "aria-invalid": Boolean(errors[k]) || undefined,
    "aria-describedby": describedBy(k, hint),
    className: "field",
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-8" aria-busy={status === "submitting"}>
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.name} required className="md:col-span-2">
          <input {...inputProps("name")} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} required />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email} required>
          <input {...inputProps("email")} type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} required />
        </Field>
        <Field id={id("phone")} label="Phone" error={errors.phone} required hint="Include country code if outside India.">
          <input {...inputProps("phone", true)} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} required />
        </Field>
      </div>

      {kind === "reservation" && (
        <fieldset className="grid gap-8 md:grid-cols-2">
          <legend className="sr-only">Stay details</legend>
          <Field id={id("checkIn")} label="Arrival" error={errors.checkIn} required>
            <input {...inputProps("checkIn")} type="date" value={values.checkIn ?? ""} onChange={(e) => set("checkIn", e.target.value)} required />
          </Field>
          <Field id={id("checkOut")} label="Departure" error={errors.checkOut} required>
            <input {...inputProps("checkOut")} type="date" min={values.checkIn || undefined} value={values.checkOut ?? ""} onChange={(e) => set("checkOut", e.target.value)} required />
          </Field>
          <div className="grid grid-cols-3 gap-4 md:col-span-2">
            {(["adults", "children", "rooms"] as const).map((k) => (
              <Field key={k} id={id(k)} label={k[0].toUpperCase() + k.slice(1)} required={k !== "children"}>
                <input
                  {...inputProps(k)}
                  type="number"
                  inputMode="numeric"
                  min={k === "children" ? 0 : 1}
                  max={k === "rooms" ? 15 : 30}
                  value={values[k] ?? ""}
                  onChange={(e) => set(k, e.target.value)}
                />
              </Field>
            ))}
          </div>
          <Field id={id("roomPreference")} label="Room preference" className="md:col-span-2">
            <select {...inputProps("roomPreference")} value={values.roomPreference ?? ""} onChange={(e) => set("roomPreference", e.target.value)}>
              <option value="">No preference</option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.name}>
                  {r.name}
                </option>
              ))}
              <option value="Standard Room (non-AC)">Standard Room (non-AC)</option>
            </select>
          </Field>
        </fieldset>
      )}

      {kind === "event" && (
        <fieldset className="grid gap-8 md:grid-cols-2">
          <legend className="sr-only">Event details</legend>
          <Field id={id("eventType")} label="Type of event" error={errors.eventType} required className="md:col-span-2">
            <select {...inputProps("eventType")} value={values.eventType ?? ""} onChange={(e) => set("eventType", e.target.value)} required>
              <option value="" disabled>
                Choose an event type
              </option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field id={id("preferredDate")} label="Preferred date" error={errors.preferredDate}>
            <input {...inputProps("preferredDate")} type="date" value={values.preferredDate ?? ""} onChange={(e) => set("preferredDate", e.target.value)} />
          </Field>
          <Field id={id("guestCount")} label="Approximate guests" error={errors.guestCount}>
            <input {...inputProps("guestCount")} inputMode="numeric" placeholder="e.g. 150" value={values.guestCount ?? ""} onChange={(e) => set("guestCount", e.target.value)} />
          </Field>
        </fieldset>
      )}

      <Field
        id={id("message")}
        label={kind === "event" ? "Additional requirements" : kind === "reservation" ? "Anything we should know?" : "Your message"}
        error={errors.message}
        required={kind === "contact"}
      >
        <textarea {...inputProps("message")} rows={4} value={values.message ?? ""} onChange={(e) => set("message", e.target.value)} className="field resize-y" />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/75">
          <input
            type="checkbox"
            name="consent"
            checked={Boolean(values.consent)}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent) || undefined}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-ocean"
          />
          <span>
            I agree that {resort.name} may contact me about this enquiry. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.
          </span>
        </label>
        {errors.consent && (
          <p id={`${id("consent")}-error`} className="mt-2 flex items-center gap-2 text-sm text-error">
            <AlertCircle aria-hidden className="h-4 w-4" /> {errors.consent}
          </p>
        )}
      </div>

      <div ref={status === "error" ? statusRef : undefined} tabIndex={-1} className="outline-none" aria-live="polite">
        {status === "error" && (
          <div role="alert" className="border-l-2 border-error bg-error/5 px-5 py-4 text-sm leading-relaxed">
            <p className="font-medium text-error">{serverMessage}</p>
            <p className="mt-2 text-ink/75">Your details haven&apos;t been lost — you can try again, or reach us directly:</p>
            <p className="mt-3 flex flex-wrap gap-5">
              <a href={resort.phone.href} className="inline-flex items-center gap-2 font-medium text-ocean underline underline-offset-2">
                <Phone aria-hidden className="h-4 w-4" /> {resort.phone.display}
              </a>
              <a href={`${resort.email.href}?subject=${encodeURIComponent("Website enquiry")}`} className="inline-flex items-center gap-2 font-medium text-ocean underline underline-offset-2">
                <Mail aria-hidden className="h-4 w-4" /> {resort.email.display}
              </a>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" arrow={status !== "submitting"} disabled={status === "submitting"} className={cn(status === "submitting" && "cursor-wait")}>
          {status === "submitting" && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
          {status === "submitting" ? "Sending…" : submitLabel ?? "Send enquiry"}
        </Button>
        <p className="text-xs text-ink/55">Fields marked * are required. We never ask for card details.</p>
      </div>
    </form>
  );
}
