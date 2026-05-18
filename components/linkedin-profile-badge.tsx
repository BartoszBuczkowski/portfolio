"use client";

import { useTheme } from "@/components/theme";
import { siteConfig } from "@/lib/site-config";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const LINKEDIN_SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";
const VANITY = "bartosz-r-buczkowski";

const localeConfig = {
  pl: {
    dataLocale: "pl_PL",
    href: "https://pl.linkedin.com/in/bartosz-r-buczkowski/pl?trk=profile-badge",
  },
  en: {
    dataLocale: "en_US",
    href: "https://www.linkedin.com/in/bartosz-r-buczkowski/?trk=profile-badge",
  },
} as const;

function loadLinkedInBadgeScript() {
  if (document.querySelector(`script[src="${LINKEDIN_SCRIPT_SRC}"]`)) return;

  const script = document.createElement("script");
  script.src = LINKEDIN_SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

function reloadLinkedInBadgeScript() {
  document.querySelector(`script[src="${LINKEDIN_SCRIPT_SRC}"]`)?.remove();
  loadLinkedInBadgeScript();
}

export function LinkedInProfileBadge() {
  const {
    state: { resolvedDark },
  } = useTheme();
  const locale = useLocale();
  const config = localeConfig[locale as keyof typeof localeConfig] ?? localeConfig.en;
  const theme = resolvedDark ? "dark" : "light";
  const badgeKey = `${locale}-${theme}`;

  useEffect(() => {
    reloadLinkedInBadgeScript();
  }, [badgeKey]);

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
