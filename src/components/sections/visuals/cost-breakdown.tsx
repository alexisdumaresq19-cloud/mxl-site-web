import { Hammer, HardHat, Package } from "lucide-react";

import { cn } from "@/lib/utils";

// Illustrative split, labelled "Exemple" in the card.
const parts = [
  { label: "Matériaux", share: 48, icon: Package, color: "bg-mxl-blue" },
  {
    label: "Main-d'œuvre",
    share: 36,
    icon: HardHat,
    color: "bg-mxl-blue-light",
  },
  {
    label: "Démolition et reconstruction",
    share: 16,
    icon: Hammer,
    color: "bg-neutral-500",
  },
];

export function CostBreakdown() {
  return (
    <div
      role="img"
      aria-label="Exemple de répartition d'une estimation en ébénisterie : matériaux, main-d'œuvre, démolition et reconstruction"
      className="@container"
    >
      <div className="relative flex aspect-[460/300] w-full scaled-canvas items-center justify-center [--canvas-width:460]">
        <div className="w-90 rounded-2xl bg-linear-to-b from-neutral-900 to-neutral-950 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)] ring-1 ring-white/8">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-white">Armoires de cuisine</p>
              <p className="mt-0.5 text-xs text-neutral-500">
                Répartition de l&apos;estimation
              </p>
            </div>
            <span className="rounded-full px-2 py-0.5 text-xs text-neutral-400 ring-1 ring-white/10">
              Exemple
            </span>
          </div>
          <div className="mt-5 flex h-2.5 gap-1 overflow-hidden rounded-full">
            {parts.map((part) => (
              <span
                key={part.label}
                className={cn("h-full rounded-full", part.color)}
                style={{ width: `${part.share}%` }}
              />
            ))}
          </div>
          <ul className="mt-5 space-y-3">
            {parts.map((part) => {
              const Icon = part.icon;
              return (
                <li key={part.label} className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/8">
                    <Icon className="size-4 text-neutral-300" />
                  </span>
                  <span className="text-neutral-200">{part.label}</span>
                  <span className="ml-auto flex items-center gap-2 text-neutral-400 tabular-nums">
                    <span className={cn("size-2 rounded-full", part.color)} />
                    {part.share}&nbsp;%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
