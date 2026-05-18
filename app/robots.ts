import { getSiteUrl } from "@/lib/site-config";
import type { MetadataRoute } from "next";

/** Generate at request time so runtime env (e.g. Cloudflare Worker vars) is applied. */
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
