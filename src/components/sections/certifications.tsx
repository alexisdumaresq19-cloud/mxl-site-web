import { BadgeCheck } from "lucide-react";

import { certifications } from "@/lib/site";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="border-y border-white/6 bg-neutral-950/60"
    >
      <div className="mx-auto max-w-6xl reveal px-5 py-12 sm:px-8">
        <h2
          id="certifications-title"
          className="text-center text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase"
        >
          Formés et certifiés
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-white/8">
          {certifications.map((certification) => (
            <li
              key={certification.name}
              className="flex flex-col items-center px-4 text-center"
            >
              <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-100">
                <BadgeCheck
                  aria-hidden="true"
                  className="size-4.5 text-mxl-blue-light"
                />
                {certification.name}
              </span>
              <span className="mt-1 text-sm text-neutral-500">
                {certification.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
