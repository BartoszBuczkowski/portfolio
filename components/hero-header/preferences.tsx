"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Theme } from "@/components/theme";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type HeroHeaderPreferencesProps = {
  className?: string;
};

export function HeroHeaderPreferences({ className }: HeroHeaderPreferencesProps) {
  const t = useTranslations("Nav");

  return (
    <div className={cn("flex items-start justify-between gap-6", className)}>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("language")}</p>
        <LanguageSwitcher />
      </div>
      <div className="shrink-0 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("theme")}</p>
        <div className="w-fit">
          <Theme.Toggle.Root />
        </div>
      </div>
    </div>
  );
}
