"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type TimelineCaseStudySlideWrapperProps = {
  activeIndex: number;
  direction: 1 | -1;
  children: ReactNode;
};

export function TimelineCaseStudySlideWrapper({ activeIndex, direction, children }: TimelineCaseStudySlideWrapperProps) {
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
