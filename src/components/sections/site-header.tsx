"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { GraduationCap, ShieldCheck, type LucideIcon } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";

import { MxlLogo } from "@/components/brand/mxl-logo";
import { FACEBOOK_URL, navigation, services } from "@/lib/site";
import { cn } from "@/lib/utils";

type MenuItem = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

// The Services menu: the three services, then what backs every estimate.
const serviceItems: MenuItem[] = services.map((service) => ({
  href: `#${service.id}`,
  title: service.menuTitle ?? service.title,
  description: service.summary,
  icon: service.icon,
}));

const highlightItems: MenuItem[] = [
  {
    href: "#a-propos",
    title: "Rapport précis garanti",
    description: "Détaillé, poste par poste.",
    icon: ShieldCheck,
  },
  {
    href: "#certifications",
    title: "Formés et certifiés",
    description: "IICRC, Xactimate, Symbility, CNESST.",
    icon: GraduationCap,
  },
];

type Navigate = (event: MouseEvent<HTMLAnchorElement>) => void;

const heightMotion = {
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

const dropdownMotion = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as const },
  },
};

const focusRing =
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

// Dark gradient surface with a hairline inner border, for buttons and icons.
const raisedSurface =
  "bg-linear-to-b from-neutral-900 to-neutral-950 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_0_0_rgb(255_255_255/0.08),0_6px_18px_-12px_rgb(0_0_0/0.5)]";

const ctaButton = cn(
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-[13px] font-medium whitespace-nowrap text-white transition-colors duration-150 hover:from-neutral-950 hover:to-neutral-950",
  raisedSurface,
  focusRing,
);

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const lastPointer = useRef<string | null>(null);
  const pendingHash = useRef<string | null>(null);

  // Once the page scrolls, the bar narrows and frosts over the content.
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );

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
  const navigate: Navigate = (event) => {
    const { hash } = event.currentTarget;
    if (hash && document.querySelector(hash)) {
      event.preventDefault();
      pendingHash.current = hash;
      window.history.pushState(null, "", hash);
    }
    closeAll();
  };

  // Links outside the panels only wait for a panel that is open.
  const follow: Navigate = (event) => {
    if (servicesOpen || mobileOpen) navigate(event);
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

  const onServicesBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setServicesOpen(false);
    }
  };

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full px-2 pt-2">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 rounded-xl border border-transparent px-4 transition-[max-width,background-color,border-color,backdrop-filter] duration-300 ease-in-out lg:grid lg:grid-cols-[1fr_auto_1fr]",
          scrolled &&
            "max-w-6xl border-neutral-800/40 bg-neutral-900/30 backdrop-blur-lg",
        )}
      >
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
          <ul
            className="relative flex h-fit items-center gap-6"
            onMouseLeave={() => setServicesOpen(false)}
          >
            <li onBlur={onServicesBlur}>
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
                  "flex items-center gap-1 rounded-md p-2 text-[13.5px] font-medium transition-colors",
                  servicesOpen
                    ? "text-neutral-50"
                    : "text-neutral-400 hover:text-neutral-50",
                  focusRing,
                )}
              >
                Services
                <MdKeyboardArrowDown
                  aria-hidden="true"
                  className={cn(
                    "mt-1 size-3 transition-transform duration-200",
                    servicesOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence onExitComplete={scrollToPending}>
                {servicesOpen && (
                  <motion.div
                    id="menu-services"
                    {...dropdownMotion}
                    className="absolute top-9 -left-16 w-150 rounded-lg bg-neutral-950 p-1 shadow-lg ring-1 ring-neutral-800/60"
                  >
                    <div className="grid grid-cols-2 divide-x divide-neutral-800/80 rounded-md bg-neutral-950 ring-1 ring-neutral-800/80">
                      {[serviceItems, highlightItems].map((column) => (
                        <ul
                          key={column[0].href}
                          className="flex flex-col gap-2 p-2"
                        >
                          {column.map((item) => (
                            <li key={item.href}>
                              <MenuLink item={item} onNavigate={navigate} />
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
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
                    "block rounded-md p-2 text-[13.5px] font-medium text-neutral-400 transition-colors hover:text-neutral-50",
                    focusRing,
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center gap-3 justify-self-end">
          <a
            href="#contact"
            onClick={follow}
            className={cn(ctaButton, "hidden min-[375px]:inline-flex")}
          >
            Demander une estimation
          </a>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className={cn(
              "flex items-center justify-center rounded-md p-2 text-white transition-colors duration-100 hover:bg-neutral-900 lg:hidden",
              focusRing,
            )}
          >
            {mobileOpen ? (
              <HiX aria-hidden="true" className="size-5" />
            ) : (
              <HiMenuAlt2 aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence onExitComplete={scrollToPending}>
        {mobileOpen && (
          <motion.div
            id="menu-mobile"
            {...heightMotion}
            className="pointer-events-auto absolute inset-x-2 top-full mt-2 overflow-hidden rounded-xl border border-neutral-800/60 bg-black shadow-lg lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="flex flex-col p-4">
              <div className="border-b border-neutral-800">
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="menu-mobile-services"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm py-4 text-sm font-medium transition-colors",
                    mobileServicesOpen
                      ? "text-neutral-50"
                      : "text-neutral-400 hover:text-neutral-50",
                    focusRing,
                  )}
                >
                  Services
                  <MdKeyboardArrowDown
                    aria-hidden="true"
                    className={cn(
                      "size-5 transition-transform duration-300",
                      mobileServicesOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      id="menu-mobile-services"
                      {...heightMotion}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-1 pb-3">
                        {[...serviceItems, ...highlightItems].map((item) => (
                          <li key={item.href}>
                            <MenuLink
                              item={item}
                              onNavigate={navigate}
                              compact
                            />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <ul className="flex flex-col">
                {navigation.map((item) => (
                  <li key={item.href} className="border-b border-neutral-800">
                    <a
                      href={item.href}
                      onClick={navigate}
                      className={cn(
                        "block rounded-sm py-4 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-50",
                        focusRing,
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-between rounded-sm py-4 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-50",
                      focusRing,
                    )}
                  >
                    Facebook
                    <FaFacebookF aria-hidden="true" className="size-4" />
                  </a>
                </li>
              </ul>
              <a
                href="#contact"
                onClick={navigate}
                className={cn(
                  ctaButton,
                  "mt-2 py-2.5 text-sm min-[375px]:hidden",
                )}
              >
                Demander une estimation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuLink({
  item,
  onNavigate,
  compact = false,
}: {
  item: MenuItem;
  onNavigate: Navigate;
  compact?: boolean;
}) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group block rounded-lg p-2 transition-colors hover:bg-neutral-900 active:bg-neutral-900",
        focusRing,
      )}
    >
      <span className={cn("flex items-center", compact ? "gap-3" : "gap-2")}>
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-sm",
            compact ? "size-9" : "size-10",
            raisedSurface,
          )}
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.75}
            className={cn(
              "text-neutral-300 transition-colors group-hover:text-white",
              compact ? "size-4" : "size-4.5",
            )}
          />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-sm font-medium text-neutral-50">
            {item.title}
          </span>
          <span
            className={cn("text-xs text-neutral-400", compact && "truncate")}
          >
            {item.description}
          </span>
        </span>
      </span>
    </a>
  );
}
