import { createContext } from "react";
import type { SiteNavMobileMenuContextValue } from "./types";

export const SiteNavMobileMenuContext = createContext<SiteNavMobileMenuContextValue | null>(null);
