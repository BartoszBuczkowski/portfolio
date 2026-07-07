import type { FaqItem } from "@/components/faq-section/types";
import { JsonLdScript } from "@/lib/json-ld-script";
import { buildFaqPageSchema } from "@/lib/faq-schema";
import { getLocale, getTranslations } from "next-intl/server";

export async function StructuredDataFaq() {
  const locale = await getLocale();
  const tFaq = await getTranslations("FAQ");
  const faqItems = tFaq.raw("items") as FaqItem[];

  return <JsonLdScript data={buildFaqPageSchema(locale, faqItems)} />;
}
