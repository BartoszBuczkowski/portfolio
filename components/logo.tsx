"use client";

import { useTranslations } from "next-intl";

const name = "Bartosz Buczkowski";

export function Logo() {
  const t = useTranslations("Logo");

  return (
    <div>
      <p className="font-semibold tracking-tight text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground tech-stack-glitch">{t("location").toUpperCase()}</p>
    </div>
  );
}
