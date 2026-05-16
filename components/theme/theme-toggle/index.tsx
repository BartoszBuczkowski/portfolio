"use client";

import { ThemeToggleDark } from "./theme-toggle-dark";
import { ThemeToggleLight } from "./theme-toggle-light";
import { ThemeToggleSystem } from "./theme-toggle-system";
import { ThemeToggleThumb } from "./theme-toggle-thumb";
import { ThemeToggleTrack } from "./theme-toggle-track";

function ThemeToggleRoot() {
  return (
    <ThemeToggleTrack>
      <ThemeToggleThumb />
      <ThemeToggleLight />
      <ThemeToggleDark />
      <ThemeToggleSystem />
    </ThemeToggleTrack>
  );
}

export const ThemeToggle = {
  Root: ThemeToggleRoot,
  Track: ThemeToggleTrack,
  Thumb: ThemeToggleThumb,
  Light: ThemeToggleLight,
  Dark: ThemeToggleDark,
  System: ThemeToggleSystem,
};
