"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Header");

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <Link
        href="/"
        locale="en"
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "en" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
        aria-label={t("switchToEnglish")}
      >
        {t("english")}
      </Link>
      <span className="text-muted-foreground select-none" aria-hidden>
        |
      </span>
      <Link
        href="/"
        locale="pl"
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "pl" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
        aria-label={t("switchToPolish")}
      >
        {t("polish")}
      </Link>
    </div>
  );
}
