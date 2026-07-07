import type { FaqItem } from "@/components/faq-section/types";
import { getAbsoluteUrl, getLocalePath } from "@/lib/site-config";

export type FaqSchemaItem = Pick<FaqItem, "question" | "answer">;

export function buildFaqPageSchema(locale: string, faqItems: FaqSchemaItem[]) {
  const pageUrl = getAbsoluteUrl(getLocalePath(locale));
  const faqId = pageUrl ? `${pageUrl}#faq` : "#faq";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": faqId,
    ...(pageUrl ? { url: pageUrl } : {}),
    inLanguage: locale,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
