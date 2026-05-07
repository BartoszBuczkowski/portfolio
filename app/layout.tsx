import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const THEME_COOKIE_NAME = "theme";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isThemeDark = cookieStore.get(THEME_COOKIE_NAME)?.value === "dark";
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={cn({
        dark: isThemeDark,
      })}
    >
      <body className={cn(geistSans.variable, geistMono.variable, "antialiased scroll-smooth")}>{children}</body>
    </html>
  );
}
