"use client";

import { useActionState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, CircleCheck } from "lucide-react";

import { sendContactRequest, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FACEBOOK_URL, projectTypes } from "@/lib/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "h-11 rounded-xl border-white/10 bg-black px-3.5 text-[15px] md:text-sm dark:bg-black";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactRequest,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center py-10 text-center"
      >
        <CircleCheck
          aria-hidden="true"
          className="size-10 text-mxl-blue-light"
        />
        <p className="mt-4 text-lg font-medium text-white">
          Merci, votre demande est envoyée.
        </p>
        <p className="mt-2 max-w-sm text-sm text-neutral-400">
          Notre équipe communiquera avec vous pour discuter de votre projet.
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      <Field id="contact-name" label="Nom complet" error={errors.name}>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          defaultValue={values.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <Field id="contact-email" label="Courriel" error={errors.email}>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          defaultValue={values.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <Field
        id="contact-phone"
        label="Téléphone"
        hint="Facultatif"
        error={errors.phone}
      >
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          defaultValue={values.phone}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <Field
        id="contact-type"
        label="Type de projet"
        error={errors.projectType}
      >
        <div className="relative">
          {/* Remount on each result: React only applies a select's defaultValue on mount. */}
          <select
            key={values.projectType ?? ""}
            id="contact-type"
            name="projectType"
            required
            defaultValue={values.projectType ?? ""}
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={
              errors.projectType ? "contact-type-error" : undefined
            }
            className={cn(
              "w-full appearance-none border border-white/10 pr-10 text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive",
              fieldClass,
            )}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-neutral-500"
          />
        </div>
      </Field>

      <Field
        id="contact-message"
        label="Votre demande"
        error={errors.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Décrivez votre sinistre ou votre projet."
          defaultValue={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className="min-h-32 rounded-xl border-white/10 bg-black px-3.5 py-3 text-[15px] md:text-sm dark:bg-black"
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

      {state.status === "error" && state.reason !== "invalid" && (
        <p
          role="alert"
          className="rounded-xl bg-white/4 px-4 py-3 text-sm text-neutral-300 ring-1 ring-white/10 sm:col-span-2"
        >
          {state.message}{" "}
          {state.reason === "not-configured" && (
            <>
              En attendant, écrivez-nous sur{" "}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-mxl-blue-light underline-offset-4 hover:underline"
              >
                Facebook
              </a>
              .
            </>
          )}
        </p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="pill"
        disabled={pending}
        className="w-full sm:col-span-2"
      >
        {pending ? "Envoi en cours…" : "Envoyer ma demande"}
        {!pending && <ArrowRight data-icon="inline-end" aria-hidden="true" />}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-neutral-200">
        {label}
        {hint && <span className="font-normal text-neutral-500">{hint}</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
