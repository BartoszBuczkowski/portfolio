import { use } from "react";
import { TechStackMarqueeContext } from "../context";

export function useTechStackMarquee() {
  const value = use(TechStackMarqueeContext);

  if (!value) {
    throw new Error("TechStackMarquee sub-components must be used within TechStackMarquee.");
  }

  return value;
}
