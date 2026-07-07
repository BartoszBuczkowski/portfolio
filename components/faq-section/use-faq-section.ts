import { use } from "react";
import { FaqSectionContext } from "./context";

export function useFaqSection() {
  const value = use(FaqSectionContext);
  if (!value) {
    throw new Error("FaqSection sub-components must be used within FaqSection.");
  }
  return value;
}
