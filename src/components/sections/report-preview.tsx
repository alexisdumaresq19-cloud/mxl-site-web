import { BadgeCheck, Download, Printer } from "lucide-react";

import { MxlLogo } from "@/components/brand/mxl-logo";

// Sample figures for the hero illustration only (labelled "Exemple" in the UI).
const lineItems = [
  {
    code: "DÉM",
    description: "Retrait du gypse endommagé",
    quantity: 48,
    unit: "pi²",
    unitPrice: 2.1,
  },
  {
    code: "ASS",
    description: "Assèchement, déshumidificateur",
    quantity: 3,
    unit: "jour",
    unitPrice: 95,
  },
  {
    code: "GYP",
    description: "Gypse 1/2 po, pose et joints",
    quantity: 48,
    unit: "pi²",
    unitPrice: 4.25,
  },
  {
    code: "PNT",
    description: "Apprêt et peinture, 2 couches",
    quantity: 320,
    unit: "pi²",
    unitPrice: 1.85,
  },
  {
    code: "MOU",
    description: "Plinthes MDF 5 po",
    quantity: 24,
    unit: "pi lin.",
    unitPrice: 6.5,
  },
  {
    code: "ÉBÉ",
    description: "Caisson bas 24 po, remplacement",
    quantity: 1,
    unit: "unité",
    unitPrice: 640,
  },
];

const TPS_RATE = 0.05;
const TVQ_RATE = 0.09975;

const currency = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
});
const formatCents = (cents: number) => currency.format(cents / 100);

const rows = lineItems.map((item) => ({
  ...item,
  cents: Math.round(item.quantity * item.unitPrice * 100),
}));
const subtotal = rows.reduce((sum, row) => sum + row.cents, 0);
const tps = Math.round(subtotal * TPS_RATE);
const tvq = Math.round(subtotal * TVQ_RATE);
const total = subtotal + tps + tvq;

const summary = [
  { label: "Type de sinistre", value: "Dégât d'eau" },
  { label: "Pièces touchées", value: "Sous-sol, salle de lavage" },
  { label: "Date d'inspection", value: "12 septembre 2026" },
  { label: "Photos jointes", value: "24" },
];

const columns =
  "grid grid-cols-[calc(var(--u)*56)_1fr_calc(var(--u)*56)_calc(var(--u)*64)_calc(var(--u)*108)] items-center gap-x-3";

export function ReportPreview() {
  return (
    <div
      role="img"
      aria-label="Exemple de rapport d'estimation MXL, détaillé poste par poste"
      className="@container"
    >
      <div className="relative flex aspect-[1100/600] w-full scaled-canvas flex-col overflow-hidden bg-neutral-950 text-neutral-300 select-none [--canvas-width:1100]">
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/8 px-5">
          <span className="flex h-7 items-center rounded-md bg-mxl-blue px-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
            <MxlLogo aria-hidden="true" className="h-3 w-auto text-white" />
          </span>
          <span className="text-sm font-medium text-white">
            Rapport d&apos;estimation
          </span>
          <span className="text-xs text-neutral-500">Dossier 2026-0418</span>
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
                {formatCents(total)}
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
              <p className="text-xs text-neutral-500">{rows.length} postes</p>
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
              {rows.map((row) => (
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
              {[
                { label: "Sous-total", cents: subtotal },
                { label: "TPS (5 %)", cents: tps },
                { label: "TVQ (9,975 %)", cents: tvq },
              ].map((line) => (
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
                <dd className="tabular-nums">{formatCents(total)}</dd>
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
