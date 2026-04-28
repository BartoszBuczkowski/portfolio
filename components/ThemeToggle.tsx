"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

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
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer ",
        className,
      )}
    >
      <span
        className={cn(
          "relative z-10 flex size-6 items-center justify-center",
          dark ? "text-muted-foreground" : "text-foreground",
        )}
      >
        <SunIcon />
      </span>
      <span
        className={cn(
          "absolute left-1 top-1 size-7 rounded-full bg-foreground shadow-sm transition-transform",
          dark && "translate-x-6",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "relative z-10 flex size-6 items-center justify-center",
          !dark ? "text-muted-foreground" : "text-foreground",
        )}
      >
        <MoonIcon />
      </span>
    </button>
  );
}
