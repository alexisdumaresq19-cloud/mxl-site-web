"use client";

import { RollingWords } from "./rolling-words";

// Aceternity's layout-text-flip look, animated with RollingWords (CSS only)
// instead of layout and blur animations, which stuttered. Drop shadows are
// left out: a filter over a moving word repaints on every frame.
export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  return (
    <>
      <span className="text-2xl font-bold tracking-tight md:text-4xl">
        {text}
      </span>

      <RollingWords
        words={words}
        interval={duration}
        duration={500}
        className="relative rounded-md border border-transparent bg-white px-4 py-2 font-sans text-2xl font-bold tracking-tight text-black shadow-sm ring shadow-black/10 ring-black/10 md:text-4xl dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10"
      />
    </>
  );
};
