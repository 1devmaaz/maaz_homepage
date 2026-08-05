"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { useMotionSafe } from "@/components/motion/useMotionSafe";

type CountUpProps = {
  value: number;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (reduced || !inView || started.current) return;
    started.current = true;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, motionValue, reduced, value, duration]);

  const shown = reduced ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString("en-US")}
    </span>
  );
}
