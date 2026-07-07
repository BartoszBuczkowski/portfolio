"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { LocaleCode } from "./types";

type LanguageSwitcherLocaleLinkProps = {
  locale: LocaleCode;
  label: string;
  ariaLabel: string;
  isActive: boolean;
};

export function LanguageSwitcherLocaleLink({ locale, label, ariaLabel, isActive }: LanguageSwitcherLocaleLinkProps) {
  return (
    <Link
      href="/"
      locale={locale}
      className={cn(
        "rounded-md px-2 py-1 transition-colors",
        isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
      aria-label={ariaLabel}
    >
      {label}
    </Link>
  );
}
