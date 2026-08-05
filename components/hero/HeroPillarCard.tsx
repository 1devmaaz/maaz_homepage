"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

type HeroPillarCardProps = {
  label: string;
  description: string;
  /** Light-mode idle image */
  src: string;
  /** Dark-mode idle image */
  srcDark?: string;
  /** Light-mode hover image */
  colorSrc: string;
  /** Dark-mode hover image */
  colorSrcDark?: string;
  width: number;
  height: number;
};

export function HeroPillarCard({
  label,
  description,
  src,
  srcDark,
  colorSrc,
  colorSrcDark,
  width,
  height,
}: HeroPillarCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const idleSrc = isDark && srcDark ? srcDark : src;
  const hoveredSrc = isDark && colorSrcDark ? colorSrcDark : colorSrc;

  return (
    <motion.article
      data-cursor="hover"
      className="group sketch-card flex h-full flex-col gap-4 p-5 md:p-6"
      whileHover={{ y: -4, boxShadow: "6px 6px 0 var(--shadow)" }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
    >
      <div className="relative inline-flex self-start">
        {/* Idle image — fades out on hover */}
        <Image
          key={idleSrc}
          src={idleSrc}
          alt=""
          width={width}
          height={height}
          aria-hidden="true"
          className="h-14 w-auto object-contain transition duration-300 group-hover:opacity-0 md:h-16"
          draggable={false}
        />
        {/* Hovered image — fades in on hover */}
        <Image
          key={hoveredSrc}
          src={hoveredSrc}
          alt=""
          width={width}
          height={height}
          aria-hidden="true"
          className="absolute inset-0 h-14 w-auto object-contain opacity-0 transition duration-300 group-hover:opacity-100 md:h-16"
          draggable={false}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-accent">
          {label}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </motion.article>
  );
}
