"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";

// Renders the real value on the server, then counts up from zero the first
// time the number scrolls into view.
export function StatNumber({
  value,
  suffix,
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let armed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          armed = true;
          setDisplayed(0);
        } else if (armed) {
          setDisplayed(value);
          observer.disconnect();
        } else {
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      <NumberFlow value={displayed} locales="fr-CA" suffix={suffix} />
    </span>
  );
}
