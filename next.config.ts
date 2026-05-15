import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

void initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const oneYearInSeconds = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: oneYearInSeconds,
  },
  async headers() {
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
