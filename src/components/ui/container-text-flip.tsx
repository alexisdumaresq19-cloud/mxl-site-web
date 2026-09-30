"use client";

import React, { useState, useEffect, useId } from "react";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // The first word renders fully visible (server render included); letters
  // only animate in once the words start flipping.
  const [hasFlipped, setHasFlipped] = useState(false);
  // Unset until measured, so the server render keeps the word's natural width.
  const [width, setWidth] = useState<number>();
  const textRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Fit the box to the word plus its own horizontal padding, whenever the
    // word changes or the text resizes with the viewport.
    const measure = () => {
      const text = textRef.current;
      const box = text?.parentElement;
      if (!text || !box) return;
      const style = getComputedStyle(box);
      setWidth(
        text.scrollWidth +
          parseFloat(style.paddingLeft) +
          parseFloat(style.paddingRight),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [currentWordIndex]);

  useEffect(() => {
    if (reduceMotion) return;
    const intervalId = setInterval(() => {
      setHasFlipped(true);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval, reduceMotion]);

  // Spans rather than p/div so the component can sit inside a heading.
  return (
    <motion.span
      layout
      layoutId={`words-here-${id}`}
      animate={width === undefined ? undefined : { width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg px-[15px] pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl dark:text-white",
        "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        "dark:[background:linear-gradient(to_bottom,#374151,#1f2937)]",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.span
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block whitespace-nowrap", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.span className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={
                hasFlipped ? { opacity: 0, filter: "blur(10px)" } : false
              }
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>
    </motion.span>
  );
}
