import { getHreflangLanguages, getSiteUrl, siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const lastModified = new Date();
  const hreflangLanguages = getHreflangLanguages();

  return siteConfig.locales.map((locale) => ({
    url: `${siteUrl}${locale === siteConfig.defaultLocale ? "" : `/${locale}`}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    ...(hreflangLanguages ? { alternates: { languages: hreflangLanguages } } : {}),
  }));
}
