import {
  Check,
  FileText,
  Hammer,
  HandCoins,
  RefreshCw,
  SearchCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

// The after-claim estimate as described on estimationmxl.com.
const steps = [
  { label: "Évaluation des dommages", icon: SearchCheck, state: "done" },
  { label: "Coûts de réparation", icon: Hammer, state: "done" },
  { label: "Coûts de remplacement", icon: RefreshCw, state: "active" },
  { label: "Rapport détaillé", icon: FileText, state: "todo" },
  { label: "Montant des indemnités", icon: HandCoins, state: "todo" },
] as const;

export function ClaimSteps() {
  return (
    <div
      role="img"
      aria-label="Étapes d'une estimation après sinistre : évaluation des dommages, coûts de réparation et de remplacement, rapport détaillé et montant des indemnités"
      className="@container"
    >
      <div className="relative aspect-[460/300] w-full scaled-canvas overflow-hidden [--canvas-width:460]">
        <ol className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2.5">
          {steps.map((step) => {
            const active = step.state === "active";
            const Icon = step.icon;
            return (
              <li
                key={step.label}
                className={cn(
                  "flex h-11 w-80 items-center gap-3 rounded-xl px-4 ring-1",
                  active
                    ? "bg-mxl-blue/12 ring-mxl-blue/45"
                    : "bg-white/4 ring-white/6",
                )}
              >
                <Icon
                  className={cn(
                    "size-5 shrink-0",
                    active ? "text-mxl-blue-light" : "text-neutral-300",
                  )}
                />
                <span className={active ? "text-white" : "text-neutral-300"}>
                  {step.label}
                </span>
                {step.state === "done" && (
                  <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-white/8">
                    <Check className="size-3 text-neutral-300" />
                  </span>
                )}
                {active && (
                  <span className="ml-auto rounded-md bg-mxl-blue px-2 py-0.5 text-xs font-medium text-white">
                    En cours
                  </span>
                )}
                {step.state === "todo" && (
                  <span className="ml-auto size-5 rounded-full ring-1 ring-white/15" />
                )}
              </li>
            );
          })}
        </ol>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
