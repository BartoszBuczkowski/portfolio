"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { timelineCaseStudiesClassName, timelineCaseStudiesHeadingClassName } from "../constants";
import { useExperienceTimelineItem } from "../item/use-experience-timeline-item";
import type { ExperienceTimelineCaseStudiesProps } from "../types";
import { ExperienceTimelineCaseStudyContent } from "./content";
import { ExperienceTimelineCaseStudyDots } from "./dots";
import { useTimelineCaseStudies } from "./hooks/use-timeline-case-studies";
import { ExperienceTimelineCaseStudyNav } from "./nav";
import { ExperienceTimelineCaseStudySlide } from "./slide";

export function ExperienceTimelineCaseStudies({ caseStudies }: ExperienceTimelineCaseStudiesProps) {
  const t = useTranslations("Experience");
  const { state } = useExperienceTimelineItem();
  const { activeCaseStudy, activeIndex, direction, isHovering, setIsHovering, goToNext, goToPrev, selectIndex } = useTimelineCaseStudies({
    caseStudies,
    isActive: state.isActive,
  });

  return (
    <div
      className={cn(timelineCaseStudiesClassName, { "scale-102": isHovering })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <p className={timelineCaseStudiesHeadingClassName}>{t("caseStudiesHeading")}</p>

      <div className="overflow-hidden">
        <ExperienceTimelineCaseStudySlide activeIndex={activeIndex} direction={direction}>
          <p className="text-sm font-medium text-foreground">{activeCaseStudy.productName}</p>

          <ExperienceTimelineCaseStudyContent title={t("caseStudy.problem")} value={activeCaseStudy.problem} />
          <ExperienceTimelineCaseStudyContent title={t("caseStudy.contribution")} value={activeCaseStudy.contribution} />
        </ExperienceTimelineCaseStudySlide>
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <ExperienceTimelineCaseStudyDots caseStudies={caseStudies} activeIndex={activeIndex} onSelect={selectIndex} />
        <ExperienceTimelineCaseStudyNav isHovering={isHovering} onPrevious={goToPrev} onNext={goToNext} />
      </div>
    </div>
  );
}
