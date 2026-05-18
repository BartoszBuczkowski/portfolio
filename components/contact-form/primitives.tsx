"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Turnstile } from "@marsidev/react-turnstile";
import type { ReactNode } from "react";
import { useContactForm } from "./context";

export function ContactFormHeader() {
  const { t } = useContactForm();
  return <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground">{t("title")}</h2>;
}

export function ContactFormSurface({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function ContactFormBody({ children }: { children: ReactNode }) {
  const { form, onSubmit } = useContactForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {children}
      </form>
    </Form>
  );
}

export function ContactFormNameField() {
  const { form, t } = useContactForm();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("name")}</FormLabel>
          <FormControl>
            <Input placeholder={t("namePlaceholder")} className="border-border focus-visible:ring-accent-violet/50" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ContactFormEmailField() {
  const { form, t } = useContactForm();
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("email")}</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="border-border focus-visible:ring-accent-violet/50"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ContactFormMessageField() {
  const { form, t } = useContactForm();
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("message")}</FormLabel>
          <FormControl>
            <textarea
              placeholder={t("messagePlaceholder")}
              rows={4}
              className={cn(
                "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none",
                "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "focus-visible:border-accent-violet focus-visible:ring-accent-violet/30",
                "disabled:pointer-events-none disabled:opacity-50 md:text-sm",
              )}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ContactFormTurnstile() {
  const { turnstileRef, setTurnstileToken, t } = useContactForm();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return <p className="text-center text-sm text-destructive">{t("server.turnstileMisconfigured")}</p>;
  }

  return (
    <div className="flex justify-center">
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        options={{ size: "flexible", theme: "auto" }}
        onSuccess={(token) => setTurnstileToken(token)}
        onExpire={() => setTurnstileToken(null)}
        onError={() => setTurnstileToken(null)}
      />
    </div>
  );
}

export function ContactFormStatus() {
  const { state } = useContactForm();
  if (!state) return null;
  return <p className={cn("text-sm", state.ok ? "text-accent-violet" : "text-destructive")}>{state.message}</p>;
}

export function ContactFormSubmit() {
  const { form, t, turnstileToken } = useContactForm();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const canSubmit = Boolean(siteKey) && Boolean(turnstileToken);

  return (
    <Button type="submit" disabled={form.formState.isSubmitting || !canSubmit}>
      {form.formState.isSubmitting ? t("submitting") : t("submit")}
    </Button>
  );
}

function ContactFormDefaultLayout() {
  const { variant } = useContactForm();
  return (
    <>
      {variant === "page" ? <ContactFormHeader /> : null}
      <ContactFormSurface>
        <ContactFormBody>
          <ContactFormNameField />
          <ContactFormEmailField />
          <ContactFormMessageField />
          <ContactFormTurnstile />
          <ContactFormStatus />
          <ContactFormSubmit />
        </ContactFormBody>
      </ContactFormSurface>
    </>
  );
}

export { ContactFormDefaultLayout };
