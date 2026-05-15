const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "Bartosz Buczkowski",
  jobTitle: "Software Developer",
  email: "bartosz.r.buczkowski@gmail.com",
  location: {
    city: "Rzeszów",
    country: "Poland",
    countryCode: "PL",
  },
  defaultLocale: "en" as const,
  locales: ["en", "pl"] as const,
  ogImage: {
    path: "/bartosz.jpg",
    width: 1200,
    height: 1794,
    alt: "Bartosz Buczkowski — Software Developer",
  },
} as const;

export function getSiteUrl(): string | undefined {
  return siteUrl;
}

export function getAbsoluteUrl(path = "/"): string | undefined {
  if (!siteUrl) return undefined;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export function getLocalePath(locale: string): string {
  return locale === siteConfig.defaultLocale ? "/" : `/${locale}`;
}

export function getSocialProfiles(): string[] {
  const profiles = [
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_GITHUB_URL,
    process.env.NEXT_PUBLIC_TWITTER_URL,
  ].filter((url): url is string => Boolean(url?.trim()));

  return profiles;
}

export function getOpenGraphLocale(locale: string): string {
  return locale === "pl" ? "pl_PL" : "en_US";
}
