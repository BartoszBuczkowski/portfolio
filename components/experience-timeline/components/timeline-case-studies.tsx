"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import type { CaseStudy } from "../types";
import { TimelineCaseStudyDots } from "./timeline-case-study-dots";

const AUTO_ADVANCE_MS = 6500;

type TimelineCaseStudiesProps = {
  caseStudies: CaseStudy[];
  className?: string;
  isRight?: boolean;
  isTimelineRowActive?: boolean;
};

export function TimelineCaseStudies({ caseStudies, className, isRight = false, isTimelineRowActive = false }: TimelineCaseStudiesProps) {
  const t = useTranslations("Experience");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovering, setIsHovering] = useState(false);

  const hasManyCaseStudies = caseStudies.length > 1;

  const goToNext = useCallback(() => {
    if (!hasManyCaseStudies) return;

    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  }, [caseStudies.length, hasManyCaseStudies]);

  useEffect(() => {
    if (!hasManyCaseStudies || !isTimelineRowActive || isHovering) return;

    const id = window.setInterval(goToNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [goToNext, hasManyCaseStudies, isHovering, isTimelineRowActive]);

  const activeCaseStudy = caseStudies[activeIndex];

  const textAlign = isRight ? "md:text-right" : "text-left";
  const dotsJustify = isRight ? "justify-end" : "justify-start";

  return (
    <div
      className={cn("my-4 -mb-16 space-y-8", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <p className={cn("mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground", textAlign)}>{t("caseStudiesHeading")}</p>

      <div className="overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 22 : -22, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -22 : 22, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={textAlign}
          >
            <p className="text-sm font-medium text-foreground">{activeCaseStudy.productName}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/80">{t("caseStudy.problem")}: </span>
              {activeCaseStudy.problem}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/80">{t("caseStudy.contribution")}: </span>
              {activeCaseStudy.contribution}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <TimelineCaseStudyDots
        caseStudies={caseStudies}
        activeIndex={activeIndex}
        className={dotsJustify}
        onSelect={(index) => {
          setDirection(index > activeIndex ? 1 : -1);
          setActiveIndex(index);
        }}
      />
    </div>
  );
}
