"use client";

import { useFooterContactCta } from "./use-footer-contact-cta";

export function FooterContactCtaError() {
  const {
    state: { footerError },
    meta: { formId },
  } = useFooterContactCta();

  if (!footerError) return null;

  return (
    <p id={`${formId}-error`} className="text-sm text-destructive" role="alert">
      {footerError}
    </p>
  );
}
