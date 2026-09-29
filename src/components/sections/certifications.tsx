import Image from "next/image";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

import { certifications, type Certification } from "@/lib/site";

// Call to action over a logo marquee, modeled on ForgeUI's call-to-action03
// (a Pro block). Entries show a text wordmark until a logo is set in
// src/lib/site.ts.

// One half of the track: the four entries twice, wider than the container,
// so the loop never shows a gap.
const half = [...certifications, ...certifications];

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="overflow-hidden border-t border-white/6 px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto flex max-w-2xl reveal flex-col items-center text-center">
        <h2
          id="certifications-title"
          className="bg-linear-to-br from-white via-white to-white/40 bg-clip-text text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-transparent sm:text-5xl"
        >
          {/* Separate blocks, so each line balances on its own. */}
          <span className="block">Un sinistre à estimer?</span>{" "}
          <span className="block">Nos experts s&apos;en chargent.</span>
        </h2>
        <CallButton href="#contact">Parlons de votre sinistre</CallButton>
      </div>

      <div className="mx-auto mt-16 max-w-5xl reveal">
        <h3
          id="certifications-list-title"
          className="text-center text-xs text-neutral-400"
        >
          Formations et certifications de notre équipe
        </h3>

        <ul aria-labelledby="certifications-list-title" className="sr-only">
          {certifications.map((certification) => (
            <li key={certification.name}>
              {certification.name} : {certification.detail}
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="group mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)] motion-reduce:hidden"
        >
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...half, ...half].map((certification, index) => (
              <div key={index} className="px-8">
                <CertificationMark certification={certification} />
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-8 hidden flex-wrap items-center justify-center gap-x-16 gap-y-6 motion-reduce:flex"
        >
          {certifications.map((certification) => (
            <CertificationMark
              key={certification.name}
              certification={certification}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Pill link whose icon disc floods the whole pill on hover or keyboard focus.
function CallButton({ href, children }: { href: string; children: string }) {
  const icon = <ArrowUpRight aria-hidden="true" className="size-4" />;
  return (
    <a
      href={href}
      className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-neutral-900 py-1 pr-6 pl-1 text-sm font-medium text-neutral-100 ring-1 ring-neutral-800 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mxl-blue-light"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-neutral-900">
        {icon}
      </span>
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-1 flex items-center gap-3 rounded-full bg-neutral-50 text-neutral-900 [clip-path:circle(1.125rem_at_1.125rem_50%)] transition-[clip-path] duration-500 ease-out group-hover:[clip-path:circle(150%_at_1.125rem_50%)] group-focus-visible:[clip-path:circle(150%_at_1.125rem_50%)] motion-reduce:transition-none"
      >
        <span className="flex size-9 shrink-0 items-center justify-center">
          {icon}
        </span>
        {children}
      </span>
    </a>
  );
}

function CertificationMark({
  certification,
}: {
  certification: Certification;
}) {
  if (certification.logo) {
    return (
      <span className="flex flex-col items-center gap-2">
        <Image
          src={certification.logo.src}
          width={certification.logo.width}
          height={certification.logo.height}
          alt=""
          className="h-8 w-auto opacity-85 brightness-0 invert"
        />
        <span className="text-xs whitespace-nowrap text-neutral-500">
          {certification.detail}
        </span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <BadgeCheck className="size-5 text-mxl-blue-light" />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-semibold tracking-tight text-neutral-100">
          {certification.name}
        </span>
        <span className="text-xs text-neutral-500">{certification.detail}</span>
      </span>
    </span>
  );
}
