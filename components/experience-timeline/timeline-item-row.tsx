"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TechnologiesList } from "./components/technologies-list";
import { TimelineDot } from "./components/timeline-dot";
import { TimelineItemDetails } from "./components/timeline-item-details";
import { useTimelineItemRowMotion } from "./hooks/use-timeline-item-row-motion";
import { formatPeriod } from "./helpers";
import { TimelineItemRowProps } from "./types";

export function TimelineItemRow({
  setItemRef,
  item,
  isLeft,
  lineHeight,
  dotOffset,
  isActive,
  itemVariants,
  presentLabel,
}: TimelineItemRowProps) {
  const { handleItemRef, dotScale, dotOpacity, contentOpacity, isInView } = useTimelineItemRowMotion({
    setItemRef,
    lineHeight,
    dotOffset,
    isActive,
  });

  const period = formatPeriod(item.yearFrom, item.yearTo, presentLabel);
  const Icon = item.icon;
  const animateVariant = isInView ? "visible" : "hidden";
  const side = isLeft ? "left" : "right";

  return (
    <motion.li
      ref={handleItemRef}
      className={cn("relative flex min-h-[100px] items-center md:flex-row md:[&>.spacer]:block", {
        "md:flex-row": isLeft,
        "md:flex-row-reverse": !isLeft,
      })}
      initial="hidden"
      animate={animateVariant}
      variants={itemVariants}
      custom={side}
      style={{
        opacity: contentOpacity,
      }}
    >
      <motion.div
        className={cn("w-full py-4 md:w-[calc(50%-32px)] text-left pl-0", "md:pl-0 md:pr-0", {
          "md:pr-8 md:text-right": isLeft,
          "md:pl-8 md:text-left": !isLeft,
        })}
      >
        <Icon className="block md:hidden w-40 mb-8" />

        <TimelineItemDetails period={period} item={item} />

        <TechnologiesList technologies={item.technologies} isLeft={isLeft} />
      </motion.div>

      <TimelineDot dotScale={dotScale} dotOpacity={dotOpacity} />

      <div
        aria-hidden
        className={cn("spacer hidden md:flex md:w-[calc(50%-32px)] md:items-center", {
          "md:pl-8 md:justify-start": isLeft,
          "md:pr-8 md:justify-end": !isLeft,
        })}
      >
        <Icon className="h-24 w-46 m-auto" />
      </div>
    </motion.li>
  );
}
