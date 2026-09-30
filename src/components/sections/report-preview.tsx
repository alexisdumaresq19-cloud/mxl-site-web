import { BadgeCheck, Download, Printer } from "lucide-react";

import { MxlLogo } from "@/components/brand/mxl-logo";

import {
  estimateFile,
  estimateRows,
  estimateTaxLines,
  estimateTotals,
  formatCents,
} from "./sample-estimate";

const summary = [
  { label: "Type de sinistre", value: estimateFile.lossType },
  { label: "Pièces touchées", value: estimateFile.rooms },
  { label: "Date du sinistre", value: estimateFile.lossDate },
  { label: "Photos jointes", value: String(estimateFile.photos) },
];

const columns =
  "grid grid-cols-[calc(var(--u)*56)_1fr_calc(var(--u)*56)_calc(var(--u)*64)_calc(var(--u)*108)] items-center gap-x-3";

// Rows the phone layout lists; the rest are summed up in one line.
const PHONE_ROWS = 4;

// Units written out in full take a plural after a quantity ("3 jours").
const plurals: Record<string, string> = { jour: "jours", unité: "unités" };
const quantityLabel = (quantity: number, unit: string) =>
  `${quantity} ${quantity > 1 ? (plurals[unit] ?? unit) : unit}`;

export function ReportPreview() {
  return (
    <div
      role="img"
      aria-label="Exemple de rapport d'estimation MXL, détaillé poste par poste"
      className="@container"
    >
      <PhoneReport />
      <div className="relative hidden aspect-[1100/600] w-full scaled-canvas flex-col overflow-hidden bg-neutral-950 text-neutral-300 select-none [--canvas-width:1100] sm:flex">
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/8 px-5">
          <span className="flex h-7 items-center rounded-md bg-mxl-blue px-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
            <MxlLogo aria-hidden="true" className="h-3 w-auto text-white" />
          </span>
          <span className="text-sm font-medium text-white">
            Rapport d&apos;estimation
          </span>
          <span className="text-xs text-neutral-500">
            Dossier {estimateFile.number}
          </span>
          <span className="ml-auto rounded-full px-2.5 py-1 text-xs text-neutral-400 ring-1 ring-white/10">
            Exemple
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-mxl-blue/15 px-2.5 py-1 text-xs font-medium text-mxl-blue-light">
            <span className="size-1.5 rounded-full bg-mxl-blue-light" />
            Prêt à soumettre
          </span>
          {[Download, Printer].map((Icon, index) => (
            <span
              key={index}
              className="flex size-8 items-center justify-center rounded-md bg-white/4 ring-1 ring-white/8"
            >
              <Icon className="size-4 text-neutral-400" />
            </span>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[calc(var(--u)*280)_1fr]">
          <div className="flex flex-col border-r border-white/8 p-5">
            <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
              Résumé du dossier
            </p>
            <dl className="mt-4 space-y-4">
              {summary.map((entry) => (
                <div key={entry.label}>
                  <dt className="text-xs text-neutral-500">{entry.label}</dt>
                  <dd className="mt-1 text-sm text-neutral-100">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-lg bg-white/4 p-4 ring-1 ring-white/8">
              <p className="text-xs text-neutral-500">Total estimé</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-white tabular-nums">
                {formatCents(estimateTotals.total)}
              </p>
              <p className="mt-1 text-xs text-neutral-500">Taxes incluses</p>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-neutral-400">
              <BadgeCheck className="size-4 text-mxl-blue-light" />
              Vérifié par l&apos;équipe MXL
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">
                Postes d&apos;estimation
              </p>
              <p className="text-xs text-neutral-500">
                {estimateRows.length} postes
              </p>
            </div>
            <div className="mt-3 overflow-hidden rounded-lg ring-1 ring-white/8">
              <div
                className={`${columns} bg-white/3 px-4 py-2.5 text-xs font-medium tracking-wide text-neutral-500 uppercase`}
              >
                <span>Code</span>
                <span>Description</span>
                <span className="text-right">Qté</span>
                <span>Unité</span>
                <span className="text-right">Montant</span>
              </div>
              {estimateRows.map((row) => (
                <div
                  key={row.code}
                  className={`${columns} border-t border-white/6 px-4 py-3 text-sm`}
                >
                  <span className="font-mono text-xs text-neutral-500">
                    {row.code}
                  </span>
                  <span className="text-neutral-200">{row.description}</span>
                  <span className="text-right tabular-nums">
                    {row.quantity}
                  </span>
                  <span className="text-neutral-500">{row.unit}</span>
                  <span className="text-right text-white tabular-nums">
                    {formatCents(row.cents)}
                  </span>
                </div>
              ))}
            </div>
            <dl className="mt-4 ml-auto w-[calc(var(--u)*300)] space-y-2 text-sm">
              {estimateTaxLines.map((line) => (
                <div
                  key={line.label}
                  className="flex justify-between text-neutral-400"
                >
                  <dt>{line.label}</dt>
                  <dd className="tabular-nums">{formatCents(line.cents)}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-white/8 pt-2 font-semibold text-white">
                <dt>Total</dt>
                <dd className="tabular-nums">
                  {formatCents(estimateTotals.total)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[12%] bg-linear-to-t from-black to-transparent"
        />
      </div>
    </div>
  );
}

// The same report laid out for a phone screen: one column, real text sizes.
function PhoneReport() {
  const hidden = estimateRows.length - PHONE_ROWS;
  return (
    <div className="bg-neutral-950 text-neutral-300 select-none sm:hidden">
      <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3">
        <span className="flex h-7 shrink-0 items-center rounded-md bg-mxl-blue px-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
          <MxlLogo aria-hidden="true" className="h-3 w-auto text-white" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            Rapport d&apos;estimation
          </p>
          <p className="truncate text-xs text-neutral-500">
            Dossier {estimateFile.number}
          </p>
        </div>
        <span className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] text-neutral-400 ring-1 ring-white/10">
          Exemple
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-white/8 px-4 py-4">
        {summary.map((entry) => (
          <div key={entry.label} className="min-w-0">
            <dt className="text-[11px] text-neutral-500">{entry.label}</dt>
            <dd className="mt-0.5 text-[13px] leading-snug text-neutral-100">
              {entry.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium text-white">
            Postes d&apos;estimation
          </p>
          <p className="text-[11px] text-neutral-500">
            {estimateRows.length} postes
          </p>
        </div>
        <ul className="mt-1.5 divide-y divide-white/6">
          {estimateRows.slice(0, PHONE_ROWS).map((row) => (
            <li key={row.code} className="flex items-center gap-3 py-2.5">
              <span className="w-8 shrink-0 font-mono text-[10px] text-neutral-500">
                {row.code}
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 text-[13px] leading-snug text-neutral-200">
                  {row.description}
                </span>
                <span className="mt-0.5 block text-[11px] text-neutral-500 tabular-nums">
                  {quantityLabel(row.quantity, row.unit)}
                </span>
              </span>
              <span className="shrink-0 text-[13px] text-white tabular-nums">
                {formatCents(row.cents)}
              </span>
            </li>
          ))}
        </ul>
        {hidden > 0 && (
          <p className="border-t border-white/6 py-2.5 text-[11px] text-neutral-500">
            + {hidden} autres postes
          </p>
        )}
      </div>

      <dl className="mx-4 space-y-1.5 rounded-lg bg-white/4 p-3.5 text-[13px] ring-1 ring-white/8">
        {estimateTaxLines.map((line) => (
          <div
            key={line.label}
            className="flex justify-between text-neutral-400"
          >
            <dt>{line.label}</dt>
            <dd className="tabular-nums">{formatCents(line.cents)}</dd>
          </div>
        ))}
        <div className="flex justify-between border-t border-white/8 pt-2 text-[15px] font-semibold text-white">
          <dt>Total estimé</dt>
          <dd className="tabular-nums">{formatCents(estimateTotals.total)}</dd>
        </div>
      </dl>

      <p className="flex items-center gap-2 px-4 py-4 text-xs text-neutral-400">
        <BadgeCheck className="size-4 text-mxl-blue-light" />
        Vérifié par l&apos;équipe MXL
      </p>
    </div>
  );
}
