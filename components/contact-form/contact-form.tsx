"use client";

import { submitContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { ContactFormContext, type ContactFormContextValue, type ContactFormValues, type ContactFormVariant } from "./context";
import {
  ContactFormBody,
  ContactFormDefaultLayout,
  ContactFormEmailField,
  ContactFormHeader,
  ContactFormMessageField,
  ContactFormNameField,
  ContactFormStatus,
  ContactFormSubmit,
  ContactFormSurface,
  ContactFormTurnstile,
} from "./primitives";

export type ContactFormRootProps = {
  className?: string;
  children?: React.ReactNode;
  variant?: ContactFormVariant;
  defaultEmail?: string;
};

function ContactFormRoot({ className, children, variant = "page", defaultEmail = "" }: ContactFormRootProps) {
  const locale = useLocale();
  const t = useTranslations("Contact");
  const tv = useTranslations("Contact.validation");
  const [state, setState] = useState<ContactState | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const prevDefaultEmail = useRef<string | undefined>(undefined);

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, tv("nameMin")),
        email: z.email(tv("emailInvalid")),
        message: z.string().min(10, tv("messageMin")),
      }),
    [tv],
  );

  const form = useForm<ContactFormValues>({
    defaultValues: { name: "", email: defaultEmail, message: "" },
  });

  useEffect(() => {
    form.reset({ name: "", email: defaultEmail, message: "" });
    if (prevDefaultEmail.current !== undefined && prevDefaultEmail.current !== defaultEmail) {
      turnstileRef.current?.reset();
    }
    prevDefaultEmail.current = defaultEmail;
    queueMicrotask(() => {
      setTurnstileToken(null);
    });
  }, [defaultEmail, form]);

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      const parsed = contactSchema.safeParse(values);
      if (!parsed.success) {
        const issues = parsed.error.issues;
        for (const issue of issues) {
          const path = issue.path[0] as keyof ContactFormValues;
          if (path) form.setError(path, { message: issue.message });
        }
        return;
      }

      const { name, email, message } = parsed.data;
      const fd = new FormData();
      fd.set("name", name);
      fd.set("email", email);
      fd.set("message", message);
      fd.set("locale", locale);
      if (turnstileToken) fd.set("cf-turnstile-response", turnstileToken);

      const result = await submitContact(fd);
      setState(result);
      if (result.ok) {
        form.reset({ name: "", email: variant === "embedded" ? defaultEmail : "", message: "" });
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      }
    },
    [contactSchema, form, locale, turnstileToken, variant, defaultEmail],
  );

  const contextValue = useMemo<ContactFormContextValue>(
    () => ({
      form,
      t: t as (key: string) => string,
      tv: tv as (key: string) => string,
      locale,
      state,
      onSubmit,
      variant,
      turnstileToken,
      turnstileRef,
      setTurnstileToken,
    }),
    [form, t, tv, locale, state, onSubmit, variant, turnstileToken, turnstileRef],
  );

  const inner = (
    <div className={cn(variant === "page" ? "mx-auto max-w-lg" : "mx-auto w-full max-w-full")}>
      {children ?? <ContactFormDefaultLayout />}
    </div>
  );

  return (
    <ContactFormContext value={contextValue}>
      {variant === "embedded" ? (
        <div className={cn("w-full", className)}>{inner}</div>
      ) : (
        <section id="contact" className={cn("py-24 px-6", className)}>
          {inner}
        </section>
      )}
    </ContactFormContext>
  );
}

export const ContactForm = Object.assign(ContactFormRoot, {
  Header: ContactFormHeader,
  Surface: ContactFormSurface,
  Body: ContactFormBody,
  NameField: ContactFormNameField,
  EmailField: ContactFormEmailField,
  MessageField: ContactFormMessageField,
  Turnstile: ContactFormTurnstile,
  Status: ContactFormStatus,
  Submit: ContactFormSubmit,
});

export type { ContactFormValues } from "./context";
