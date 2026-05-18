"use client";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { Theme } from "@/components/theme";

export type ContactLink = { label: string; href: string };

export function HeroHeader() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
      <Logo />

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Theme.Toggle.Root />
      </div>
    </div>
  );
}
