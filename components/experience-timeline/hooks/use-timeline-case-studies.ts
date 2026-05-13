"use client";

import { useCallback, useEffect, useState } from "react";
import type { CaseStudy } from "../types";

const AUTO_ADVANCE_MS = 6500;

type UseTimelineCaseStudiesParams = {
  caseStudies: CaseStudy[];
  isTimelineRowActive?: boolean;
};

export function useTimelineCaseStudies({ caseStudies, isTimelineRowActive = false }: UseTimelineCaseStudiesParams) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovering, setIsHovering] = useState(false);

  const hasManyCaseStudies = caseStudies.length > 1;

  const goToNext = useCallback(() => {
    if (!hasManyCaseStudies) return;

    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  }, [caseStudies.length, hasManyCaseStudies]);

  const goToPrev = useCallback(() => {
    if (!hasManyCaseStudies) return;

    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  }, [caseStudies.length, hasManyCaseStudies]);

  useEffect(() => {
    if (!hasManyCaseStudies || !isTimelineRowActive || isHovering) return;

    const id = window.setInterval(goToNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [goToNext, hasManyCaseStudies, isHovering, isTimelineRowActive]);

  const activeCaseStudy = caseStudies[activeIndex];

  const selectIndex = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  return {
    activeCaseStudy,
    activeIndex,
    direction,
    isHovering,
    setIsHovering,
    goToNext,
    goToPrev,
    selectIndex,
  };
}
