"use client";

import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

type ButtonProps = React.ComponentProps<"a"> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-ink text-surface hover:bg-ink/90 border border-ink",
  secondary:
    "bg-accent text-ink hover:bg-accent-bright border border-ink/15",
  ghost: "bg-transparent text-foreground hover:bg-ink/5 border border-transparent",
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <Magnetic strength={0.28}>
      <a
        data-cursor="hover"
        className={cn(
          "btn-shine relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 will-change-transform hover:scale-[1.03] active:scale-[0.98]",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </Magnetic>
  );
}
