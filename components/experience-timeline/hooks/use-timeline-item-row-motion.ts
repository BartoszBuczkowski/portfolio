"use client";

import { MotionValue, MultiTransformer, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type UseTimelineItemRowMotionParams = {
  setItemRef: (el: HTMLLIElement | null) => void;
  lineHeight: MotionValue<number>;
  dotOffset: number;
  isActive: boolean;
};

type Transformer = MultiTransformer<[number, number, number], number>;

const dotOpacityTransformer: Transformer = ([reveal, activity, entrance]) => {
  return Number(reveal) * Number(activity) * Number(entrance);
};

const contentOpacityTransformer: Transformer = ([reveal, activity, entrance]) => {
  const combined = Number(reveal) * Number(activity) * Number(entrance);
  return Math.min(Math.max(combined, 0.3 * Number(entrance)), 1);
};

export function useTimelineItemRowMotion({ setItemRef, lineHeight, dotOffset, isActive }: UseTimelineItemRowMotionParams) {
  const itemRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(itemRef, {
    once: true,
    margin: "0px",
  });
  const safeDotOffset = Number.isFinite(dotOffset) ? dotOffset : 0;
  const revealProgress = useTransform(lineHeight, [safeDotOffset - 28, safeDotOffset + 8], [0, 1]);
  const smoothReveal = useSpring(revealProgress, {
    stiffness: 220,
    damping: 24,
    mass: 0.7,
  });
  const smoothActivity = useSpring(isActive ? 1 : 0.3, {
    stiffness: 260,
    damping: 28,
    mass: 0.8,
  });
  const entranceOpacity = useSpring(isInView ? 1 : 0, {
    stiffness: 380,
    damping: 36,
    mass: 0.55,
  });

  useEffect(() => {
    smoothActivity.set(isActive ? 1 : 0.3);
  }, [isActive, smoothActivity]);

  useEffect(() => {
    entranceOpacity.set(isInView ? 1 : 0);
  }, [isInView, entranceOpacity]);

  const commonTransformerInput = [smoothReveal, smoothActivity, entranceOpacity];

  const dotScale = useTransform(smoothReveal, [0, 1], [0.7, 1]);
  const dotOpacity = useTransform(commonTransformerInput, dotOpacityTransformer);
  const contentOpacity = useTransform(commonTransformerInput, contentOpacityTransformer);

  const handleItemRef = (el: HTMLLIElement | null) => {
    itemRef.current = el;
    setItemRef(el);
  };

  return {
    handleItemRef,
    dotScale,
    dotOpacity,
    contentOpacity,
    isInView,
  };
}
