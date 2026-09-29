import { Quote } from "lucide-react";

import { MxlLogo } from "@/components/brand/mxl-logo";

import { StatNumber } from "./stat-number";

const stats = [
  { value: 5, label: "Années à votre service" },
  { value: 100, label: "Clients satisfaits" },
  { value: 2500, label: "Projets réalisés" },
];

export function About() {
  return (
    <section
      id="a-propos"
      aria-labelledby="about-title"
      className="border-t border-white/6 px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-3xl reveal text-center">
        <p className="text-sm font-medium text-mxl-blue-light">À propos</p>
        <h2 id="about-title" className="sr-only">
          Notre expertise
        </h2>
        <Quote
          aria-hidden="true"
          className="mx-auto mt-6 size-10 fill-neutral-800 text-neutral-800"
        />
        <div className="mt-8 space-y-6 text-xl leading-relaxed font-medium text-balance text-neutral-200 sm:text-2xl">
          <p>
            Nous sommes fiers de fournir des services de qualité supérieure à
            nos clients pour les aider à remettre leurs biens endommagés à leur
            état antérieur.
          </p>
          <p>
            Avec notre équipe expérimentée d&apos;experts en assurances et en
            sinistres, nous nous engageons à fournir des estimations précises et
            détaillées pour les dommages causés par les sinistres.
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="flex h-10 items-center rounded-lg bg-mxl-blue px-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
            <MxlLogo aria-hidden="true" className="h-4 w-auto text-white" />
          </span>
          <div className="text-left">
            <p className="text-sm font-medium text-white">L&apos;équipe MXL</p>
            <p className="text-xs text-neutral-500">
              Services d&apos;estimation
            </p>
          </div>
        </div>
      </div>

      <dl className="mx-auto mt-16 grid max-w-4xl reveal grid-cols-1 gap-2 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse items-center rounded-2xl bg-neutral-900/55 px-6 py-8 text-center"
          >
            <dt className="mt-2 text-sm text-neutral-400">{stat.label}</dt>
            <dd className="text-4xl font-semibold tracking-tight text-white tabular-nums sm:text-5xl">
              <StatNumber value={stat.value} suffix="+" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
