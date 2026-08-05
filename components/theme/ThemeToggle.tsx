"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      data-cursor="hover"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/15 text-white/80 transition hover:border-accent-bright hover:bg-white/8 hover:text-accent-bright",
        className,
      )}
    >
      <span className="relative flex items-center justify-center" aria-hidden>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 13.4A7.8 7.8 0 0 1 10.6 3.5 8.2 8.2 0 1 0 20.5 13.4Z" />
    </svg>
  );
}
