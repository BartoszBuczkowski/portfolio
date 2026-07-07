"use client";

import { ExperienceTimelineIndicator } from "./timeline/indicator";
import { ExperienceTimelineLine } from "./timeline/line";
import { ExperienceTimelineList } from "./timeline/list";
import { ExperienceTimelineSection } from "./timeline/section";
import { ExperienceTimelineTitle } from "./timeline/title";
import { ExperienceTimelineTrack } from "./timeline/track";
import type { ExperienceTimelineDefaultLayoutProps } from "./types";

export function ExperienceTimelineDefaultLayout({ sectionRef, listRef, className }: ExperienceTimelineDefaultLayoutProps) {
  return (
    <ExperienceTimelineSection ref={sectionRef} className={className}>
      <div className="mx-auto max-w-4xl">
        <ExperienceTimelineTitle />
        <ExperienceTimelineTrack>
          <ExperienceTimelineLine />
          <ExperienceTimelineIndicator />
          <ExperienceTimelineList ref={listRef} />
        </ExperienceTimelineTrack>
      </div>
    </ExperienceTimelineSection>
  );
}
