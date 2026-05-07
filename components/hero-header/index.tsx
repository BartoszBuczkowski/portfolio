"use client";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useInitialTheme } from "./hooks/use-initial-theme";

export type ContactLink = { label: string; href: string };

export function HeroHeader() {
  const initialTheme = useInitialTheme();

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
      <Logo />

      {initialTheme && <ThemeToggle initialDark={initialTheme === "dark"} />}
    </div>
  );
}
