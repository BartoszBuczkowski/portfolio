"use server";

import { createContactSchema, parseContactFormData, type ContactState } from "@/lib/contact";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getTranslations } from "next-intl/server";
import { contactFailure } from "./contact-failure";
import { contactSuccess } from "./contact-success";
import { insertSubmission } from "./insert-submission";

export async function submitContact(formData: FormData): Promise<ContactState> {
  const { locale, values, turnstileToken } = parseContactFormData(formData);

  const t = await getTranslations({ locale, namespace: "Contact" });
  const tv = await getTranslations({ locale, namespace: "Contact.validation" });

  const parsed = createContactSchema(tv).safeParse(values);
  if (!parsed.success) {
    const hasEmailIssue = parsed.error.issues.some((issue) => issue.path[0] === "email");
    return contactFailure(t(hasEmailIssue ? "server.invalidEmail" : "server.requiredFields"));
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return contactFailure(t("server.turnstileMisconfigured"));
  }

  if (!turnstileToken) {
    return contactFailure(t("server.turnstileRequired"));
  }

  const turnstileOk = await verifyTurnstileToken(turnstileToken, secret);
  if (!turnstileOk) {
    return contactFailure(t("server.turnstileFailed"));
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.portfolio_db;
  if (!db) {
    return contactFailure(t("server.databaseError"));
  }

  try {
    await insertSubmission(db, { ...parsed.data, locale });
  } catch {
    return contactFailure(t("server.databaseError"));
  }

  return contactSuccess(t("server.success"));
}
