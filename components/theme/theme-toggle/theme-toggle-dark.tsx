"use client";

import { ThemeToggleOption } from "./theme-toggle-option";
import { ThemeGlyph } from "./theme-glyph";

export function ThemeToggleDark() {
  return (
    <ThemeToggleOption preference="dark" labelKey="switchToDark">
      <ThemeGlyph id="moon-icon" src="/moon-icon.svg" />
    </ThemeToggleOption>
  );
}
