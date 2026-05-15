import { routing } from "@/i18n/routing";
import { getAbsoluteUrl, getLocalePath, getOpenGraphLocale, siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const canonicalPath = getLocalePath(locale);
  const pageUrl = getAbsoluteUrl(canonicalPath);
  const ogLocale = getOpenGraphLocale(locale);
  const alternateOgLocale = routing.locales
    .filter((loc) => loc !== locale)
    .map((loc) => getOpenGraphLocale(loc));

  return {
    title,
    description,
    keywords: keywords.split(",").map((keyword) => keyword.trim()),
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getLocalePath(loc)]),
      ),
    },
    openGraph: {
      title,
      description,
      url: pageUrl ?? canonicalPath,
      locale: ogLocale,
      alternateLocale: alternateOgLocale,
      images: [
        {
          url: siteConfig.ogImage.path,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: siteConfig.ogImage.alt,
        },
      ],
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pl")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
