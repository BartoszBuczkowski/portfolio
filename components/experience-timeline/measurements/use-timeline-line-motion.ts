"use client";

import { useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useLayoutEffect, useRef } from "react";
import type { UseTimelineLineMotionParams } from "../types";
import { computeLineHeight } from "./timeline-measurement-utils";

const LINE_SPRING_CONFIG = {
  stiffness: 220,
  damping: 28,
  mass: 0.7,
} as const;

export function useTimelineLineMotion({
  sectionRef,
  listHeight,
  dotOffsets,
  activeIndex,
}: UseTimelineLineMotionParams) {
  const initialScrollProgressRef = useRef<number | null>(null);
  const isScrollTrackingEnabledRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useSpring(0, LINE_SPRING_CONFIG);
  const indicatorTop = useTransform(lineHeight, (height) => Math.max(height - 6, -6));

  const updateLineHeight = useCallback(() => {
    lineHeight.set(
      computeLineHeight({
        scrollProgress: scrollYProgress.get(),
        listHeight,
        dotOffsets,
        activeIndex,
        isScrollTrackingEnabled: isScrollTrackingEnabledRef.current,
      }),
    );
  }, [scrollYProgress, listHeight, dotOffsets, activeIndex, lineHeight]);

  const updateLineHeightRef = useRef(updateLineHeight);

  useLayoutEffect(() => {
    updateLineHeightRef.current = updateLineHeight;
  }, [updateLineHeight]);

  const onScrollProgressChange = useCallback((latest: number) => {
    const initial = initialScrollProgressRef.current;
    const noInitialScrollProgress = initial === null;

    if (noInitialScrollProgress) {
      initialScrollProgressRef.current = latest;
    } else if (Math.abs(latest - initial) > 0.001) {
      isScrollTrackingEnabledRef.current = true;
    }

    updateLineHeightRef.current();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", onScrollProgressChange);

  useLayoutEffect(() => {
    if (listHeight <= 0) return;

    if (initialScrollProgressRef.current === null) {
      initialScrollProgressRef.current = scrollYProgress.get();
    }

    updateLineHeight();
  }, [listHeight, dotOffsets, activeIndex, scrollYProgress, updateLineHeight]);

  return {
    lineHeight,
    indicatorTop,
  };
}
