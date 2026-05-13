"use client";

import { useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export function useExperienceTimelineMeasurements() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const itemResizeObserverRef = useRef<ResizeObserver | null>(null);

  const [listHeight, setListHeight] = useState(0);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const initialScrollProgressRef = useRef<number | null>(null);
  const isScrollTrackingEnabledRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useSpring(0, {
    stiffness: 220,
    damping: 28,
    mass: 0.7,
  });
  const indicatorTop = useTransform(lineHeight, (height) => Math.max(height - 6, -6));

  const updateLineHeight = useCallback(() => {
    const rawHeight = scrollYProgress.get() * listHeight;
    const clampedRawHeight = Math.min(Math.max(rawHeight, 0), listHeight);
    const activeCheckpointOffset = dotOffsets[activeIndex] ?? 0;

    if (isScrollTrackingEnabledRef.current) {
      lineHeight.set(clampedRawHeight);
      return;
    }

    lineHeight.set(Math.min(Math.max(Math.max(clampedRawHeight, activeCheckpointOffset), 0), listHeight));
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

  const measureDotOffsetsRef = useRef<() => void>(() => {
    const list = listRef.current;
    if (!list) return;

    const getItemCenterY = (item: HTMLLIElement | null) => {
      if (!item) return 0;
      return item.offsetTop + item.offsetHeight / 2;
    };

    const offsets = itemRefs.current.map(getItemCenterY);
    setDotOffsets(offsets);
  });

  const measureActiveIndexRef = useRef<() => void>(() => {
    const viewportCenterY = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const rect = item.getBoundingClientRect();
      const itemCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenterY - viewportCenterY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  });

  const updateListMeasurementsRef = useRef<() => void>(() => {
    const list = listRef.current;
    if (!list) return;
    setListHeight(list.offsetHeight);
    measureDotOffsetsRef.current();
    measureActiveIndexRef.current();
  });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateListMeasurements = updateListMeasurementsRef.current;
    const measureDotOffsets = measureDotOffsetsRef.current;
    const measureActiveIndex = measureActiveIndexRef.current;

    const listResizeObserver = new ResizeObserver(updateListMeasurements);
    listResizeObserver.observe(list);

    const itemResizeObserver = new ResizeObserver(() => {
      measureDotOffsets();
      measureActiveIndex();
    });
    itemResizeObserverRef.current = itemResizeObserver;
    itemRefs.current.forEach((item) => {
      if (!item) return;

      itemResizeObserver.observe(item);
    });

    initialScrollProgressRef.current = scrollYProgress.get();
    updateListMeasurements();
    updateLineHeightRef.current();
    window.addEventListener("resize", updateListMeasurements);
    window.addEventListener("scroll", measureActiveIndex, { passive: true });

    return () => {
      window.removeEventListener("resize", updateListMeasurements);
      window.removeEventListener("scroll", measureActiveIndex);
      listResizeObserver.disconnect();
      itemResizeObserver.disconnect();
      itemResizeObserverRef.current = null;
    };
  }, [scrollYProgress]);

  const setItemRef = useCallback((index: number, el: HTMLLIElement | null) => {
    const observer = itemResizeObserverRef.current;
    const previous = itemRefs.current[index];
    if (previous && observer) observer.unobserve(previous);
    itemRefs.current[index] = el;
    if (el && observer) observer.observe(el);
    measureDotOffsetsRef.current();
    measureActiveIndexRef.current();
  }, []);

  useLayoutEffect(() => {
    updateLineHeight();
  }, [updateLineHeight]);

  return {
    sectionRef,
    listRef,
    dotOffsets,
    activeIndex,
    lineHeight,
    indicatorTop,
    setItemRef,
  };
}
