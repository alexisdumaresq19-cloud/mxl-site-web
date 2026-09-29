import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { certifications, type Certification } from "@/lib/site";

// Logo marquee modeled on ForgeUI's logo-cloud02 (a Pro block). Entries show a
// text wordmark until a logo is set in src/lib/site.ts.

// One half of the track: the four entries twice, wider than the container,
// so the loop never shows a gap.
const half = [...certifications, ...certifications];

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="border-y border-white/6 bg-neutral-950/60"
    >
      <div className="mx-auto max-w-6xl reveal px-5 py-14 sm:px-8">
        <div className="text-center">
          <h2
            id="certifications-title"
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Formations et certifications
          </h2>
          <p className="mt-2 text-[15px] text-balance text-neutral-400">
            Une équipe formée auprès des organismes et sur les logiciels de
            référence du secteur.
          </p>
        </div>

        <ul className="sr-only">
          {certifications.map((certification) => (
            <li key={certification.name}>
              {certification.name} : {certification.detail}
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="group mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] motion-reduce:hidden"
        >
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...half, ...half].map((certification, index) => (
              <div key={index} className="px-8 sm:px-10">
                <CertificationMark certification={certification} />
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-10 hidden flex-wrap items-center justify-center gap-x-12 gap-y-6 motion-reduce:flex"
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
          className="h-9 w-auto opacity-85 brightness-0 invert"
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
