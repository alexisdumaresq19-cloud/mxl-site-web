import { BadgeCheck } from "lucide-react";

import { MxlLogo } from "@/components/brand/mxl-logo";

import {
  estimateFile,
  estimateTaxLines,
  estimateTotals,
  formatCents,
} from "../sample-estimate";

export function EstimateSummary() {
  return (
    <div
      role="img"
      aria-label="Exemple de sommaire d'estimation après sinistre : sous-total, TPS, TVQ et total estimé"
      className="@container"
    >
      <div className="flex aspect-[440/280] w-full scaled-canvas items-center justify-center [--canvas-width:440]">
        <div className="w-100 rounded-2xl bg-linear-to-b from-neutral-900 to-neutral-950 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_24px_48px_-24px_rgb(0_0_0/0.8)] ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-7 items-center rounded-md bg-mxl-blue px-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
              <MxlLogo aria-hidden="true" className="h-3 w-auto text-white" />
            </span>
            <div className="min-w-0">
              <p className="font-medium text-white">
                Sommaire de l&apos;estimation
              </p>
              <p className="text-xs text-neutral-500">
                Dossier {estimateFile.number} · {estimateFile.lossType}
              </p>
            </div>
            <span className="ml-auto rounded-full px-2 py-0.5 text-xs text-neutral-400 ring-1 ring-white/10">
              Exemple
            </span>
          </div>
          <dl className="mt-5 space-y-2">
            {estimateTaxLines.map((line) => (
              <div
                key={line.label}
                className="flex justify-between text-neutral-400"
              >
                <dt>{line.label}</dt>
                <dd className="tabular-nums">{formatCents(line.cents)}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
              <dt>Total estimé</dt>
              <dd className="tabular-nums">
                {formatCents(estimateTotals.total)}
              </dd>
            </div>
          </dl>
          <p className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
            <BadgeCheck className="size-4 text-mxl-blue-light" />
            Vérifié par l&apos;équipe MXL
          </p>
        </div>
      </div>
    </div>
  );
}
