"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { SiteNav } from "@/components/site-nav";
import { Theme } from "@/components/theme";
import { HeroHeaderPreferences } from "./preferences";

export type ContactLink = { label: string; href: string };

export function HeroHeader() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
      <a href="#" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Logo />
      </a>

      <div className="flex items-center gap-4">
        <SiteNav />
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <Theme.Toggle.Root />
        </div>
        <SiteNav.MobileMenu>
          <SiteNav.MobileMenu.Trigger />
          <SiteNav.MobileMenu.Content>
            <SiteNav.MobileMenu.Links />
            <SiteNav.MobileMenu.Footer>
              <HeroHeaderPreferences />
            </SiteNav.MobileMenu.Footer>
          </SiteNav.MobileMenu.Content>
        </SiteNav.MobileMenu>
      </div>
    </div>
  );
}
