"use client";

import { cn } from "@/lib/utils";
import type { ExperienceTimelineSectionProps } from "../types";

export function ExperienceTimelineSection({ className, children, ref, ...props }: ExperienceTimelineSectionProps) {
  return (
    <section ref={ref} id="experience" className={cn("relative py-24 px-4 md:px-6", className)} {...props}>
      {children}
    </section>
  );
}
