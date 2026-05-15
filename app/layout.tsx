import { metadata, viewport } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

export { metadata, viewport };

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
      suppressHydrationWarning
      className={cn("h-full", {
        dark: isThemeDark,
      })}
    >
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "flex min-h-full flex-col overflow-x-hidden bg-background font-sans text-foreground antialiased scroll-smooth",
        )}
      >
        {children}
      </body>
    </html>
  );
}
