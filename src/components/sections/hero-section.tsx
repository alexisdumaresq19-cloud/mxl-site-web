import { ArrowRight, BadgeCheck, TrendingUp } from "lucide-react";

import { MxlLogo } from "@/components/brand/mxl-logo";
import { Button } from "@/components/ui/button";

import { BlueprintBackground } from "./blueprint-background";

// Layout modeled on ForgeUI's hero-section12 (badge, headline with an inline
// brand tile, two pill CTAs), rebuilt with the MXL brand.

const certifications = [
  "IICRC WRT",
  "Xactimate avancé",
  "Symbility",
  "Amiante CNESST",
];

export function HeroSection() {
  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-mxl-ink"
    >
      <BlueprintBackground />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-32 pb-20 text-center sm:px-8 sm:pt-36 sm:pb-24">
        <p className="inline-flex animate-in items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-sm backdrop-blur-sm duration-700 fade-in fill-mode-both slide-in-from-bottom-2">
          <TrendingUp aria-hidden="true" className="size-3.5 text-mxl-blue-light" />
          <span className="font-semibold text-mxl-blue-light tabular-nums">
            2&#8239;500+
          </span>
          <span className="text-white/65">projets réalisés</span>
        </p>

        <h1
          id="hero-title"
          className="mt-7 text-[2.2rem] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]"
        >
          <span className="block animate-in duration-700 fade-in fill-mode-both blur-in-6 slide-in-from-bottom-3 delay-100">
            Des estimations précises,
          </span>
          <span className="block animate-in duration-700 fade-in fill-mode-both blur-in-6 slide-in-from-bottom-3 delay-200">
            signées&nbsp;
            <span className="inline-block h-[0.8em] -rotate-3 animate-stamp rounded-[0.18em] bg-mxl-blue px-[0.24em] pt-[0.19em] align-[-0.08em] shadow-[0_0.2em_0.6em_-0.15em_rgb(27_93_242/0.75),inset_0_1px_0_rgb(255_255_255/0.28)] transition-transform duration-300 hover:rotate-0 motion-reduce:animate-none">
              <MxlLogo className="block h-[0.42em] w-auto text-white" />
            </span>
          </span>
        </h1>

        <p className="mt-7 max-w-xl animate-in text-base leading-relaxed text-pretty text-white/65 duration-700 fade-in fill-mode-both slide-in-from-bottom-3 delay-300 sm:mt-8 sm:text-lg">
          Après sinistre, ébénisterie ou rénovation&nbsp;: nos experts en
          assurances et en sinistres produisent des estimations précises et
          détaillées. Rapport précis garanti.
        </p>

        <div className="mt-10 flex w-full animate-in flex-col items-center justify-center gap-3 duration-700 fade-in fill-mode-both slide-in-from-bottom-3 delay-500 sm:w-auto sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-full px-6 text-[0.95rem] shadow-[0_12px_32px_-10px_rgb(27_93_242/0.9),inset_0_1px_0_rgb(255_255_255/0.25)] hover:bg-mxl-blue-hover sm:w-auto"
          >
            <a href="#contact">
              Demander une estimation
              <ArrowRight
                data-icon="inline-end"
                aria-hidden="true"
                className="transition-transform group-hover/button:translate-x-0.5"
              />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-full border-white/12 bg-white/4 px-6 text-[0.95rem] text-white hover:bg-white/8 hover:text-white dark:border-white/12 dark:bg-white/4 dark:hover:bg-white/8 sm:w-auto"
          >
            <a href="#services">Voir nos services</a>
          </Button>
        </div>

        <div
          id="certifications"
          className="mt-16 animate-in duration-1000 fade-in fill-mode-both delay-700 sm:mt-20"
        >
          <p className="text-xs font-medium tracking-[0.18em] text-white/55 uppercase">
            Formés et certifiés
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm text-white/75">
            {certifications.map((certification) => (
              <li key={certification} className="inline-flex items-center gap-1.5">
                <BadgeCheck aria-hidden="true" className="size-4 text-mxl-blue-light" />
                {certification}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
