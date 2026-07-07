import type { ContactFormValues, ContactLocale } from "@/lib/contact";

export async function insertSubmission(
  db: D1Database,
  data: ContactFormValues & { locale: ContactLocale },
): Promise<void> {
  await db
    .prepare("INSERT INTO contact_submissions (name, email, message, locale) VALUES (?, ?, ?, ?)")
    .bind(data.name, data.email, data.message, data.locale)
    .run();
}
