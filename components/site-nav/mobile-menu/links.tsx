"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { siteNavItems, siteNavLinkClassName } from "../constants";
import { SiteNavLink } from "../nav-link";
import { useSiteNavMobileMenu } from "../use-site-nav-mobile-menu";

export function SiteNavMobileMenuLinks() {
  const t = useTranslations("Nav");
  const { actions } = useSiteNavMobileMenu();

  return (
    <nav aria-label={t("label")} className="flex flex-col px-2 py-2">
      {siteNavItems.map(({ href, key }) => (
        <SiteNavLink
          key={key}
          href={href}
          label={t(key)}
          onNavigate={actions.close}
          className={cn(siteNavLinkClassName, "rounded-md px-4 py-3 text-base")}
        />
      ))}
    </nav>
  );
}
