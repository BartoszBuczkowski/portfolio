import { getSiteUrl, siteConfig, versionedPublicAsset } from "@/lib/site-config";
import type { Metadata, Viewport } from "next";

const siteUrl = getSiteUrl();
const { favicon } = siteConfig;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.favicon.backgroundColor },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  icons: {
    icon: [
      { url: versionedPublicAsset(favicon.ico), sizes: "any" },
      { url: versionedPublicAsset(favicon.svg), type: "image/svg+xml" },
      { url: versionedPublicAsset(favicon.png96), sizes: "96x96", type: "image/png" },
    ],
    apple: versionedPublicAsset(favicon.appleTouchIcon),
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    alternateLocale: ["pl_PL"],
    images: [
      {
        url: siteConfig.ogImage.path,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
        type: siteConfig.ogImage.type,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    images: [siteConfig.ogImage.path],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "msapplication-TileColor": siteConfig.favicon.backgroundColor,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};
