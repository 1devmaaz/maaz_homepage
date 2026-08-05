"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useMotionSafe } from "./useMotionSafe";

type CursorMode = "default" | "hover" | "text";

function subscribeFinePointer(onStoreChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const hover = window.matchMedia("(hover: hover)");
  fine.addEventListener("change", onStoreChange);
  hover.addEventListener("change", onStoreChange);
  return () => {
    fine.removeEventListener("change", onStoreChange);
    hover.removeEventListener("change", onStoreChange);
  };
}

function getFinePointerSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

function getServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const reduced = useMotionSafe();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerSnapshot,
  );
  const enabled = finePointer && !reduced;
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 380, damping: 32, mass: 0.35 });
  const y = useSpring(mouseY, { stiffness: 380, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    function onMove(event: MouseEvent) {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    }

    function onLeave() {
      setVisible(false);
    }

    function onOver(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']",
      );
      const texty = target.closest("p, h1, h2, h3, h4, li, span");
      if (interactive) setMode("hover");
      else if (texty) setMode("text");
      else setMode("default");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const size = mode === "hover" ? 52 : mode === "text" ? 28 : 16;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
          style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            className="rounded-full border border-white bg-white/15"
            animate={{
              width: size,
              height: size,
              opacity: mode === "hover" ? 0.95 : 0.85,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
