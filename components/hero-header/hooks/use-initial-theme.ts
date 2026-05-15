"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

function readThemeFromCookie(): Theme | null {
  const match = document.cookie.match(/(?:^|;\s*)theme=(dark|light)(?:;|$)/);
  if (match?.[1] === "dark" || match?.[1] === "light") return match[1];
  return null;
}

export const useInitialTheme = (): Theme => {
  return useSyncExternalStore(
    () => () => {},
    () => readThemeFromCookie() ?? "light",
    () => "light",
  );
};
