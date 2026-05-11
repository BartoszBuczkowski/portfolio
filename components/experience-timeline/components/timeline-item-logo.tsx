"use client";

import { cn } from "@/lib/utils";
import { TimelineItem } from "../types";

type TimelineItemLogoProps = {
  item: TimelineItem;
};

const logoSlotClassName = "flex h-24 max-h-24 w-[min(100%,12rem)] shrink-0 items-center sm:w-[min(100%,9rem)]";

export function TimelineItemLogo({ item }: TimelineItemLogoProps) {
  const Icon = item.icon;
  const logoIconClassName = cn(
    "flex size-full max-h-full max-w-full items-center justify-start group-data-[timeline-side=left]/timeline-row:md:justify-end [&>svg]:max-h-full [&>svg]:max-w-full [&_img]:max-h-full [&_img]:max-w-full",
  );

  return (
    <div className={logoSlotClassName}>
      <Icon className={logoIconClassName} />
    </div>
  );
}
