import { use } from "react";
import { SiteNavMobileMenuContext } from "./context";

export function useSiteNavMobileMenu() {
  const value = use(SiteNavMobileMenuContext);
  if (!value) {
    throw new Error("SiteNav.MobileMenu sub-components must be used within SiteNav.MobileMenu.");
  }
  return value;
}
