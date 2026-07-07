"use client";

import { getExperience } from "@/static/experience";
import { useTranslations } from "next-intl";
import { ExperienceTimelineItem } from "../item/item";
import type { ExperienceTimelineListProps } from "../types";

export function ExperienceTimelineList({ ref, className, ...props }: ExperienceTimelineListProps) {
  const t = useTranslations("Experience");
  const experience = getExperience(t);

  return (
    <ul
      ref={ref}
      className={className ?? "relative -mt-3 flex flex-col gap-12 pl-12 md:pl-0 md:-mt-3"}
      {...props}
    >
      {experience.map((item, index) => (
        <ExperienceTimelineItem key={`${item.companyName}-${item.yearFrom}`} index={index} item={item} />
      ))}
    </ul>
  );
}
