"use client";

import { TimelineItem } from "../types";

type TimelineItemDetailsProps = {
  period: string;
  item: TimelineItem;
};

export function TimelineItemDetails({ period, item }: TimelineItemDetailsProps) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-muted-foreground">{period}</p>
      <h3 className="text-lg font-semibold text-foreground">{item.roleTitle}</h3>
      <p className="mb-2 text-sm text-muted-foreground">{item.companyName}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </div>
  );
}
