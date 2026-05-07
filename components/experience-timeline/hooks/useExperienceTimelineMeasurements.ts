"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useExperienceTimelineMeasurements() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [listHeight, setListHeight] = useState(0);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, listHeight]);
  const indicatorTop = useTransform(lineHeight, (height) =>
    Math.max(height - 6, -6),
  );

  const measureDotOffsets = () => {
    const list = listRef.current;
    if (!list) return;
    const offsets = itemRefs.current.map((item) =>
      item ? item.offsetTop + item.offsetHeight / 2 : 0,
    );
    setDotOffsets(offsets);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateListMeasurements = () => {
      setListHeight(list.offsetHeight);
      measureDotOffsets();
    };

    const ro = new ResizeObserver(updateListMeasurements);
    ro.observe(list);
    const itemResizeObserver = new ResizeObserver(measureDotOffsets);
    itemRefs.current.forEach((item) => {
      if (item) itemResizeObserver.observe(item);
    });

    updateListMeasurements();
    measureDotOffsets();
    window.addEventListener("resize", measureDotOffsets);

    return () => {
      window.removeEventListener("resize", measureDotOffsets);
      ro.disconnect();
      itemResizeObserver.disconnect();
    };
  }, []);

  const setItemRef = (index: number, el: HTMLLIElement | null) => {
    itemRefs.current[index] = el;
  };

  return {
    sectionRef,
    listRef,
    dotOffsets,
    lineHeight,
    indicatorTop,
    setItemRef,
  };
}
