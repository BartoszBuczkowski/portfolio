"use client";

import { type RefObject, useEffect } from "react";

/** Syncs visual viewport size/offset as CSS vars on `ref` for keyboard-safe modals. */
export function useVisualViewport(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    const vv = window.visualViewport;
    if (!el || !vv) return;

    const update = () => {
      el.style.setProperty("--vv-height", `${vv.height}px`);
      el.style.setProperty("--vv-offset-top", `${vv.offsetTop}px`);
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [ref, enabled]);
}
