"use client";

import { useCallback, useEffect, useState } from "react";
import type { UseTimelineCaseStudiesParams } from "../../types";

const AUTO_ADVANCE_MS = 6500;

export function useTimelineCaseStudies({ caseStudies, isActive }: UseTimelineCaseStudiesParams) {
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
    if (!hasManyCaseStudies || !isActive || isHovering) return;

    const id = window.setInterval(goToNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [goToNext, hasManyCaseStudies, isHovering, isActive]);

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
