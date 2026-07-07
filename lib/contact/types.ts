import { siteConfig } from "@/lib/site-config";

export type ContactLocale = (typeof siteConfig.locales)[number];

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactState =
  | { ok: true; message: string }
  | { ok: false; message: string };
