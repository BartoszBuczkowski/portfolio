const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "Bartosz Buczkowski",
  jobTitle: "Product-Focused Full-Stack Developer",
  email: "bartosz.r.buczkowski@gmail.com",
  location: {
    city: "Rzeszów",
    country: "Poland",
    countryCode: "PL",
  },
  defaultLocale: "en" as const,
  locales: ["en", "pl"] as const,
  ogImage: {
    path: "/seo/og.jpg",
    width: 1200,
    height: 630,
    alt: "Bartosz Buczkowski — Product-Focused Full-Stack Developer",
    type: "image/jpeg",
  },
  profileImage: {
    path: "/profile/bartosz.jpg",
    width: 1200,
    height: 1794,
    alt: "Bartosz Buczkowski — Product-Focused Full-Stack Developer",
  },
  favicon: {
    backgroundColor: "#ffffff",
    ico: "/seo/favicon.ico",
    svg: "/seo/favicon.svg",
    png96: "/seo/favicon-96x96.png",
    appleTouchIcon: "/seo/apple-touch-icon.png",
    pwaIcons: {
      "192": "/seo/web-app-manifest-192x192.png",
      "512": "/seo/web-app-manifest-512x512.png",
    },
    cacheVersion: "20260518",
    manifest: {
      name: "Bartosz Buczkowski | Software Dev",
      shortName: "Bartosz B.",
    },
  },
} as const;

export function versionedPublicAsset(path: string): string {
  return `${path}?v=${siteConfig.favicon.cacheVersion}`;
}

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

/** Absolute URLs for `<link rel="alternate" hreflang="…">` (requires NEXT_PUBLIC_SITE_URL). */
export function getHreflangLanguages(): Record<string, string> | undefined {
  if (!siteUrl) return undefined;

  const languages: Record<string, string> = {
    "x-default": getAbsoluteUrl(getLocalePath(siteConfig.defaultLocale))!,
  };

  for (const locale of siteConfig.locales) {
    languages[locale] = getAbsoluteUrl(getLocalePath(locale))!;
  }

  return languages;
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
