"use client";

import { useContactForm } from "@/components/contact-form/context";
import { FooterContactCtaDialogFormView } from "./dialog-form-view";
import { FooterContactCtaDialogSuccessView } from "./dialog-success-view";

export function FooterContactCtaDialogBody() {
  const { state } = useContactForm();

  if (state?.ok) {
    return <FooterContactCtaDialogSuccessView />;
  }

  return <FooterContactCtaDialogFormView />;
}
