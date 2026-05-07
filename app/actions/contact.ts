"use server";

import { getTranslations } from "next-intl/server";

export type ContactState = { ok: boolean; message: string };

export async function submitContact(formData: FormData): Promise<ContactState> {
  const localeRaw = formData.get("locale")?.toString();
  const locale = localeRaw === "pl" ? "pl" : "en";
  const t = await getTranslations({ locale, namespace: "Contact" });

  const name = formData.get("name")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const message = formData.get("message")?.toString() ?? "";

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, message: t("server.requiredFields") };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, message: t("server.invalidEmail") };
  }

  // Placeholder: integrate with Resend, Nodemailer, or your API here.
  await new Promise((r) => setTimeout(r, 500));

  return { ok: true, message: t("server.success") };
}
