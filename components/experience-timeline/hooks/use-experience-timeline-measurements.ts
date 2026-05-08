"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useExperienceTimelineMeasurements() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [listHeight, setListHeight] = useState(0);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, listHeight]);
  const indicatorTop = useTransform(lineHeight, (height) => Math.max(height - 6, -6));

  const measureDotOffsets = () => {
    const list = listRef.current;
    if (!list) return;
    const offsets = itemRefs.current.map((item) => (item ? item.offsetTop + item.offsetHeight / 2 : 0));
    setDotOffsets(offsets);
  };

  const measureActiveIndex = () => {
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
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateListMeasurements = () => {
      setListHeight(list.offsetHeight);
      measureDotOffsets();
      measureActiveIndex();
    };

    const ro = new ResizeObserver(updateListMeasurements);
    ro.observe(list);
    const itemResizeObserver = new ResizeObserver(() => {
      measureDotOffsets();
      measureActiveIndex();
    });
    itemRefs.current.forEach((item) => {
      if (item) itemResizeObserver.observe(item);
    });

    updateListMeasurements();
    measureDotOffsets();
    measureActiveIndex();
    window.addEventListener("resize", updateListMeasurements);
    window.addEventListener("scroll", measureActiveIndex, { passive: true });

    return () => {
      window.removeEventListener("resize", updateListMeasurements);
      window.removeEventListener("scroll", measureActiveIndex);
      ro.disconnect();
      itemResizeObserver.disconnect();
    };
  }, []);

  const setItemRef = (index: number, el: HTMLLIElement | null) => {
    itemRefs.current[index] = el;
    if (el) {
      measureDotOffsets();
      measureActiveIndex();
    }
  };

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
