import { buildStructuredData } from "@/lib/json-ld";
import { getLocale, getTranslations } from "next-intl/server";

type FaqItem = {
  question: string;
  answer: string;
};

export async function StructuredData() {
  const locale = await getLocale();
  const tMeta = await getTranslations("Metadata");
  const tFaq = await getTranslations("FAQ");
  const faqItems = tFaq.raw("items") as FaqItem[];

  const data = buildStructuredData({
    locale,
    title: tMeta("title"),
    description: tMeta("description"),
    faqItems,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
