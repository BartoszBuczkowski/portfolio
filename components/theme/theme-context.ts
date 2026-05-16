"use client";

import { createContext, use } from "react";
import type { ThemePreference } from "@/lib/theme";

export interface ThemeState {
  preference: ThemePreference;
  resolvedDark: boolean;
}

export interface ThemeActions {
  setPreference: (preference: ThemePreference) => void;
}

export interface ThemeMeta {
  systemIsDark: boolean;
}

export interface ThemeContextValue {
  state: ThemeState;
  actions: ThemeActions;
  meta: ThemeMeta;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = use(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within Theme.Provider");
  }
  return value;
}
