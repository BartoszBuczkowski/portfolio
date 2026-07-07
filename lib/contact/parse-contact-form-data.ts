import { CONTACT_FORM_FIELDS } from "./fields";
import { parseContactLocale } from "./parse-contact-locale";
import type { ContactFormValues, ContactLocale } from "./types";

export function parseContactFormData(formData: FormData): {
  locale: ContactLocale;
  values: ContactFormValues;
  turnstileToken: string;
} {
  return {
    locale: parseContactLocale(formData.get(CONTACT_FORM_FIELDS.locale)?.toString()),
    values: {
      name: formData.get(CONTACT_FORM_FIELDS.name)?.toString() ?? "",
      email: formData.get(CONTACT_FORM_FIELDS.email)?.toString() ?? "",
      message: formData.get(CONTACT_FORM_FIELDS.message)?.toString() ?? "",
    },
    turnstileToken: formData.get(CONTACT_FORM_FIELDS.turnstile)?.toString() ?? "",
  };
}
