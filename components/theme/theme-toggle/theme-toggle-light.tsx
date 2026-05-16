"use client";

import { ThemeToggleOption } from "./theme-toggle-option";
import { ThemeGlyph } from "./theme-glyph";

export function ThemeToggleLight() {
  return (
    <ThemeToggleOption preference="light" labelKey="switchToLight">
      <ThemeGlyph id="sun-icon" src="/sun-icon.svg" />
    </ThemeToggleOption>
  );
}
