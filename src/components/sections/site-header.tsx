"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

import { MXL_LOGO_PATH, MxlLogo } from "@/components/brand/mxl-logo";
import { Button } from "@/components/ui/button";
import { certifications, FACEBOOK_URL, navigation, services } from "@/lib/site";
import { cn } from "@/lib/utils";

const panelMotion = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.32, ease: [0.33, 1, 0.68, 1] as const },
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.26, ease: [0.65, 0, 0.35, 1] as const },
      opacity: { duration: 0.16 },
    },
  },
};

const focusRing =
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

const iconTile =
  "flex size-9 shrink-0 items-center justify-center rounded-md bg-linear-to-b from-neutral-900 to-neutral-950 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_0_rgb(255_255_255/0.08)]";

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const lastPointer = useRef<string | null>(null);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (servicesOpen) servicesTrigger.current?.focus();
      setServicesOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen, mobileOpen]);

  const closeAll = () => {
    setServicesOpen(false);
    setMobileOpen(false);
  };

  // Closing a panel cancels an in-flight smooth scroll, so menu links scroll
  // to their section only once the panel has finished closing.
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    const { hash } = event.currentTarget;
    if (hash && document.querySelector(hash)) {
      event.preventDefault();
      pendingHash.current = hash;
      window.history.pushState(null, "", hash);
    }
    closeAll();
  };

  const scrollToPending = () => {
    const target =
      pendingHash.current && document.querySelector(pendingHash.current);
    pendingHash.current = null;
    if (!target) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const onHeaderBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setServicesOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      onMouseLeave={() => setServicesOpen(false)}
      onBlur={onHeaderBlur}
    >
      <div
        className={cn(
          "relative border-b border-white/8 bg-black/80 backdrop-blur-md transition-colors",
          (servicesOpen || mobileOpen) && "bg-black",
        )}
      >
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Estimation MXL — accueil"
            onClick={closeAll}
            className={cn(
              "justify-self-start rounded-sm text-white transition-opacity hover:opacity-80",
              focusRing,
            )}
          >
            <MxlLogo title="Estimation MXL" className="h-6 w-auto" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <button
                  ref={servicesTrigger}
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="menu-services"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setServicesOpen(true);
                  }}
                  onPointerDown={(event) => {
                    lastPointer.current = event.pointerType;
                  }}
                  onClick={() => {
                    const viaMouse = lastPointer.current === "mouse";
                    lastPointer.current = null;
                    setServicesOpen((open) => (viaMouse ? true : !open));
                  }}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    servicesOpen
                      ? "text-white"
                      : "text-neutral-400 hover:text-white",
                    focusRing,
                  )}
                >
                  Services
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence onExitComplete={scrollToPending}>
                  {servicesOpen && (
                    <motion.div
                      id="menu-services"
                      {...panelMotion}
                      className="absolute inset-x-0 top-full overflow-hidden border-b border-white/8 bg-black"
                    >
                      <ServicesPanel onNavigate={navigate} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onPointerEnter={() => setServicesOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white",
                      focusRing,
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-start-3 flex items-center gap-1.5 justify-self-end">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Estimation MXL sur Facebook"
              className={cn(
                "hidden size-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/8 hover:text-white sm:inline-flex",
                focusRing,
              )}
            >
              <FaFacebookF aria-hidden="true" className="size-3.5" />
            </a>
            <Button
              asChild
              variant="brand"
              size="pill-sm"
              className="hidden sm:inline-flex"
            >
              <a href="#contact">Demander une estimation</a>
            </Button>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMobileOpen((open) => !open)}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg text-neutral-300 transition-colors hover:text-white lg:hidden",
                focusRing,
              )}
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence onExitComplete={scrollToPending}>
        {mobileOpen && (
          <motion.div
            id="menu-mobile"
            {...panelMotion}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-white/8 bg-black lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="px-5 pt-2 pb-6">
              <p className="px-2 pt-2 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                Services
              </p>
              <ul className="mt-2 flex flex-col gap-1 border-b border-white/8 pb-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <ServiceLink service={service} onNavigate={navigate} />
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col">
                {navigation.map((item) => (
                  <li key={item.href} className="border-b border-white/8">
                    <a
                      href={item.href}
                      onClick={navigate}
                      className={cn(
                        "block px-2 py-3.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white",
                        focusRing,
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2">
                <Button asChild variant="brand" size="pill" className="flex-1">
                  <a href="#contact" onClick={navigate}>
                    Demander une estimation
                  </a>
                </Button>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Estimation MXL sur Facebook"
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full bg-neutral-900 text-neutral-300 ring-1 ring-neutral-800 ring-inset",
                    focusRing,
                  )}
                >
                  <FaFacebookF aria-hidden="true" className="size-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ServiceLink({
  service,
  onNavigate,
}: {
  service: (typeof services)[number];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const Icon = service.icon;
  return (
    <a
      href={`#${service.id}`}
      onClick={onNavigate}
      className={cn(
        "group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/5",
        focusRing,
      )}
    >
      <span className={iconTile}>
        <Icon
          aria-hidden="true"
          className="size-4 text-neutral-300 transition-colors group-hover:text-mxl-blue-light"
        />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-white">{service.title}</span>
        <span className="mt-0.5 text-xs text-neutral-400">
          {service.summary}
        </span>
      </span>
    </a>
  );
}

function ServicesPanel({
  onNavigate,
}: {
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-12 gap-8 px-8 pt-5 pb-8">
      <div className="col-span-5">
        <p className="px-2 text-xs font-medium tracking-wide text-neutral-500 uppercase">
          Nos services
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceLink service={service} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </div>

      <HighlightCard
        href="#a-propos"
        title="Rapport précis garanti"
        description="Chaque estimation est détaillée, poste par poste."
        onNavigate={onNavigate}
        className="col-span-4"
      >
        <ReportArt />
      </HighlightCard>

      <HighlightCard
        href="#certifications"
        title="Formés et certifiés"
        description={certifications.map((c) => c.name).join(" · ")}
        onNavigate={onNavigate}
        className="col-span-3"
      >
        <BadgeArt />
      </HighlightCard>
    </div>
  );
}

function HighlightCard({
  href,
  title,
  description,
  onNavigate,
  className,
  children,
}: {
  href: string;
  title: string;
  description: string;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={cn("group flex flex-col rounded-lg", focusRing, className)}
    >
      <span className="flex min-h-32 flex-1 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 text-neutral-200 ring-1 ring-white/8 transition-colors group-hover:ring-white/15">
        {children}
      </span>
      <span className="pt-3 text-sm font-medium text-white">{title}</span>
      <span className="mt-0.5 text-xs text-neutral-400">{description}</span>
    </a>
  );
}

function ReportArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 128"
      className="h-auto w-full max-w-60"
      fill="none"
    >
      <rect
        x="62"
        y="14"
        width="116"
        height="100"
        rx="8"
        className="fill-neutral-900"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      {[34, 48, 62, 76].map((y, i) => (
        <g key={y}>
          <line
            x1="76"
            y1={y}
            x2={i % 2 ? 132 : 146}
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="150"
            y1={y}
            x2="164"
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
      <line
        x1="76"
        y1="96"
        x2="164"
        y2="96"
        stroke="currentColor"
        strokeOpacity="0.15"
      />
      <g transform="rotate(-8 176 92)">
        <rect x="148" y="78" width="56" height="28" rx="6" fill="#1b5df2" />
        <path
          d={MXL_LOGO_PATH}
          fill="white"
          transform="translate(156 84.4) scale(0.0467)"
        />
      </g>
    </svg>
  );
}

function BadgeArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 128"
      className="h-auto w-full max-w-44"
      fill="none"
    >
      {[
        { x: 94, y: 30, opacity: 0.15 },
        { x: 82, y: 38, opacity: 0.3 },
      ].map((layer) => (
        <rect
          key={layer.x}
          x={layer.x - 30}
          y={layer.y}
          width="60"
          height="60"
          rx="12"
          className="fill-neutral-900"
          stroke="currentColor"
          strokeOpacity={layer.opacity}
        />
      ))}
      <rect
        x="40"
        y="46"
        width="60"
        height="60"
        rx="12"
        className="fill-neutral-900"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      <circle cx="70" cy="76" r="14" stroke="#6b9bff" strokeWidth="2" />
      <path
        d="M63 76 L68 81 L77 71"
        stroke="#6b9bff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
