"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light" | null;

export const useInitialTheme = () => {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const match = document.cookie.match(/(?:^|;\s*)theme=(dark|light)(?:;|$)/);
      return (match?.[1] as Theme) ?? null;
    },
    () => null,
  );
};
