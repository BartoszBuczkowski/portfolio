import { SiteNavDesktop } from "./desktop";
import { SiteNavMobileMenu } from "./mobile-menu";

export const SiteNav = Object.assign(SiteNavDesktop, {
  MobileMenu: SiteNavMobileMenu,
});
