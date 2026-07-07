import { StructuredDataFaq } from "./faq";
import { StructuredDataRoot } from "./root";

export const StructuredData = Object.assign(StructuredDataRoot, {
  Faq: StructuredDataFaq,
});
