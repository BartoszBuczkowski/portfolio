"use client";

import type { ExperienceTimelineCaseStudyContentProps } from "../types";

export function ExperienceTimelineCaseStudyContent({ title, value }: ExperienceTimelineCaseStudyContentProps) {
  return (
    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
      <span className="font-medium text-foreground/80">{title}: </span>
      {value}
    </p>
  );
}
