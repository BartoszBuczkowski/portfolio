"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useFooterContactCta } from "./use-footer-contact-cta";

export function FooterContactCtaEmailField() {
  const t = useTranslations("Footer");
  const {
    state: { email, footerError },
    actions: { setEmail },
    meta: { formId },
  } = useFooterContactCta();

  return (
    <>
      <label htmlFor={formId} className="sr-only">
        {t("emailLabel")}
      </label>
      <input
        id={formId}
        type="email"
        autoComplete="email"
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={footerError ? true : undefined}
        aria-describedby={footerError ? `${formId}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-accent-foreground/5",
          footerError && "border-destructive",
        )}
      />
    </>
  );
}
