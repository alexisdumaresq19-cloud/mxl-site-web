import type { ReactNode } from "react";

import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

import { SectionHeader } from "./section-header";
import { ClaimSteps } from "./visuals/claim-steps";
import { CostBreakdown } from "./visuals/cost-breakdown";
import { ProjectTimeline } from "./visuals/project-timeline";

const details: Record<
  string,
  { title: string; description: string; visual: ReactNode }
> = {
  "apres-sinistre": {
    title: "Chaque dommage évalué, chaque coût justifié.",
    description:
      "Nous évaluons les dommages causés par le sinistre et déterminons les coûts de réparation ou de remplacement des biens endommagés, afin d'établir le montant des indemnités à verser.",
    visual: <ClaimSteps />,
  },
  ebenisterie: {
    title: "Réparer ou remplacer, au juste coût.",
    description:
      "Pour les meubles endommagés ou défectueux, nous évaluons le coût des travaux : matériaux, main-d'œuvre et, le cas échéant, démolition et reconstruction.",
    visual: <CostBreakdown />,
  },
  construction: {
    title: "Du plan aux finitions, le coût total.",
    description:
      "Pour construire un bâtiment, ou pour réparer et rénover un bâtiment existant, nous évaluons l'ensemble des coûts : matériaux, main-d'œuvre, démolition, reconstruction et autres coûts liés aux travaux.",
    visual: <ProjectTimeline />,
  },
};

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeader
        id="services-title"
        eyebrow="Nos services"
        title="Estimations précises et détaillées"
        description="Après sinistre, en ébénisterie ou en construction, chaque estimation est détaillée poste par poste."
        className="reveal"
      />

      <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
        {services.map((service, index) => {
          const detail = details[service.id];
          const Icon = service.icon;
          const visualFirst = index % 2 === 1;
          return (
            <article key={service.id} id={service.id}>
              <div className="grid reveal grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
                <div className={cn("min-w-0", visualFirst && "md:order-2")}>
                  <p className="flex items-center gap-2 text-sm font-medium text-mxl-blue-light">
                    <Icon aria-hidden="true" className="size-4" />
                    {service.title}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight text-balance text-white sm:text-3xl">
                    {detail.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-400">
                    {detail.description}
                  </p>
                  <a
                    href="#contact"
                    className="group mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-mxl-blue-light focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <span className="underline-offset-4 group-hover:underline">
                      Demander une estimation
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                </div>

                <div className={cn("min-w-0", visualFirst && "md:order-1")}>
                  <div className="overflow-hidden rounded-2xl bg-black px-4 py-6 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.8)] ring-1 ring-neutral-800/70 sm:px-6 sm:py-8">
                    {detail.visual}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
