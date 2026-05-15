"use client";

import {
  ExperienceTimelineScrollContext,
  type ExperienceTimelineScrollContextValue,
} from "@/components/experience-timeline/experience-timeline-scroll-context";
import { useExperienceTimelineMeasurements } from "@/components/experience-timeline/hooks/use-experience-timeline-measurements";
import type { Variants } from "framer-motion";
import { useMemo, type ReactNode } from "react";

type ExperienceTimelineScrollProviderProps = {
  presentLabel: string;
  itemVariants: Variants;
  children: ReactNode;
};

export function ExperienceTimelineScrollProvider({ presentLabel, itemVariants, children }: ExperienceTimelineScrollProviderProps) {
  const { sectionRef, listRef, dotOffsets, activeIndex, lineHeight, indicatorTop, setItemRef } = useExperienceTimelineMeasurements();

  const value = useMemo<ExperienceTimelineScrollContextValue>(
    () => ({
      sectionRef,
      listRef,
      lineHeight,
      indicatorTop,
      setItemRef,
      dotOffsets,
      activeIndex,
      itemVariants,
      presentLabel,
    }),
    [sectionRef, listRef, lineHeight, indicatorTop, setItemRef, dotOffsets, activeIndex, itemVariants, presentLabel],
  );

  return <ExperienceTimelineScrollContext.Provider value={value}>{children}</ExperienceTimelineScrollContext.Provider>;
}
