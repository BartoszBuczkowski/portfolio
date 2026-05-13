"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useTimelineCaseStudies } from "../hooks/use-timeline-case-studies";
import type { CaseStudy } from "../types";
import { TimelineCaseStudyDots } from "./timeline-case-study-dots";
import { TimelineCaseStudyNav } from "./timeline-case-study-nav";
import { TimelineCaseStudySlideWrapper } from "./timeline-case-study-slide-wrapper";

interface TimelineCaseStudiesProps {
  caseStudies: CaseStudy[];
  isTimelineRowActive?: boolean;
}

interface TimelineCaseStudiesContentProps {
  title: string;
  value: string;
}

const timelineCaseStudiesClassName = "my-4 -mb-16 space-y-8 transition-all duration-300 cursor-pointer ml-6 mr-2 md:ml-14";
const timelineCaseStudiesHeadingClassName = "mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground";

function TimelineCaseStudiesContent({ title, value }: TimelineCaseStudiesContentProps) {
  return (
    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
      <span className="font-medium text-foreground/80">{title}: </span>
      {value}
    </p>
  );
}

export function TimelineCaseStudies({ caseStudies, isTimelineRowActive = false }: TimelineCaseStudiesProps) {
  const t = useTranslations("Experience");
  const { activeCaseStudy, activeIndex, direction, isHovering, setIsHovering, goToNext, goToPrev, selectIndex } = useTimelineCaseStudies({
    caseStudies,
    isTimelineRowActive,
  });

  return (
    <div
      className={cn(timelineCaseStudiesClassName, { "scale-102": isHovering })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <p className={timelineCaseStudiesHeadingClassName}>{t("caseStudiesHeading")}</p>

      <div className="overflow-hidden">
        <TimelineCaseStudySlideWrapper activeIndex={activeIndex} direction={direction}>
          <p className="text-sm font-medium text-foreground">{activeCaseStudy.productName}</p>

          <TimelineCaseStudiesContent title={t("caseStudy.problem")} value={activeCaseStudy.problem} />
          <TimelineCaseStudiesContent title={t("caseStudy.contribution")} value={activeCaseStudy.contribution} />
        </TimelineCaseStudySlideWrapper>
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <TimelineCaseStudyDots caseStudies={caseStudies} activeIndex={activeIndex} onSelect={selectIndex} />

        <TimelineCaseStudyNav isHovering={isHovering} isTimelineRowActive={isTimelineRowActive} onPrevious={goToPrev} onNext={goToNext} />
      </div>
    </div>
  );
}
