"use client";

import type { MotionValue } from "framer-motion";
import type { Variants } from "framer-motion";
import { createContext, useContext } from "react";

export type ExperienceTimelineScrollContextValue = {
  lineHeight: MotionValue<number>;
  setItemRef: (index: number, el: HTMLLIElement | null) => void;
  dotOffsets: number[];
  activeIndex: number;
  itemVariants: Variants;
  presentLabel: string;
};

const ExperienceTimelineScrollContext = createContext<ExperienceTimelineScrollContextValue | null>(null);

export function useExperienceTimelineScroll() {
  const value = useContext(ExperienceTimelineScrollContext);
  if (!value) {
    throw new Error("useExperienceTimelineScroll must be used within ExperienceTimelineScrollContext.Provider");
  }
  return value;
}

export { ExperienceTimelineScrollContext };
