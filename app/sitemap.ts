import { getHreflangLanguages, getSiteLastModified, getSiteUrl, siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

/** Generate at request time so runtime env (e.g. Cloudflare Worker vars) is applied. */
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const lastModified = getSiteLastModified();
  const hreflangLanguages = getHreflangLanguages();

  return siteConfig.locales.map((locale) => ({
    url: `${siteUrl}${locale === siteConfig.defaultLocale ? "" : `/${locale}`}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    ...(hreflangLanguages ? { alternates: { languages: hreflangLanguages } } : {}),
  }));
}
