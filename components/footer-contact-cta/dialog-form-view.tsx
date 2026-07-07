"use client";

import { ContactForm } from "@/components/contact-form";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export function FooterContactCtaDialogFormView() {
  const t = useTranslations("Footer");

  return (
    <>
      <DialogHeader className="shrink-0 border-b border-border px-6 pt-6 pb-4 text-left">
        <DialogTitle>{t("dialogTitle")}</DialogTitle>
      </DialogHeader>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
        <ContactForm.Body>
          <ContactForm.NameField />
          <ContactForm.EmailField />
          <ContactForm.MessageField />
          <ContactForm.Turnstile />
          <ContactForm.ErrorStatus />
          <ContactForm.Submit />
        </ContactForm.Body>
      </div>
    </>
  );
}
