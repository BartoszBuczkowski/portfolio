"use client";

import { useTranslations } from "next-intl";

export function ExperienceTimelineTitle() {
  const t = useTranslations("Experience");

  return (
    <h2 className="mb-16 md:mb-20 text-center text-3xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
  );
}
