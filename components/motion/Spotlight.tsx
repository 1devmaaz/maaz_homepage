"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionSafe } from "./useMotionSafe";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
  size?: number;
};

export function Spotlight({ children, className, size = 420 }: SpotlightProps) {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 120, damping: 28 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 28 });
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={onMove}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
