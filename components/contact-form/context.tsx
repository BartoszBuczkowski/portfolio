import type { ContactState } from "@/app/actions/contact";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import type { RefObject } from "react";
import { createContext, use } from "react";
import type { UseFormReturn } from "react-hook-form";

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormVariant = "page" | "embedded";

export type ContactFormContextValue = {
  form: UseFormReturn<ContactFormValues>;
  t: (key: string) => string;
  tv: (key: string) => string;
  locale: string;
  state: ContactState | null;
  onSubmit: (values: ContactFormValues) => Promise<void>;
  variant: ContactFormVariant;
  turnstileToken: string | null;
  turnstileRef: RefObject<TurnstileInstance | null>;
  setTurnstileToken: (token: string | null) => void;
};

export const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function useContactForm() {
  const value = use(ContactFormContext);
  if (!value) {
    throw new Error("ContactForm subcomponents must be used within ContactForm.");
  }
  return value;
}
