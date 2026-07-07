import { siteConfig, versionedPublicAsset } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const { favicon } = siteConfig;

  const pwaIconEntries: MetadataRoute.Manifest["icons"] = (
    [
      { size: "192", path: favicon.pwaIcons["192"] },
      { size: "512", path: favicon.pwaIcons["512"] },
    ] as const
  ).flatMap(({ size, path: iconPath }) => [
    {
      src: versionedPublicAsset(iconPath),
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    },
    {
      src: versionedPublicAsset(iconPath),
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "maskable",
    },
  ]);

  return {
    name: favicon.manifest.name,
    short_name: favicon.manifest.shortName,
    description: "Product-oriented full-stack developer portfolio - React, TypeScript, Next.js.",
    lang: "en",
    start_url: "/",
    display: "standalone",
    background_color: favicon.backgroundColor,
    theme_color: favicon.backgroundColor,
    icons: pwaIconEntries,
  };
}
