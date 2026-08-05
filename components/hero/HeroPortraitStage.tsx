"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { site } from "@/data/site";
import { useMotionSafe } from "@/components/motion/useMotionSafe";

export function HeroPortraitStage() {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 100, damping: 18 });
  const y = useSpring(rawY, { stiffness: 100, damping: 18 });
  const rotateX = useTransform(y, [-20, 20], [6, -6]);
  const rotateY = useTransform(x, [-20, 20], [-6, 6]);

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(event.clientX - (rect.left + rect.width / 2));
    rawY.set(event.clientY - (rect.top + rect.height / 2));
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="hero-portrait-stage"
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="hero-portrait-glow" aria-hidden="true" />

      <svg
        className="hero-portrait-ring"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="200"
          r="168"
          stroke="url(#heroRingGrad)"
          strokeWidth="42"
          strokeDasharray="430 95"
          strokeDashoffset="48"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="heroRingGrad" x1="40" y1="40" x2="360" y2="360">
            <stop offset="0%" stopColor="var(--accent-bright)" />
            <stop offset="55%" stopColor="var(--accent)" />
            <stop
              offset="100%"
              stopColor="color-mix(in srgb, var(--accent) 75%, #8a6a28)"
            />
          </linearGradient>
        </defs>
      </svg>

      <div className="hero-portrait-photo">
        <Image
          src="/hero/maaz.webp"
          alt={`Portrait of ${site.name}`}
          width={1023}
          height={1537}
          priority
          className="h-full w-full object-cover object-[center_12%]"
        />
      </div>
    </motion.div>
  );
}
