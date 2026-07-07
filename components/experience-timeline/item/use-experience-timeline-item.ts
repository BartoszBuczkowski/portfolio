import { use } from "react";
import { ExperienceTimelineItemContext } from "./context";

export function useExperienceTimelineItem() {
  const value = use(ExperienceTimelineItemContext);
  if (!value) {
    throw new Error("ExperienceTimeline item sub-components must be used within ExperienceTimeline.Item.");
  }
  return value;
}
