import { createContext } from "react";
import type { ExperienceTimelineContextValue } from "./types";

export const ExperienceTimelineContext = createContext<ExperienceTimelineContextValue | null>(null);
