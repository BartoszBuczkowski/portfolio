"use client";

import { motion } from "framer-motion";
import { TechnologiesList } from "./components/technologies-list";
import { TimelineCaseStudies } from "./components/timeline-case-studies";
import { TimelineDot } from "./components/timeline-dot";
import { TimelineItemDetails } from "./components/timeline-item-details";
import { TimelineItemLogo } from "./components/timeline-item-logo";
import { useExperienceTimelineScroll } from "./experience-timeline-scroll-context";
import { formatPeriod } from "./helpers";
import { TimelineItemRowProps } from "./types";
import { useTimelineItemRowMotion } from "./use-timeline-item-row-motion";

const timelineRowClassName =
  "group/timeline-row relative flex min-h-[100px] flex-col items-stretch md:flex-row md:items-center md:[&>.spacer]:block";
const timelineItemDetailsClassName = "w-full py-4 md:w-[calc(50%-32px)] text-left pl-0 md:pl-0 md:pr-8 md:text-right";
const caseStudiesClassName =
  "spacer flex w-full shrink-0 flex-col pt-2 pb-4 md:w-[calc(50%-32px)] md:items-start md:justify-start md:py-4 md:pt-0 md:pl-8";

export function TimelineItemRow({ item, index }: TimelineItemRowProps) {
  const { lineHeight, setItemRef, dotOffsets, activeIndex, itemVariants, presentLabel } = useExperienceTimelineScroll();

  const dotOffset = dotOffsets[index] ?? 0;
  const isActive = activeIndex === index;

  const { handleItemRef, dotScale, dotOpacity, contentOpacity, isInView } = useTimelineItemRowMotion({
    setItemRef: (el) => setItemRef(index, el),
    lineHeight,
    dotOffset,
    isActive,
  });

  const period = formatPeriod(item.yearFrom, item.yearTo, presentLabel);
  const animateVariant = isInView ? "visible" : "hidden";
  const opacity = isActive ? 1 : contentOpacity;

  return (
    <motion.li
      ref={handleItemRef}
      className={timelineRowClassName}
      initial="hidden"
      animate={animateVariant}
      variants={itemVariants}
      style={{ opacity }}
    >
      <motion.div className={timelineItemDetailsClassName}>
        <TimelineItemLogo item={item} />

        <TimelineItemDetails period={period} item={item} />

        <TechnologiesList technologies={item.technologies} />
      </motion.div>

      <TimelineDot dotScale={dotScale} dotOpacity={dotOpacity} />

      {item.caseStudies && (
        <div className={caseStudiesClassName}>
          <TimelineCaseStudies caseStudies={item.caseStudies} isTimelineRowActive={isActive} />
        </div>
      )}
    </motion.li>
  );
}
