"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionSafe } from "./useMotionSafe";

type RevealVariant = "fade-up" | "fade" | "scale-in";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

const variants: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  once = true,
  ...rest
}: RevealProps) {
  const reduced = useMotionSafe();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const v = variants[variant];

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.18 }}
      transition={{
        duration: 0.65,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={v}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useMotionSafe();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} satisfies Variants;
