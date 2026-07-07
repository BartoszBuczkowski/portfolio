import { createContext } from "react";
import type { ExperienceTimelineItemContextValue } from "../types";

export const ExperienceTimelineItemContext = createContext<ExperienceTimelineItemContextValue | null>(null);
