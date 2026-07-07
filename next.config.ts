import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required in production (no trailing slash).");
}

void initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const oneYearInSeconds = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: oneYearInSeconds,
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
