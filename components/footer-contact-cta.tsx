"use client";

import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useCallback, useId, useState } from "react";

export type FooterContactCtaLabels = {
  emailLabel: string;
  emailPlaceholder: string;
  sendEmail: string;
  dialogTitle: string;
  invalidEmail: string;
};

type FooterContactCtaProps = FooterContactCtaLabels;

const emailSchema = z.string().email();

export function FooterContactCta({
  emailLabel,
  emailPlaceholder,
  sendEmail,
  dialogTitle,
  invalidEmail,
}: FooterContactCtaProps) {
  const formId = useId();
  const [email, setEmail] = useState("");
  const [footerError, setFooterError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");

  const tryOpenModal = useCallback(() => {
    const trimmed = email.trim();
    const parsed = emailSchema.safeParse(trimmed);
    if (!parsed.success) {
      setFooterError(invalidEmail);
      return;
    }
    setFooterError(null);
    setModalEmail(parsed.data);
    setOpen(true);
  }, [email, invalidEmail]);

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor={formId} className="sr-only">
          {emailLabel}
        </label>
        <input
          id={formId}
          type="email"
          autoComplete="email"
          placeholder={emailPlaceholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (footerError) setFooterError(null);
          }}
          aria-invalid={footerError ? true : undefined}
          aria-describedby={footerError ? `${formId}-error` : undefined}
          className={cn(
            "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-accent-foreground/5",
            footerError && "border-destructive",
          )}
        />
        <Button type="button" variant="default" className="shrink-0 sm:h-11" onClick={tryOpenModal}>
          {sendEmail}
        </Button>
      </div>
      {footerError ? (
        <p id={`${formId}-error`} className="text-sm text-destructive" role="alert">
          {footerError}
        </p>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="flex max-h-[min(90vh,640px)] flex-col gap-0 p-0 sm:max-w-md"
        >
          <div className="relative min-h-0 flex-1 overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <ContactForm key={modalEmail} variant="embedded" defaultEmail={modalEmail} className="py-0 px-0" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
