import { createContext } from "react";
import type { FooterContactCtaContextValue } from "./types";

export const FooterContactCtaContext = createContext<FooterContactCtaContextValue | null>(null);
