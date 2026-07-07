"use client";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

export function SiteNavMobileMenuTrigger() {
  const t = useTranslations("Nav");

  return (
    <DialogTrigger asChild>
      <Button type="button" variant="ghost" size="icon" className="md:hidden" aria-label={t("menu")}>
        <Menu className="size-5" aria-hidden />
      </Button>
    </DialogTrigger>
  );
}
