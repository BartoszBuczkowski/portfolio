import type { LinkedInLocaleConfig, SupportedLinkedInLocale } from "./types";

export const LINKEDIN_SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";
export const VANITY = "bartosz-r-buczkowski";

export const localeConfig: Record<SupportedLinkedInLocale, LinkedInLocaleConfig> = {
  pl: {
    dataLocale: "pl_PL",
    href: "https://pl.linkedin.com/in/bartosz-r-buczkowski/pl?trk=profile-badge",
  },
  en: {
    dataLocale: "en_US",
    href: "https://www.linkedin.com/in/bartosz-r-buczkowski/?trk=profile-badge",
  },
};
