"use client";

import type { UseExperienceTimelineMeasurementsParams } from "../types";
import { useTimelineLayoutMeasurements } from "./use-timeline-layout-measurements";
import { useTimelineLineMotion } from "./use-timeline-line-motion";

export function useExperienceTimelineMeasurements({ sectionRef, listRef }: UseExperienceTimelineMeasurementsParams) {
  const layout = useTimelineLayoutMeasurements({ listRef });
  const motion = useTimelineLineMotion({
    sectionRef,
    listHeight: layout.listHeight,
    dotOffsets: layout.dotOffsets,
    activeIndex: layout.activeIndex,
  });

  return {
    dotOffsets: layout.dotOffsets,
    activeIndex: layout.activeIndex,
    lineHeight: motion.lineHeight,
    indicatorTop: motion.indicatorTop,
    setItemRef: layout.setItemRef,
  };
}
