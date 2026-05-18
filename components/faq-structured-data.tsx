import { JsonLdScript } from "@/lib/json-ld-script";
import { buildFaqPageSchema, type FaqSchemaItem } from "@/lib/faq-schema";
import { getLocale, getTranslations } from "next-intl/server";

export async function FaqStructuredData() {
  const locale = await getLocale();
  const tFaq = await getTranslations("FAQ");
  const faqItems = tFaq.raw("items") as FaqSchemaItem[];

  return <JsonLdScript data={buildFaqPageSchema(locale, faqItems)} />;
}
