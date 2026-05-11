"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { CaseStudy } from "../types";

type TimelineCaseStudyDotsProps = {
  caseStudies: CaseStudy[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function TimelineCaseStudyDots({ caseStudies, activeIndex, onSelect, className }: TimelineCaseStudyDotsProps) {
  const t = useTranslations("Experience");

  if (caseStudies.length <= 1) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {caseStudies.map((study, index) => (
        <Button
          key={`${study.productName}-${index}`}
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => onSelect(index)}
          aria-label={`${t("caseStudy.goTo")} ${index + 1}`}
          aria-current={activeIndex === index}
          className={cn(
            "size-1 min-h-0 min-w-0 shrink-0 rounded-full p-0 text-transparent shadow-none",
            "gap-0 hover:text-transparent focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-0",
            activeIndex === index ? "bg-foreground hover:bg-foreground" : "bg-foreground/25 hover:bg-foreground/50",
          )}
        />
      ))}
    </div>
  );
}
