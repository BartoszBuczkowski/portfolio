"use client";

import { cn } from "@/lib/utils";
import type { ThemePreference } from "@/lib/theme";
import { useTheme } from "../theme-context";

const thumbPosition: Record<ThemePreference, string> = {
  light: "left-1",
  dark: "left-1/2 -translate-x-1/2",
  system: "right-1",
};

export function ThemeToggleThumb() {
  const {
    state: { preference },
  } = useTheme();

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-1 size-7 rounded-full bg-background shadow-md transition-[left,transform]",
        thumbPosition[preference],
      )}
    />
  );
}
