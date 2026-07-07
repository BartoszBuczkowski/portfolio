"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useFooterContactCta } from "./use-footer-contact-cta";

export function FooterContactCtaSubmit() {
  const t = useTranslations("Footer");
  const {
    actions: { tryOpenModal },
  } = useFooterContactCta();

  return (
    <Button type="button" variant="default" className="shrink-0 sm:h-11" onClick={tryOpenModal}>
      {t("sendEmail")}
    </Button>
  );
}
