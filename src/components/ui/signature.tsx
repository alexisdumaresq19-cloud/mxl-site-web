"use client";

/*
 * The signature from the footer-signature component of ui-lab
 * (https://github.com/xevrion/ui-lab), without the rest of that footer.
 *
 * MIT License
 *
 * Copyright (c) 2026 Yash Bavadiya
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* The pen's speed comes from the path itself. The path is sampled once, each
   sample gets a cost from how sharply the line turns there, and time is spent
   in proportion to that cost. So the pen races down straight strokes and
   slows through loops, the way a hand does. By default the ink is three
   copies of the same stroke nudged along a slanted nib, which makes strokes
   heavier in one direction than the other, like a broad-edged pen; without
   the nib it is a single stroke of even width, like a felt pen. */

// A quick, practised signature. It plays once, so it may run past the usual
// UI budget; any faster and the slowdown through loops stops reading.
const DURATION = 700;
// How strongly a turn slows the pen. At 0 the pen moves at constant speed.
const CURVE_DRAG = 10;
// Samples along the path, enough for a smooth cost curve.
const SAMPLES = 360;
// Samples on each side over which a slowdown is spread, so the pen eases
// into a sharp turn or a pen lift and out of it instead of stopping dead.
const EASE_SPAN = 10;
// The slant of the nib, in path units: each copy of the stroke is shifted
// this much further up and to the right.
const NIB_STEP = 1.4;
const NIB_COPIES = 3;

type Timing = { lengths: Float32Array; times: Float32Array };

function buildTiming(path: SVGPathElement): Timing {
  const total = path.getTotalLength();
  const pts = Array.from({ length: SAMPLES + 1 }, (_, i) =>
    path.getPointAtLength((total * i) / SAMPLES),
  );
  const lengths = new Float32Array(SAMPLES + 1);
  const costs = new Float32Array(SAMPLES + 1);
  for (let i = 1; i <= SAMPLES; i++) {
    lengths[i] = (total * i) / SAMPLES;
    const a = pts[Math.max(0, i - 2)];
    const b = pts[i - 1];
    const c = pts[i];
    const turn = Math.abs(
      Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(b.y - a.y, b.x - a.x),
    );
    // A jump to a new subpath reads as a sharp turn too, so a pen lift gets
    // a natural beat of stillness for free.
    const bend = Math.min(turn, 2 * Math.PI - turn);
    costs[i] = 1 + CURVE_DRAG * bend;
  }
  const times = new Float32Array(SAMPLES + 1);
  let t = 0;
  for (let i = 1; i <= SAMPLES; i++) {
    const from = Math.max(1, i - EASE_SPAN);
    const to = Math.min(SAMPLES, i + EASE_SPAN);
    let sum = 0;
    for (let j = from; j <= to; j++) sum += costs[j];
    t += sum / (to - from + 1);
    times[i] = t;
  }
  for (let i = 0; i <= SAMPLES; i++) times[i] /= t;
  return { lengths, times };
}

// Time is normalized 0..1; returns the path length drawn by then.
function lengthAt({ lengths, times }: Timing, time: number) {
  let lo = 0;
  let hi = times.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (times[mid] < time) lo = mid;
    else hi = mid;
  }
  const span = times[hi] - times[lo] || 1;
  return (
    lengths[lo] + ((time - times[lo]) / span) * (lengths[hi] - lengths[lo])
  );
}

// A gentle start and a slightly quicker finish, like setting the pen down
// and flicking it off the page.
const penEase = (x: number) =>
  x < 0.08 ? (x / 0.08) ** 2 * 0.04 : 0.04 + (x - 0.08) * (0.96 / 0.92);

/** A filled shape of the real artwork, uncovered by some of the pen's strokes. */
export type SignatureReveal = {
  /** The shape's path, in the same coordinates as the signature. */
  d: string;
  /** Indexes of the signature's subpaths that uncover it. */
  strokes: number[];
};

/**
 * Writes `signature` by hand the first time it is fully in view. Extra
 * subpaths (a crossbar, the dot of an i) are written after a short pen lift;
 * start each one with an absolute "M".
 *
 * With `reveal`, the strokes are not drawn themselves: they uncover filled
 * shapes, such as the letters of a logo, so the artwork appears in writing
 * order and ends exactly as designed. Each shape only shows through its own
 * strokes, so a wide pen never uncovers a neighbouring letter early. These
 * strokes have flat ends, so start and end each one just outside its shape:
 * the letter then fills in from its edge rather than appearing as a dot.
 */
export function Signature({
  signature,
  viewBox,
  label,
  strokeWidth = 2.6,
  nib = true,
  duration = DURATION,
  reveal,
  className,
}: {
  signature: string;
  viewBox: string;
  label: string;
  /** Pen width, in path units. */
  strokeWidth?: number;
  /** Broad-edged nib (thick and thin strokes) or an even felt pen. */
  nib?: boolean;
  /** Time to write the whole signature, in milliseconds. */
  duration?: number;
  reveal?: SignatureReveal[];
  className?: string;
}) {
  const id = useId().replace(/[^\w-]/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const measure = useRef<SVGPathElement>(null);
  // Once written, revealed shapes drop their masks and render as plain paths.
  const [written, setWritten] = useState(false);
  const subpaths = useMemo(
    () =>
      signature
        .split(/(?=M)/)
        .map((d) => d.trim())
        .filter(Boolean),
    [signature],
  );

  useEffect(() => {
    const el = svg.current;
    const path = measure.current;
    if (!el || !path) return;
    const strokes = Array.from(
      el.querySelectorAll<SVGPathElement>("path[data-subpath]"),
    );
    const total = path.getTotalLength();
    const parts = subpaths.map(
      (_, k) =>
        strokes
          .find((s) => s.dataset.subpath === String(k))
          ?.getTotalLength() ?? 0,
    );
    const starts = parts.map((_, k) =>
      parts.slice(0, k).reduce((a, b) => a + b, 0),
    );
    const setDrawn = (len: number) => {
      for (const s of strokes) {
        const k = Number(s.dataset.subpath);
        const part = parts[k];
        const drawn = Math.min(part, Math.max(0, len - starts[k]));
        s.style.strokeDasharray = `${part} ${part + 1}`;
        s.style.strokeDashoffset = String(part - drawn);
        // A zero-length dash still paints its round caps, as a dot.
        s.style.visibility = drawn > 0 ? "visible" : "hidden";
      }
    };
    setDrawn(0);

    let frame = 0;
    let start = 0;
    let pausedAt = 0;
    let timing: Timing | null = null;
    let finished = false;

    const finish = () => {
      finished = true;
      frame = 0;
      setWritten(true);
    };

    const tick = (now: number) => {
      if (!timing) return;
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      setDrawn(lengthAt(timing, penEase(p)));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    // Wait until the whole signature is on screen, or it would be half
    // written before anyone looks at it.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || finished || frame || pausedAt) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDrawn(total);
          finish();
          return;
        }
        timing ??= buildTiming(path);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 1 },
    );
    io.observe(el);

    // Pause with the tab; resume from the same point rather than skipping.
    const onVisibility = () => {
      if (!frame && !pausedAt) return;
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        pausedAt = performance.now();
      } else if (!document.hidden && pausedAt) {
        start += performance.now() - pausedAt;
        pausedAt = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [subpaths, duration]);

  return (
    <svg
      ref={svg}
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className={cn("overflow-visible", className)}
    >
      <path ref={measure} d={signature} fill="none" stroke="none" />
      {reveal ? (
        <>
          <defs>
            {reveal.map((shape, i) => (
              <mask key={i} id={`${id}-${i}`}>
                {shape.strokes.map((k) => (
                  <Stroke
                    key={k}
                    index={k}
                    d={subpaths[k]}
                    width={strokeWidth}
                    color="white"
                    cap="butt"
                  />
                ))}
              </mask>
            ))}
          </defs>
          {reveal.map((shape, i) => (
            <path
              key={i}
              d={shape.d}
              fill="currentColor"
              mask={written ? undefined : `url(#${id}-${i})`}
            />
          ))}
        </>
      ) : (
        Array.from({ length: nib ? NIB_COPIES : 1 }, (_, copy) => (
          <g
            key={copy}
            transform={`translate(${copy * NIB_STEP} ${-copy * NIB_STEP})`}
          >
            {subpaths.map((d, k) => (
              <Stroke
                key={k}
                index={k}
                d={d}
                width={strokeWidth}
                color="currentColor"
              />
            ))}
          </g>
        ))
      )}
    </svg>
  );
}

// One element per subpath: browsers restart the dash at every moveto, so a
// single path would show the crossbar before the pen ever got there.
function Stroke({
  index,
  d,
  width,
  color,
  cap = "round",
}: {
  index: number;
  d: string;
  width: number;
  color: string;
  cap?: "round" | "butt";
}) {
  return (
    <path
      data-subpath={index}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap={cap}
      strokeLinejoin="round"
      // Hidden until the first frame sets the dash, so nothing flashes fully
      // drawn before JavaScript runs.
      style={{ visibility: "hidden" }}
    />
  );
}
