"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type TimelineCaseStudyNavProps = {
  isHovering: boolean;
  isTimelineRowActive: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function TimelineCaseStudyNav({
  isHovering,
  isTimelineRowActive,
  onPrevious,
  onNext,
}: TimelineCaseStudyNavProps) {
  const t = useTranslations("Experience");

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-0.5 transition-opacity duration-300",
        isHovering && isTimelineRowActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={t("caseStudy.previous")}
        className="text-muted-foreground hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
      >
        <ChevronLeft />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={t("caseStudy.next")}
        className="text-muted-foreground hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
