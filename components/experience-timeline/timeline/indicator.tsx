"use client";

import { motion } from "framer-motion";
import { useExperienceTimeline } from "../use-experience-timeline";

export function ExperienceTimelineIndicator() {
  const { meta } = useExperienceTimeline();

  return (
    <motion.div className="pointer-events-none absolute left-0 z-20 h-3 w-full" style={{ top: meta.indicatorTop }}>
      <div
        className="absolute left-4 h-3 w-3 shrink-0 -translate-x-1/2 rounded-full border-2 border-background bg-foreground md:left-1/2"
        aria-hidden
      />
    </motion.div>
  );
}
