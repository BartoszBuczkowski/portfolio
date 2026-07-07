"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ExperienceTimelineCaseStudySlideProps } from "../types";

export function ExperienceTimelineCaseStudySlide({ activeIndex, direction, children }: ExperienceTimelineCaseStudySlideProps) {
  return (
    <AnimatePresence custom={direction} initial={false} mode="wait">
      <motion.div
        key={activeIndex}
        custom={direction}
        initial={{ x: direction > 0 ? 22 : -22, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction > 0 ? -22 : 22, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
