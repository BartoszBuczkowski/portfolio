"use client";

import { siteConfig } from "@/lib/site-config";
import { useTranslations } from "next-intl";

export function LogoRoot() {
  const t = useTranslations("Logo");

  return (
    <div>
      <p className="font-semibold tracking-tight text-foreground">{siteConfig.name}</p>
      <p className="text-sm text-muted-foreground tech-stack-glitch">{t("location").toUpperCase()}</p>
    </div>
  );
}
