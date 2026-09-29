import { BadgeCheck, FileText } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

import { certifications, FACEBOOK_URL } from "@/lib/site";

import { ContactForm } from "./contact-form";

const highlights = [
  {
    icon: (
      <FileText aria-hidden="true" className="size-4 text-mxl-blue-light" />
    ),
    title: "Rapport précis garanti",
    text: "Chaque estimation est détaillée, poste par poste.",
  },
  {
    icon: (
      <BadgeCheck aria-hidden="true" className="size-4 text-mxl-blue-light" />
    ),
    title: "Équipe formée et certifiée",
    text: certifications.map((certification) => certification.name).join(" · "),
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-white/6 px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl reveal gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-mxl-blue-light">Contact</p>
          <h2
            id="contact-title"
            className="mt-2 bg-linear-to-br from-white via-white to-white/40 bg-clip-text pb-1 text-3xl font-semibold tracking-tight text-balance text-transparent md:text-4xl"
          >
            Besoin d&apos;une estimation précise?
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-400">
            Décrivez votre sinistre ou votre projet en quelques lignes. Notre
            équipe communiquera avec vous pour en discuter.
          </p>

          <ul className="mt-10 space-y-5">
            {highlights.map((highlight) => (
              <li key={highlight.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900 ring-1 ring-white/8">
                  {highlight.icon}
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {highlight.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-neutral-400">
                    {highlight.text}
                  </span>
                </span>
              </li>
            ))}
            <li className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900 ring-1 ring-white/8">
                <FaFacebookF
                  aria-hidden="true"
                  className="size-3.5 text-mxl-blue-light"
                />
              </span>
              <span>
                <span className="block text-sm font-medium text-white">
                  Suivez-nous
                </span>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block rounded-sm text-sm text-neutral-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  facebook.com/estimationmxl
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-neutral-900/55 p-6 ring-1 ring-white/6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
