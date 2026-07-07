"use client";

import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FooterContactCtaDialogBody } from "./dialog-body";
import { useFooterContactCta } from "./use-footer-contact-cta";

export function FooterContactCtaDialog() {
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
        <ContactForm
          key={open ? modalEmail : "closed"}
          variant="embedded"
          defaultEmail={modalEmail}
          className="flex min-h-0 flex-1 flex-col"
        >
          <FooterContactCtaDialogBody />
        </ContactForm>
      </DialogContent>
    </Dialog>
  );
}
