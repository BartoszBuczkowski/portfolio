"use client";

import { motion, type MotionValue } from "framer-motion";

type TimelineDotProps = {
  dotScale: MotionValue<number>;
  dotOpacity: MotionValue<number>;
};

export function TimelineDot({ dotScale, dotOpacity }: TimelineDotProps) {
  return (
    <div className="absolute left-[-32px] top-1/2 z-10 -translate-y-1/2 md:left-1/2">
      <motion.div
        className="h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground"
        style={{
          scale: dotScale,
          opacity: dotOpacity,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </div>
  );
}
