import { createContext } from "react";
import type { FaqSectionContextValue } from "./types";

export const FaqSectionContext = createContext<FaqSectionContextValue | null>(null);
