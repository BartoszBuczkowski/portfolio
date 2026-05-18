import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const { favicon } = siteConfig;
  const versionQuery = `?v=${favicon.cacheVersion}`;

  const pwaIconEntries: MetadataRoute.Manifest["icons"] = (
    [
      { size: "192", path: favicon.pwaIcons["192"] },
      { size: "512", path: favicon.pwaIcons["512"] },
    ] as const
  ).flatMap(({ size, path: iconPath }) => [
    {
      src: `${iconPath}${versionQuery}`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    },
    {
      src: `${iconPath}${versionQuery}`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "maskable",
    },
  ]);

  return {
    name: favicon.manifest.name,
    short_name: favicon.manifest.shortName,
    start_url: "/",
    display: "standalone",
    background_color: favicon.backgroundColor,
    theme_color: favicon.backgroundColor,
    icons: pwaIconEntries,
  };
}
