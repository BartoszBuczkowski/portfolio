"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TechnologiesList } from "./components/technologies-list";
import { TimelineCaseStudies } from "./components/timeline-case-studies";
import { TimelineDot } from "./components/timeline-dot";
import { TimelineItemDetails } from "./components/timeline-item-details";
import { TimelineItemLogo } from "./components/timeline-item-logo";
import { useExperienceTimelineScroll } from "./experience-timeline-scroll-context";
import { formatPeriod } from "./helpers";
import { useTimelineItemRowMotion } from "./hooks/use-timeline-item-row-motion";
import { TimelineItemRowProps } from "./types";

export function TimelineItemRow({ item, index }: TimelineItemRowProps) {
  const { lineHeight, setItemRef, dotOffsets, activeIndex, itemVariants, presentLabel } = useExperienceTimelineScroll();
  const isLeft = index % 2 === 0;
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
  const side = isLeft ? "left" : "right";

  return (
    <motion.li
      ref={handleItemRef}
      data-timeline-side={isLeft ? "left" : "right"}
      className={cn(
        "group/timeline-row relative flex min-h-[100px] flex-col items-stretch md:flex-row md:items-center md:[&>.spacer]:block",
        {
          "md:flex-row": isLeft,
          "md:flex-row-reverse": !isLeft,
        },
      )}
      initial="hidden"
      animate={animateVariant}
      variants={itemVariants}
      custom={side}
      style={{
        opacity: isActive ? 1 : contentOpacity,
      }}
    >
      <motion.div
        className={cn("w-full py-4 md:w-[calc(50%-32px)] text-left pl-0", "md:pl-0 md:pr-0", {
          "md:pr-8 md:text-right": isLeft,
          "md:pl-8 md:text-left": !isLeft,
        })}
      >
        <div className={cn("mb-8 flex justify-start", isLeft && "md:justify-end")}>
          <TimelineItemLogo item={item} />
        </div>

        <TimelineItemDetails period={period} item={item} />

        <TechnologiesList technologies={item.technologies} isLeft={isLeft} />
      </motion.div>

      <TimelineDot dotScale={dotScale} dotOpacity={dotOpacity} />

      <div
        className={cn(
          "spacer",
          "flex w-full shrink-0 flex-col pt-2 pb-4 md:w-[calc(50%-32px)] md:items-start md:justify-start md:py-4 md:pt-0",
          {
            "md:pl-8 md:justify-start": isLeft,
            "md:pr-8 md:justify-end": !isLeft,
          },
        )}
      >
        {item.caseStudies && (
          <TimelineCaseStudies
            caseStudies={item.caseStudies}
            isRight={!isLeft}
            isTimelineRowActive={isActive}
            className={cn({
              "ml-6 mr-2 md:ml-14": isLeft,
              "ml-6 mr-2 md:ml-0 md:mr-14": !isLeft,
            })}
          />
        )}
      </div>
    </motion.li>
  );
}
