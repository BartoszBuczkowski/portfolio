"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TechnologiesList } from "./components/technologies-list";
import { TimelineDot } from "./components/timeline-dot";
import { TimelineItemDetails } from "./components/timeline-item-details";
import { TimelineItemRowProps } from "./types";

function formatPeriod(yearFrom: number, yearTo: number | null, presentLabel: string): string {
  if (yearTo === null) return `${yearFrom} — ${presentLabel}`;
  if (yearTo === yearFrom) return `${yearFrom}`;
  return `${yearFrom} — ${yearTo}`;
}

export function TimelineItemRow({ setItemRef, item, isLeft, lineHeight, dotOffset, itemVariants, presentLabel }: TimelineItemRowProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(itemRef, {
    once: true,
    margin: "-60px 0px -80px 0px",
  });
  const safeDotOffset = Number.isFinite(dotOffset) ? dotOffset : 0;
  const revealProgress = useTransform(lineHeight, [safeDotOffset - 28, safeDotOffset + 8], [0, 1]);
  const smoothReveal = useSpring(revealProgress, {
    stiffness: 220,
    damping: 24,
    mass: 0.7,
  });
  const dotScale = useTransform(smoothReveal, [0, 1], [0.7, 1]);
  const dotOpacity = useTransform(smoothReveal, [0, 1], [0, 1]);
  const contentScale = useTransform(smoothReveal, [0, 1], [0.96, 1]);
  const contentOpacity = useTransform(smoothReveal, [0, 1], [0.3, 1]);

  const handleItemRef = (el: HTMLLIElement | null) => {
    itemRef.current = el;
    setItemRef(el);
  };

  const period = formatPeriod(item.yearFrom, item.yearTo, presentLabel);
  const Icon = item.icon;

  return (
    <motion.li
      ref={handleItemRef}
      className={cn("relative flex min-h-[100px] items-center md:flex-row md:[&>.spacer]:block", {
        "md:flex-row": isLeft,
        "md:flex-row-reverse": !isLeft,
      })}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      custom={isLeft ? "left" : "right"}
    >
      <motion.div
        className={cn("w-full py-4 md:w-[calc(50%-32px)] text-left pl-0", "md:pl-0 md:pr-0", {
          "md:pr-8 md:text-right": isLeft,
          "md:pl-8 md:text-left": !isLeft,
        })}
        style={{
          scale: contentScale,
          opacity: contentOpacity,
        }}
      >
        <Icon className="mb-4 md:hidden" />

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
        <Icon className="size-40 m-auto" />
      </div>
    </motion.li>
  );
}
