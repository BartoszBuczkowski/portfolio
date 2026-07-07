"use client";

import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export function FooterContactCtaDialogSuccessView() {
  const t = useTranslations("Footer");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10">
        <ContactForm.SuccessIcon />
        <div className="flex flex-col gap-2">
          <ContactForm.SuccessTitle>{t("dialogSuccessTitle")}</ContactForm.SuccessTitle>
          <ContactForm.SuccessDescription>{t("dialogSuccessDescription")}</ContactForm.SuccessDescription>
        </div>
      </div>
      <DialogFooter className="shrink-0 border-t border-border px-6 py-4 sm:justify-stretch">
        <DialogClose asChild>
          <Button className="w-full sm:w-full">{t("dialogClose")}</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
