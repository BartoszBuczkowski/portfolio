import { createContext } from "react";
import type { TechStackMarqueeContextValue } from "./types";

export const TechStackMarqueeContext = createContext<TechStackMarqueeContextValue | null>(null);
