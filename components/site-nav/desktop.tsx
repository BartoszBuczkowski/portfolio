"use client";

import { useTranslations } from "next-intl";
import { siteNavItems, siteNavLinkClassName } from "./constants";
import { SiteNavLink } from "./nav-link";

export function SiteNavDesktop() {
  const t = useTranslations("Nav");

  return (
    <nav aria-label={t("label")} className="hidden items-center gap-6 md:flex">
      {siteNavItems.map(({ href, key }) => (
        <SiteNavLink key={key} href={href} label={t(key)} className={siteNavLinkClassName} />
      ))}
    </nav>
  );
}
