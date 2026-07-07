import { SiteNavMobileMenuContent } from "./content";
import { SiteNavMobileMenuFooter } from "./footer";
import { SiteNavMobileMenuLinks } from "./links";
import { SiteNavMobileMenuRoot } from "./root";
import { SiteNavMobileMenuTrigger } from "./trigger";

export const SiteNavMobileMenu = Object.assign(SiteNavMobileMenuRoot, {
  Trigger: SiteNavMobileMenuTrigger,
  Content: SiteNavMobileMenuContent,
  Links: SiteNavMobileMenuLinks,
  Footer: SiteNavMobileMenuFooter,
});
