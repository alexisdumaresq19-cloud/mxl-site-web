"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Cycles through `words` in one box: each word rolls up and out as the next
 * one rises in, and the box eases to the new word's width. Only transform,
 * opacity and width animate, all in CSS, so the motion stays smooth even
 * while the page is busy. With reduced motion the first word stays put.
 */
export function RollingWords({
  words,
  interval = 3000,
  duration = 600,
  className,
  wordClassName,
}: {
  words: string[];
  /** Time each word stays, in milliseconds. */
  interval?: number;
  /** Length of the roll, in milliseconds. */
  duration?: number;
  className?: string;
  wordClassName?: string;
}) {
  const box = useRef<HTMLSpanElement>(null);
  const [{ index, previous }, setTurn] = useState({ index: 0, previous: -1 });
  // Unset until measured, so the server render keeps its natural width.
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (
      words.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setTurn((turn) => ({
        index: (turn.index + 1) % words.length,
        previous: turn.index,
      }));
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Fit the box to the current word before it paints, and again whenever the
  // word changes size (fonts loading, a breakpoint).
  useLayoutEffect(() => {
    const el = box.current;
    const word = el?.children[index];
    if (!el || !(word instanceof HTMLElement)) return;
    const measure = () => {
      const style = getComputedStyle(el);
      setWidth(
        word.offsetWidth +
          parseFloat(style.paddingLeft) +
          parseFloat(style.paddingRight) +
          parseFloat(style.borderLeftWidth) +
          parseFloat(style.borderRightWidth),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(word);
    return () => observer.disconnect();
  }, [index]);

  return (
    <span
      ref={box}
      style={{ width }}
      className={cn(
        "inline-grid overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        className,
      )}
    >
      {/* Every word shares one grid cell; only the current one takes up
          width, the others overflow their empty track while hidden. */}
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i === index ? undefined : true}
          style={{ animationDuration: `${duration}ms` }}
          className={cn(
            "col-start-1 row-start-1 justify-self-start whitespace-nowrap",
            i === index
              ? previous >= 0 && "animate-word-in"
              : cn("w-0", i === previous ? "animate-word-out" : "opacity-0"),
            wordClassName,
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
