"use client";

import { useTranslations } from "next-intl";
import { useCallback, useId, useMemo, useState } from "react";
import { z } from "zod";
import { FooterContactCtaContext } from "./context";
import { FooterContactCtaDefaultLayout } from "./default-layout";
import type { FooterContactCtaContextValue, FooterContactCtaRootProps } from "./types";

const emailSchema = z.string().email();

export function FooterContactCtaRoot({ children }: FooterContactCtaRootProps) {
  const t = useTranslations("Footer");
  const formId = useId();
  const [email, setEmailState] = useState("");
  const [footerError, setFooterError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");

  const setEmail = useCallback(
    (value: string) => {
      setEmailState(value);
      if (footerError) setFooterError(null);
    },
    [footerError],
  );

  const tryOpenModal = useCallback(() => {
    const trimmed = email.trim();
    const parsed = emailSchema.safeParse(trimmed);
    if (!parsed.success) {
      setFooterError(t("invalidEmail"));
      return;
    }
    setFooterError(null);
    setModalEmail(parsed.data);
    setOpen(true);
  }, [email, t]);

  const contextValue = useMemo<FooterContactCtaContextValue>(
    () => ({
      state: { email, footerError, open, modalEmail },
      actions: { setEmail, tryOpenModal, setOpen },
      meta: { formId },
    }),
    [email, footerError, open, modalEmail, setEmail, tryOpenModal, formId],
  );

  return (
    <FooterContactCtaContext value={contextValue}>
      {children ?? <FooterContactCtaDefaultLayout />}
    </FooterContactCtaContext>
  );
}
