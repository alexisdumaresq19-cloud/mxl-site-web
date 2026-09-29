import { certifications, FACEBOOK_URL } from "@/lib/site";

import { ContactForm } from "./contact-form";

const details = [
  {
    label: "Facebook",
    value: (
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm transition-colors hover:text-neutral-400 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        facebook.com/estimationmxl
      </a>
    ),
  },
  { label: "Engagement", value: "Rapport précis garanti" },
  {
    label: "Formations et certifications",
    value: certifications
      .map((certification) => certification.name)
      .join(" · "),
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-white/6 px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl reveal">
        <h2
          id="contact-title"
          className="bg-linear-to-br from-neutral-100 via-neutral-100 to-neutral-100/25 bg-clip-text pb-2 text-[clamp(2.75rem,16vw,3.75rem)] leading-[0.95] font-semibold tracking-tight whitespace-nowrap text-transparent sm:text-7xl md:text-8xl"
        >
          Parlons-en.
        </h2>

        <div className="mt-16 grid gap-12 border-t border-neutral-800/60 pt-12 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col gap-12">
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
              Décrivez votre sinistre en quelques lignes. Que le dossier soit
              complet ou à peine ouvert, notre équipe communiquera avec vous
              pour en discuter.
            </p>

            <dl className="flex flex-col gap-6">
              {details.map((detail) => (
                <div key={detail.label}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    {detail.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-neutral-100">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
