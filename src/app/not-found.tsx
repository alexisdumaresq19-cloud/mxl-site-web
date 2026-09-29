import type { Metadata } from "next";
import Link from "next/link";

import { MxlLogo } from "@/components/brand/mxl-logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-16">
      <Link
        href="/"
        aria-label="Estimation MXL — accueil"
        className="absolute top-6 left-1/2 -translate-x-1/2 rounded-sm text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <MxlLogo title="Estimation MXL" className="h-6 w-auto" />
      </Link>

      <div className="relative z-10 max-w-md text-center">
        <p className="font-mono text-xs tracking-[0.25em] text-neutral-500 uppercase">
          Erreur 404
        </p>
        <h1 className="mt-4 bg-linear-to-br from-white via-white to-white/40 bg-clip-text pb-1 text-3xl leading-tight font-semibold tracking-tight text-balance text-transparent md:text-4xl">
          Cette page est introuvable
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-balance text-neutral-400">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button asChild variant="brand" size="pill" className="mt-8">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1000 220"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full select-none [mask-image:linear-gradient(to_bottom,black_35%,transparent_92%)]"
      >
        <text
          x="500"
          y="120"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="260"
          fontWeight="800"
          letterSpacing="-6"
          fill="none"
          strokeWidth="1"
          className="stroke-neutral-800"
        >
          404
        </text>
      </svg>
    </main>
  );
}
