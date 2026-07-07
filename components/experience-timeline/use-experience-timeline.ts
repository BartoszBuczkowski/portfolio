import { use } from "react";
import { ExperienceTimelineContext } from "./context";

export function useExperienceTimeline() {
  const value = use(ExperienceTimelineContext);
  if (!value) {
    throw new Error("ExperienceTimeline sub-components must be used within ExperienceTimeline.");
  }
  return value;
}
