"use client";

import {
  applyThemeToDocument,
  DEFAULT_THEME_PREFERENCE,
  readThemePreferenceFromCookie,
  resolveIsDark,
  setThemeCookie,
  type ThemePreference,
} from "@/lib/theme";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { ThemeContext, type ThemeContextValue } from "./theme-context";

const preferenceListeners = new Set<() => void>();

function subscribeToPreference(onStoreChange: () => void) {
  preferenceListeners.add(onStoreChange);
  return () => preferenceListeners.delete(onStoreChange);
}

function notifyPreferenceChange() {
  preferenceListeners.forEach((listener) => listener());
}

function getPreferenceSnapshot() {
  return readThemePreferenceFromCookie(document.cookie);
}

function getPreferenceServerSnapshot() {
  return DEFAULT_THEME_PREFERENCE;
}

function subscribeToSystemTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSystemIsDarkSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getSystemIsDarkServerSnapshot() {
  return false;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const preference = useSyncExternalStore(
    subscribeToPreference,
    getPreferenceSnapshot,
    getPreferenceServerSnapshot,
  );

  const systemIsDark = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemIsDarkSnapshot,
    getSystemIsDarkServerSnapshot,
  );

  const resolvedDark = resolveIsDark(preference, systemIsDark);

  useEffect(() => {
    applyThemeToDocument(resolvedDark);
  }, [resolvedDark]);

  const setPreferenceAction = useCallback((next: ThemePreference) => {
    setThemeCookie(next);
    notifyPreferenceChange();
    applyThemeToDocument(resolveIsDark(next, getSystemIsDarkSnapshot()));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      state: { preference, resolvedDark },
      actions: { setPreference: setPreferenceAction },
      meta: { systemIsDark },
    }),
    [preference, resolvedDark, setPreferenceAction, systemIsDark],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
