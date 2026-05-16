"use client";

import { Monitor } from "lucide-react";
import { ThemeToggleOption } from "./theme-toggle-option";

export function ThemeToggleSystem() {
  return (
    <ThemeToggleOption preference="system" labelKey="switchToSystem">
      <Monitor className="size-4 shrink-0" aria-hidden />
    </ThemeToggleOption>
  );
}
