"use client";

import { motion } from "framer-motion";
import { useExperienceTimeline } from "../use-experience-timeline";

export function ExperienceTimelineLine() {
  const { meta } = useExperienceTimeline();

  return (
    <motion.div
      className="absolute top-0 left-4 w-px bg-linear-to-b from-foreground/20 via-foreground/50 to-foreground/20 transition-[height] duration-150 ease-out md:left-1/2 md:-translate-x-1/2"
      style={{ height: meta.lineHeight }}
      aria-hidden
    />
  );
}
