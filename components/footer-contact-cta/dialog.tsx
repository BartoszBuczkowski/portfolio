"use client";

import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useFooterContactCta } from "./use-footer-contact-cta";

export function FooterContactCtaDialog() {
  const t = useTranslations("Footer");
  const {
    state: { open, modalEmail },
    actions: { setOpen },
  } = useFooterContactCta();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        mobileKeyboardSafe
        aria-describedby={undefined}
        className="flex max-h-[min(90vh,640px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-md"
      >
        <DialogHeader className="shrink-0 border-b border-border px-6 pt-6 pb-4 text-left">
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          <ContactForm key={modalEmail} variant="embedded" defaultEmail={modalEmail} className="py-0 px-0" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
