"use client";

import { useEffect, useRef } from "react";

export function BlueprintBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const section = layer?.parentElement;
    if (!layer || !section) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reducedMotion.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        layer.style.setProperty("--x", `${event.clientX - rect.left}px`);
        layer.style.setProperty("--y", `${event.clientY - rect.top}px`);
        layer.style.setProperty("--spot", "1");
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      layer.style.setProperty("--spot", "0");
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [--spot:0] [--x:50%] [--y:40%]"
    >
      <div className="bg-blueprint absolute inset-0 [--blueprint-major:rgb(255_255_255/0.06)] [--blueprint-minor:rgb(255_255_255/0.025)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_42%,#000_15%,transparent_75%)]" />
      <div className="bg-blueprint absolute inset-0 opacity-(--spot) transition-opacity duration-700 [--blueprint-major:rgb(107_155_255/0.45)] [--blueprint-minor:rgb(107_155_255/0.16)] [mask-image:radial-gradient(280px_circle_at_var(--x)_var(--y),#000,transparent)]" />
      <div className="absolute top-0 left-1/2 h-[620px] w-[1100px] max-w-[160vw] -translate-x-1/2 -translate-y-[38%] bg-[radial-gradient(closest-side,rgb(27_93_242/0.3),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-mxl-ink" />
    </div>
  );
}
