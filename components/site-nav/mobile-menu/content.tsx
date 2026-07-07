"use client";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

type SiteNavMobileMenuContentProps = {
  children: React.ReactNode;
};

export function SiteNavMobileMenuContent({ children }: SiteNavMobileMenuContentProps) {
  const t = useTranslations("Nav");

  return (
    <DialogContent className="gap-0 p-0 sm:max-w-xs" showCloseButton>
      <DialogHeader className="border-b px-6 py-4 text-left">
        <DialogTitle>{t("menu")}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
}
