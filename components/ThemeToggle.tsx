"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";

export function ThemeToggle({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (!mounted) return;
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark, mounted]);

  if (!mounted) {
    return (
      <div
        className={cn("h-9 w-14 rounded-full bg-muted", className)}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex h-9 w-16 shrink-0 items-center justify-between rounded-full bg-muted px-1.5 transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-6 items-center justify-center",
          {
            "text-muted-foreground": dark,
            "text-foreground": !dark
          }
        )}
      >
        <SunIcon />
      </span>
      <span
        className={cn(
          "absolute top-1 size-7 rounded-full",
          {
            "right-1 shadow-sm shadow-gray-500/30": dark,
            "left-1 shadow-md": !dark
          },
        )}
        aria-hidden
      />
      <span
        className={cn(
          "flex size-6 items-center justify-center",
          {
            "text-muted-foreground": !dark,
            "text-foreground": dark
          }
        )}
      >
        <MoonIcon />
      </span>
    </button>
  );
}
