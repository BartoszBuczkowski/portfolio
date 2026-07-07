"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { UseTimelineLayoutMeasurementsParams } from "../types";
import { measureActiveIndex, measureDotOffsets } from "./timeline-measurement-utils";

export function useTimelineLayoutMeasurements({ listRef }: UseTimelineLayoutMeasurementsParams) {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const itemResizeObserverRef = useRef<ResizeObserver | null>(null);

  const [listHeight, setListHeight] = useState(0);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const measureDotOffsetsRef = useRef<() => void>(() => {
    setDotOffsets(measureDotOffsets(itemRefs.current));
  });

  const measureActiveIndexRef = useRef<() => void>(() => {
    setActiveIndex(measureActiveIndex(itemRefs.current));
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
    const measureDotOffsetsFn = measureDotOffsetsRef.current;
    const measureActiveIndexFn = measureActiveIndexRef.current;

    const listResizeObserver = new ResizeObserver(updateListMeasurements);
    listResizeObserver.observe(list);

    const itemResizeObserver = new ResizeObserver(() => {
      measureDotOffsetsFn();
      measureActiveIndexFn();
    });
    itemResizeObserverRef.current = itemResizeObserver;
    itemRefs.current.forEach((item) => {
      if (!item) return;

      itemResizeObserver.observe(item);
    });

    updateListMeasurements();
    window.addEventListener("resize", updateListMeasurements);
    window.addEventListener("scroll", measureActiveIndexFn, { passive: true });

    return () => {
      window.removeEventListener("resize", updateListMeasurements);
      window.removeEventListener("scroll", measureActiveIndexFn);
      listResizeObserver.disconnect();
      itemResizeObserver.disconnect();
      itemResizeObserverRef.current = null;
    };
  }, [listRef]);

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
    listHeight,
    dotOffsets,
    activeIndex,
    setItemRef,
  };
}
