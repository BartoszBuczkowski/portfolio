"use server";

import { verifyTurnstileToken } from "@/lib/turnstile";
import { getCloudflareContext } from "@opennextjs/cloudflare";
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

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: false, message: t("server.turnstileMisconfigured") };
  }

  const turnstileToken = formData.get("cf-turnstile-response")?.toString() ?? "";
  if (!turnstileToken) {
    return { ok: false, message: t("server.turnstileRequired") };
  }

  const turnstileOk = await verifyTurnstileToken(turnstileToken, secret);
  if (!turnstileOk) {
    return { ok: false, message: t("server.turnstileFailed") };
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.portfolio_db;
  if (!db) {
    return { ok: false, message: t("server.databaseError") };
  }

  try {
    await db
      .prepare(
        "INSERT INTO contact_submissions (name, email, message, locale) VALUES (?, ?, ?, ?)",
      )
      .bind(name.trim(), email.trim(), message.trim(), locale)
      .run();
  } catch {
    return { ok: false, message: t("server.databaseError") };
  }

  return { ok: true, message: t("server.success") };
}
