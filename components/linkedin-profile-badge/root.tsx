"use client";

import { useTheme } from "@/components/theme";
import { siteConfig } from "@/lib/site-config";
import { useLocale } from "next-intl";
import { localeConfig, VANITY } from "./constants";
import type { SupportedLinkedInLocale } from "./types";
import { useLinkedInBadgeScript } from "./use-linkedin-badge-script";

export function LinkedInProfileBadgeRoot() {
  const {
    state: { resolvedDark },
  } = useTheme();
  const locale = useLocale();
  const config = localeConfig[locale as SupportedLinkedInLocale] ?? localeConfig.en;
  const theme = resolvedDark ? "dark" : "light";
  const badgeKey = `${locale}-${theme}`;

  useLinkedInBadgeScript(badgeKey);

  return (
    <div
      key={badgeKey}
      className="badge-base LI-profile-badge"
      data-locale={config.dataLocale}
      data-size="small"
      data-theme={theme}
      data-type="VERTICAL"
      data-vanity={VANITY}
      data-version="v1"
    >
      <a className="badge-base__link LI-simple-link" href={config.href}>
        {siteConfig.name}
      </a>
    </div>
  );
}
