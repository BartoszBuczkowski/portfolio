"use client";

import type { ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useTheme } from "../theme-context";

interface ThemeToggleOptionProps {
  preference: ThemePreference;
  labelKey: "switchToLight" | "switchToDark" | "switchToSystem";
  children: React.ReactNode;
}

export function ThemeToggleOption({ preference, labelKey, children }: ThemeToggleOptionProps) {
  const {
    state: { preference: activePreference },
    actions: { setPreference },
  } = useTheme();
  const t = useTranslations("Theme");
  const isActive = activePreference === preference;

  return (
    <button
      type="button"
      onClick={() => setPreference(preference)}
      aria-label={t(labelKey)}
      aria-pressed={isActive}
      className={cn(
        "relative z-10 flex size-7 items-center justify-center rounded-full transition-colors cursor-pointer",
        isActive ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}
