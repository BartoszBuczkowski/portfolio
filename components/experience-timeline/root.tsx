"use client";

import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { itemVariants } from "./constants";
import { ExperienceTimelineContext } from "./context";
import { ExperienceTimelineDefaultLayout } from "./default-layout";
import { useExperienceTimelineMeasurements } from "./measurements/use-experience-timeline-measurements";
import type { ExperienceTimelineContextValue, ExperienceTimelineRootProps } from "./types";

export function ExperienceTimelineRoot({ children, className }: ExperienceTimelineRootProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const t = useTranslations("Experience");
  const presentLabel = t("timeline.present");

  const measurements = useExperienceTimelineMeasurements({ sectionRef, listRef });

  const contextValue = useMemo<ExperienceTimelineContextValue>(
    () => ({
      state: {
        dotOffsets: measurements.dotOffsets,
        activeIndex: measurements.activeIndex,
        presentLabel,
      },
      actions: {
        setItemRef: measurements.setItemRef,
      },
      meta: {
        lineHeight: measurements.lineHeight,
        indicatorTop: measurements.indicatorTop,
        itemVariants,
      },
    }),
    [measurements, presentLabel],
  );

  return (
    <ExperienceTimelineContext value={contextValue}>
      {children ?? <ExperienceTimelineDefaultLayout sectionRef={sectionRef} listRef={listRef} className={className} />}
    </ExperienceTimelineContext>
  );
}
