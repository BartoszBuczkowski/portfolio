"use client";

import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcherLocaleLink } from "./locale-link";
import type { LocaleCode } from "./types";

export function LanguageSwitcherRoot() {
  const locale = useLocale() as LocaleCode;
  const t = useTranslations("Header");

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <LanguageSwitcherLocaleLink locale="en" label={t("english")} ariaLabel={t("switchToEnglish")} isActive={locale === "en"} />
      <span className="text-muted-foreground select-none" aria-hidden>
        |
      </span>
      <LanguageSwitcherLocaleLink locale="pl" label={t("polish")} ariaLabel={t("switchToPolish")} isActive={locale === "pl"} />
    </div>
  );
}
