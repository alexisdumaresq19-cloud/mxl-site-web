"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const spring = { stiffness: 60, damping: 20, mass: 0.6 };
const MAX_SHIFT = 16;

export function MagneticFrame({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const x = useSpring(shiftX, spring);
  const y = useSpring(shiftY, spring);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(700px circle at ${glowX}px ${glowY}px, rgb(27 93 242 / 0.55), transparent 65%)`;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
    if (reduceMotion) return;
    const clamp = (value: number) =>
      Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, value));
    shiftX.set(clamp((event.clientX - rect.left - rect.width / 2) / 34));
    shiftY.set(clamp((event.clientY - rect.top - rect.height / 2) / 34));
  };

  const onPointerLeave = () => {
    shiftX.set(0);
    shiftY.set(0);
  };

  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="group relative rounded-2xl bg-white/3 p-2 ring-1 ring-white/6"
    >
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative overflow-hidden rounded-xl shadow-[0_50px_100px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/10">
        {children}
      </div>
    </motion.div>
  );
}
