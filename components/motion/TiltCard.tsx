"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionSafe } from "./useMotionSafe";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
};

export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 22 });
  const y = useSpring(rawY, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 55%)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative h-full [perspective:900px]", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="relative h-full will-change-transform"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300 [[data-tilted]_&]:opacity-100 group-hover:opacity-100"
          style={{ background: glare, borderRadius: "inherit" }}
        />
      </motion.div>
    </motion.div>
  );
}
