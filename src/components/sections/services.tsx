import type { ReactNode } from "react";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { WobbleCard } from "@/components/ui/wobble-card";
import { services, type Service } from "@/lib/site";
import { cn } from "@/lib/utils";

import { ClaimSteps } from "./visuals/claim-steps";
import { EstimateSummary } from "./visuals/estimate-summary";

const [evaluation, costs, report] = services;

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-2xl reveal text-center">
        <p className="text-sm font-medium text-mxl-blue-light">Nos services</p>
        <h2
          id="services-title"
          className="mt-4 flex flex-col items-center justify-center gap-3 text-white sm:flex-row"
        >
          <LayoutTextFlip
            text="Votre sinistre,"
            words={["évalué", "chiffré", "documenté"]}
          />
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-balance text-neutral-400">
          Estimateurs après sinistre, nous accompagnons chaque dossier, de
          l&apos;évaluation des dommages jusqu&apos;au montant des indemnités.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <CardSlot id={evaluation.id} className="lg:col-span-2">
          <WobbleCard
            containerClassName="h-full bg-[#1747c8] lg:min-h-[380px]"
            className="px-6 pt-10 pb-0 sm:px-10 lg:pb-10"
          >
            <CardText
              service={evaluation}
              title="Chaque dommage évalué, chaque coût chiffré."
              text="Nous évaluons les dommages causés par le sinistre et déterminons les coûts associés à la réparation ou au remplacement des biens endommagés."
              className="lg:max-w-[44%]"
            />
            <div className="mt-8 -mb-12 overflow-hidden rounded-2xl bg-black shadow-[0_24px_48px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/15 sm:mx-auto sm:max-w-md lg:absolute lg:top-10 lg:-right-10 lg:mx-0 lg:mt-0 lg:mb-0 lg:w-[56%] lg:max-w-none">
              <ClaimSteps />
            </div>
          </WobbleCard>
        </CardSlot>

        <CardSlot id={costs.id}>
          <WobbleCard
            containerClassName="h-full bg-neutral-900"
            className="flex flex-col px-6 py-10 sm:px-10"
          >
            <CardText
              service={costs}
              title="Vos biens, remis à leur état antérieur."
              text="Du bâtiment aux armoires et aux meubles, chaque bien endommagé est chiffré, qu'il faille le réparer ou le remplacer."
            />
            <div aria-hidden="true" className="mt-8 flex gap-2">
              <span className="rounded-full px-3 py-1 text-sm text-white/85 ring-1 ring-white/20">
                Réparer
              </span>
              <span className="rounded-full bg-mxl-blue px-3 py-1 text-sm text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
                Remplacer
              </span>
            </div>
          </WobbleCard>
        </CardSlot>

        <CardSlot id={report.id} className="lg:col-span-3">
          <WobbleCard
            containerClassName="h-full bg-[#0b1d4f] lg:min-h-[340px]"
            className="px-6 pt-10 pb-0 sm:px-10 lg:pb-10"
          >
            <CardText
              service={report}
              title="Un rapport précis. Garanti."
              text="Notre rapport précis et détaillé sert à déterminer le montant des indemnités à verser pour couvrir les dommages causés par le sinistre."
              className="lg:max-w-[42%]"
            />
            <div className="mt-6 -mb-6 sm:mx-auto sm:max-w-md lg:absolute lg:top-1/2 lg:right-12 lg:mx-0 lg:mt-0 lg:mb-0 lg:w-[40%] lg:-translate-y-1/2">
              <EstimateSummary />
            </div>
          </WobbleCard>
        </CardSlot>
      </div>
    </section>
  );
}

function CardText({
  service,
  title,
  text,
  className,
}: {
  service: Service;
  title: string;
  text: string;
  className?: string;
}) {
  const Icon = service.icon;
  return (
    <div className={cn("max-w-sm", className)}>
      <p className="flex items-center gap-2 text-sm font-medium text-white/85">
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        {service.title}
      </p>
      <h3 className="mt-3 text-left text-xl font-semibold tracking-[-0.015em] text-balance text-white md:text-2xl lg:text-3xl">
        {title}
      </h3>
      <p className="mt-4 text-left text-base/6 text-white/85">{text}</p>
    </div>
  );
}

// The anchor target stays untransformed while only its content animates in,
// so menu links scroll to the right position.
function CardSlot({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className={className}>
      <div className="h-full reveal">{children}</div>
    </div>
  );
}
