"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

const THEME_COOKIE_NAME = "theme";

function ThemeGlyph({ id, src }: { id: string; src: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <use href={`${src}#${id}`} width="24" height="24" />
    </svg>
  );
}

const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const setCookieTheme = (theme: "dark" | "light") => {
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
};

interface ThemeToggleProps {
  initialDark: boolean;
}

export function ThemeToggle({ initialDark }: ThemeToggleProps) {
  const [dark, setDark] = useState(initialDark);
  const t = useTranslations("Theme");

  const toggleLabel = dark ? t("switchToLight") : t("switchToDark");

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
        <ThemeGlyph id="sun-icon" src="/sun-icon.svg" />
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
        <ThemeGlyph id="moon-icon" src="/moon-icon.svg" />
      </span>
    </Button>
  );
}
