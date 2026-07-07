import { use } from "react";
import { FooterContactCtaContext } from "./context";

export function useFooterContactCta() {
  const value = use(FooterContactCtaContext);
  if (!value) {
    throw new Error("FooterContactCta sub-components must be used within FooterContactCta.");
  }
  return value;
}
