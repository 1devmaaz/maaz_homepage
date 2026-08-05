"use client";

import { useReducedMotion } from "framer-motion";

/** Prefer Framer's hook; falls back to false during SSR. */
export function useMotionSafe() {
  const reduced = useReducedMotion();
  return reduced === true;
}

export function useFinePointer() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(pointer: fine)").matches;
}
