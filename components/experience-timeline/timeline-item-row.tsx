"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TechBadge } from "./tech-badge";
import { TimelineItemRowProps } from "./types";

function formatPeriod(yearFrom: number, yearTo: number | null): string {
  if (yearTo === null) return `${yearFrom} — Present`;
  if (yearTo === yearFrom) return `${yearFrom}`;
  return `${yearFrom} — ${yearTo}`;
}

export function TimelineItemRow({ setItemRef, item, isLeft, lineHeight, dotOffset, itemVariants }: TimelineItemRowProps) {
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

  const period = formatPeriod(item.yearFrom, item.yearTo);

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
        <p className="mb-1 text-sm font-medium text-muted-foreground">{period}</p>
        <h3 className="text-lg font-semibold text-foreground">{item.roleTitle}</h3>
        <p className="mb-2 text-sm text-muted-foreground">{item.companyName}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>

        {item.technologies.length > 0 && (
          <ul className={cn("mt-3 flex flex-wrap gap-1.5", isLeft ? "md:justify-end" : "md:justify-start")}>
            {item.technologies.map((tech) => (
              <li key={tech}>
                <TechBadge label={tech} />
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <div className={cn("absolute left-[-32px] top-1/2 z-10 -translate-y-1/2 md:left-1/2")}>
        <motion.div
          className="h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground"
          style={{
            scale: dotScale,
            opacity: dotOpacity,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>

      <div className="hidden w-[calc(50%-32px)] spacer" />
    </motion.li>
  );
}
