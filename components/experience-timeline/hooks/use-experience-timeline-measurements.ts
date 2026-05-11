"use client";

import { useScroll, useTransform } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export function useExperienceTimelineMeasurements() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const itemResizeObserverRef = useRef<ResizeObserver | null>(null);

  const [listHeight, setListHeight] = useState(0);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, listHeight]);
  const indicatorTop = useTransform(lineHeight, (height) => Math.max(height - 6, -6));

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
      if (item) itemResizeObserver.observe(item);
    });

    updateListMeasurements();
    window.addEventListener("resize", updateListMeasurements);
    window.addEventListener("scroll", measureActiveIndex, { passive: true });

    return () => {
      window.removeEventListener("resize", updateListMeasurements);
      window.removeEventListener("scroll", measureActiveIndex);
      listResizeObserver.disconnect();
      itemResizeObserver.disconnect();
      itemResizeObserverRef.current = null;
    };
  }, []);

  const setItemRef = useCallback((index: number, el: HTMLLIElement | null) => {
    const observer = itemResizeObserverRef.current;
    const previous = itemRefs.current[index];
    if (previous && observer) observer.unobserve(previous);
    itemRefs.current[index] = el;
    if (el && observer) observer.observe(el);
    measureDotOffsetsRef.current();
    measureActiveIndexRef.current();
  }, []);

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
