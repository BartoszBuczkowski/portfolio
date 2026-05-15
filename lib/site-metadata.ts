import type { Metadata, Viewport } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    type: "website",
    images: [
      {
        url: "/bartosz.jpg",
        width: 1200,
        height: 1794,
        alt: "Bartosz Buczkowski — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/bartosz.jpg"],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
  },
};
