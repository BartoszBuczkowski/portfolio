"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { ExperienceTimelineCaseStudies } from "../case-studies/case-studies";
import { caseStudiesClassName, timelineItemDetailsClassName, timelineRowClassName } from "../constants";
import { formatPeriod } from "../helpers";
import type { ExperienceTimelineItemContextValue, ExperienceTimelineItemProps } from "../types";
import { useExperienceTimeline } from "../use-experience-timeline";
import { ExperienceTimelineItemContext } from "./context";
import { ExperienceTimelineItemDetails } from "./details";
import { ExperienceTimelineItemDot } from "./dot";
import { ExperienceTimelineItemLogo } from "./logo";
import { ExperienceTimelineTechnologies } from "./technologies";
import { useTimelineItemRowMotion } from "./use-timeline-item-row-motion";

export function ExperienceTimelineItem({ item, index }: ExperienceTimelineItemProps) {
  const { state, actions, meta } = useExperienceTimeline();

  const dotOffset = state.dotOffsets[index] ?? 0;
  const isActive = state.activeIndex === index;

  const { handleItemRef, dotScale, dotOpacity, contentOpacity, isInView } = useTimelineItemRowMotion({
    setItemRef: (el: HTMLLIElement | null) => actions.setItemRef(index, el),
    lineHeight: meta.lineHeight,
    dotOffset,
    isActive,
  });

  const period = formatPeriod(item.yearFrom, item.yearTo, state.presentLabel);
  const animateVariant = isInView ? "visible" : "hidden";
  const opacity = isActive ? 1 : contentOpacity;

  const itemContextValue = useMemo<ExperienceTimelineItemContextValue>(
    () => ({
      state: {
        item,
        index,
        isActive,
        period,
        isInView,
        dotScale,
        dotOpacity,
        contentOpacity,
      },
    }),
    [item, index, isActive, period, isInView, dotScale, dotOpacity, contentOpacity],
  );

  return (
    <ExperienceTimelineItemContext value={itemContextValue}>
      <motion.li
        ref={handleItemRef}
        className={timelineRowClassName}
        initial="hidden"
        animate={animateVariant}
        variants={meta.itemVariants}
        style={{ opacity }}
      >
        <motion.div className={timelineItemDetailsClassName}>
          <ExperienceTimelineItemLogo item={item} />
          <ExperienceTimelineItemDetails period={period} item={item} />
          <ExperienceTimelineTechnologies technologies={item.technologies} />
        </motion.div>

        <ExperienceTimelineItemDot dotScale={dotScale} dotOpacity={dotOpacity} />

        {item.caseStudies && (
          <div className={caseStudiesClassName}>
            <ExperienceTimelineCaseStudies caseStudies={item.caseStudies} />
          </div>
        )}
      </motion.li>
    </ExperienceTimelineItemContext>
  );
}
