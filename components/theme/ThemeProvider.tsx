"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEY } from "@/lib/theme-script";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readDomTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function writeTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    // Sync with FOUC script / system preference already on <html>.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client hydration sync
    setThemeState(readDomTheme());

    const observer = new MutationObserver(() => {
      setThemeState(readDomTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((next: Theme) => {
    writeTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = readDomTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;

    if (origin) {
      root.style.setProperty("--theme-x", `${origin.x}px`);
      root.style.setProperty("--theme-y", `${origin.y}px`);
    }

    if (!prefersReducedMotion()) {
      root.classList.add("theme-animating");
      window.setTimeout(() => root.classList.remove("theme-animating"), 650);
    }

    writeTheme(next);
    setThemeState(next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
