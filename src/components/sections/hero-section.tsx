import { ArrowRight, ChevronRight } from "lucide-react";

import { MxlLogo } from "@/components/brand/mxl-logo";
import { Button } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

import { MagneticFrame } from "./magnetic-frame";
import { ReportPreview } from "./report-preview";

// Headline layout modeled on ForgeUI's hero-section12 (badge, headline with an
// inline brand tile, two pill CTAs); page styling follows the Cardinal template.

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-12 sm:px-8 md:pt-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="animate-in duration-700 fade-in fill-mode-both slide-in-from-bottom-2">
            <a
              href="#a-propos"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 py-1 pr-3 pl-1 text-sm text-neutral-300 ring-1 ring-neutral-800 transition-colors hover:bg-neutral-800/70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span className="rounded-full bg-mxl-blue px-2 py-1 text-[11px] leading-none font-semibold text-white tabular-nums shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]">
                2&#8239;500+
              </span>
              projets réalisés
              <ChevronRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <h1
            id="hero-title"
            className="mt-7 text-[2.2rem] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-white sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]"
          >
            <span className="block animate-in duration-700 fade-in fill-mode-both blur-in-6 slide-in-from-bottom-3 delay-100">
              Des estimations{" "}
              {/* A small tag beside the headline; on phones it takes its own
                  line between the two lines of the headline. */}
              <span className="mt-[0.08em] mb-[0.3em] block leading-none sm:my-0 sm:inline-block sm:align-[0.18em]">
                <ContainerTextFlip
                  words={["précises", "détaillées"]}
                  className="rounded-full px-[0.55em] pt-[0.18em] pb-[0.26em] text-[0.46em] tracking-[-0.02em] md:text-[0.46em]"
                />
              </span>
            </span>
            <span className="block animate-in duration-700 fade-in fill-mode-both blur-in-6 slide-in-from-bottom-3 delay-200">
              signées&nbsp;
              <span className="inline-flex h-[1.08em] -rotate-3 animate-stamp items-center rounded-[0.2em] bg-mxl-blue px-[0.3em] align-[-0.2em] shadow-[0_0.3em_1.1em_-0.15em_rgb(27_93_242/0.9),inset_0_1px_0_rgb(255_255_255/0.3)] ring-1 ring-white/15 transition-transform duration-300 ring-inset hover:rotate-0 motion-reduce:animate-none">
                <MxlLogo className="block h-[0.64em] w-auto text-white" />
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-in text-base leading-relaxed text-pretty text-neutral-400 duration-700 fade-in fill-mode-both slide-in-from-bottom-3 delay-300 sm:text-lg">
            Estimateurs après sinistre, nos experts en assurances et en
            sinistres évaluent chaque dommage et produisent des estimations
            précises et détaillées. Rapport précis garanti.
          </p>

          <div className="mt-8 flex w-full animate-in flex-col items-center justify-center gap-3 duration-700 fade-in fill-mode-both slide-in-from-bottom-3 delay-500 sm:w-auto sm:flex-row">
            <Button
              asChild
              variant="brand"
              size="pill"
              className="w-full sm:w-auto"
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
              variant="subtle"
              size="pill"
              className="w-full sm:w-auto"
            >
              <a href="#services">Voir nos services</a>
            </Button>
          </div>
        </div>

        <div className="relative mt-14 animate-in duration-1000 fade-in fill-mode-both slide-in-from-bottom-6 delay-700 md:mt-20">
          <MagneticFrame>
            <ReportPreview />
          </MagneticFrame>
        </div>
      </div>
    </section>
  );
}
