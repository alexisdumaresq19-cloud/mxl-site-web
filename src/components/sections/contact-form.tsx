"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";

import { sendContactRequest, type ContactState } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FACEBOOK_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

// Underline-only fields, as in the ForgeUI contact04 block.
const underline =
  "peer rounded-none border-0 border-b border-neutral-700 bg-transparent px-0 shadow-none placeholder:text-neutral-500 focus-visible:border-neutral-100 focus-visible:ring-0 aria-invalid:border-red-400/70 aria-invalid:ring-0 autofill:shadow-[inset_0_0_0_1000px_black] autofill:[-webkit-text-fill-color:var(--color-neutral-100)] dark:bg-transparent dark:aria-invalid:border-red-400/70 dark:aria-invalid:ring-0";
const inputClass = cn(underline, "h-11 focus:placeholder:text-transparent");

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactRequest,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the outcome: the thank-you note or the first field to fix.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.reason === "invalid") {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="outline-none"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-mxl-blue-light uppercase">
          Merci
        </p>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-100">
          Votre demande est envoyée.
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
          Notre équipe communiquera avec vous au sujet de votre sinistre.
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};
  const invalid = (id: string, error?: string) =>
    error
      ? { "aria-invalid": true, "aria-describedby": `${id}-error` }
      : undefined;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-7">
      <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-7">
        <Field id="contact-first-name" label="Prénom" error={errors.firstName}>
          <Input
            id="contact-first-name"
            name="firstName"
            placeholder="Prénom"
            autoComplete="given-name"
            required
            maxLength={60}
            defaultValue={values.firstName}
            {...invalid("contact-first-name", errors.firstName)}
            className={inputClass}
          />
        </Field>
        <Field id="contact-last-name" label="Nom" error={errors.lastName}>
          <Input
            id="contact-last-name"
            name="lastName"
            placeholder="Nom"
            autoComplete="family-name"
            required
            maxLength={60}
            defaultValue={values.lastName}
            {...invalid("contact-last-name", errors.lastName)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="contact-email" label="Courriel" error={errors.email}>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Courriel"
          autoComplete="email"
          required
          maxLength={200}
          defaultValue={values.email}
          {...invalid("contact-email", errors.email)}
          className={inputClass}
        />
      </Field>

      <Field
        id="contact-phone"
        label="Téléphone (facultatif)"
        error={errors.phone}
      >
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="Téléphone (facultatif)"
          autoComplete="tel"
          maxLength={30}
          defaultValue={values.phone}
          {...invalid("contact-phone", errors.phone)}
          className={inputClass}
        />
      </Field>

      <Field id="contact-message" label="Votre sinistre" error={errors.message}>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Décrivez votre sinistre…"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          defaultValue={values.message}
          {...invalid("contact-message", errors.message)}
          className={cn(underline, "max-h-80 min-h-11 resize-none py-3")}
        />
      </Field>

      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Site web</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="mt-2 text-xs leading-relaxed text-neutral-500">
        Ces renseignements servent à répondre à votre demande.
      </p>

      {state.status === "error" && state.reason !== "invalid" && (
        <p
          role="alert"
          className="border-l border-mxl-blue-light/60 pl-3 text-sm leading-relaxed text-neutral-300"
        >
          {state.message}{" "}
          {state.reason === "not-configured" && (
            <>
              En attendant, écrivez-nous sur{" "}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-neutral-100 underline underline-offset-2 transition-colors hover:text-neutral-400 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Facebook
              </a>
              .
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-neutral-50 px-5 py-3.5 text-sm font-medium text-neutral-900 transition-colors duration-300 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[30%] after:w-full after:bg-linear-to-t after:from-black/20 after:to-transparent after:transition-[height] after:duration-300 hover:bg-white hover:after:h-[20%] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mxl-blue-light disabled:cursor-wait disabled:opacity-70 motion-reduce:after:transition-none"
      >
        {pending ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}

// The label shows as the placeholder at rest, then as a small caption above
// the field once it is focused or filled, so the field keeps its name.
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute -top-1 left-0 font-mono text-[10px] leading-none tracking-[0.2em] text-neutral-500 uppercase opacity-0 transition duration-200 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:opacity-100 peer-focus:translate-y-0 peer-focus:opacity-100 peer-aria-invalid:text-red-400 motion-safe:translate-y-1 motion-reduce:transition-none"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
