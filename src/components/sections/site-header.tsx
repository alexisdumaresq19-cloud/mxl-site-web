import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";

import { MxlLogo } from "@/components/brand/mxl-logo";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#a-propos" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 animate-in duration-700 fade-in fill-mode-both">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Estimation MXL — accueil"
          className="rounded-md text-white transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <MxlLogo title="Estimation MXL" className="h-7 w-auto sm:h-8" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-white/70">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm transition-colors hover:text-white focus-visible:text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/estimationmxl/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Estimation MXL sur Facebook"
            className="hidden size-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/8 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-flex"
          >
            <FaFacebookF aria-hidden="true" className="size-4" />
          </a>
          <Button
            asChild
            size="lg"
            className="h-9 rounded-full px-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] hover:bg-mxl-blue-hover"
          >
            <a href="#contact">Nous joindre</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
