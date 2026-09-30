import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";

import { MXL_LOGO_PATH } from "@/components/brand/mxl-logo";
import {
  MXL_LOGO_PEN,
  MXL_LOGO_PEN_WIDTH,
  MXL_LOGO_REVEAL,
  MXL_LOGO_VIEWBOX,
} from "@/components/brand/mxl-signature";
import { Signature } from "@/components/ui/signature";
import { FACEBOOK_URL, navigation, services } from "@/lib/site";

const linkClass =
  "rounded-sm text-sm text-neutral-400 transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

const columns = [
  {
    title: "Services",
    links: services.map((service) => ({
      label: service.title,
      href: `#${service.id}`,
    })),
  },
  {
    title: "Entreprise",
    links: navigation.map(({ label, href }) => ({ label, href })),
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-white/8 px-5 pt-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            {/* The real logo, signed stroke by stroke when it comes into view. */}
            <Link
              href="/"
              aria-label="Estimation MXL — accueil"
              className="inline-block rounded-sm text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Signature
                signature={MXL_LOGO_PEN}
                viewBox={MXL_LOGO_VIEWBOX}
                strokeWidth={MXL_LOGO_PEN_WIDTH}
                duration={1100}
                reveal={MXL_LOGO_REVEAL}
                label="Estimation MXL"
                className="block h-8 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-neutral-400">
              Estimateurs après sinistre. Des estimations précises et
              détaillées, rapport précis garanti.
            </p>
          </div>

          <nav
            aria-label="Pied de page"
            className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:gap-x-16"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium text-white">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-sm font-medium text-white">Suivez-nous</h2>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-dashed border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Estimation MXL. Tous droits réservés.
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Estimation MXL sur Facebook"
            className="w-fit rounded-sm text-neutral-500 transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <FaFacebookF aria-hidden="true" className="size-4" />
          </a>
        </div>

        <svg
          aria-hidden="true"
          viewBox="-4 -4 865 333"
          className="mt-12 -mb-[6%] h-auto w-full text-neutral-800 select-none [mask-image:linear-gradient(to_bottom,black_30%,transparent_90%)]"
        >
          <path
            d={MXL_LOGO_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </footer>
  );
}
