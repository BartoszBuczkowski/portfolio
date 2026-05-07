"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MoonIcon } from "../icons/moon-icon";
import { SunIcon } from "../icons/sun-icon";

const THEME_COOKIE_NAME = "theme";
const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const setCookieTheme = (theme: "dark" | "light") => {
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
};

interface ThemeToggleProps {
  initialDark: boolean;
}

export function ThemeToggle({ initialDark }: ThemeToggleProps) {
  const [dark, setDark] = useState(initialDark);

  const toggleLabel = dark ? "Switch to light mode" : "Switch to dark mode";

  const toggleTheme = () => {
    setDark((d) => {
      const classList = document.documentElement.classList;
      const nextDark = !d;

      if (d) classList.remove("dark");
      else classList.add("dark");

      setCookieTheme(nextDark ? "dark" : "light");

      return nextDark;
    });
  };

  return (
    <Button
      type="button"
      variant="themeToggle"
      onClick={toggleTheme}
      aria-label={toggleLabel}
      className="transition-colors cursor-pointer w-16"
    >
      <span
        className={cn("flex size-7 items-center justify-center", {
          "text-muted-foreground": dark,
          "text-foreground": !dark,
        })}
      >
        <SunIcon />
      </span>
      <span
        aria-hidden
        className={cn("absolute top-1 size-7 rounded-full", {
          "right-1.5 shadow-sm shadow-gray-500/30": dark,
          "left-1.5 shadow-md": !dark,
        })}
      />
      <span
        className={cn("flex size-7 items-center justify-center", {
          "text-muted-foreground": !dark,
          "text-foreground": dark,
        })}
      >
        <MoonIcon />
      </span>
    </Button>
  );
}
