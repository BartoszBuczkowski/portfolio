"use client";

import Image from "next/image";
import { TimelineItem } from "../types";

type TimelineItemLogoProps = {
  item: TimelineItem;
};

const logoSlotClassName = "relative h-24 w-[min(100%,12rem)]";

export function TimelineItemLogo({ item }: TimelineItemLogoProps) {
  return (
    <div className={logoSlotClassName}>
      <Image src={item.logoSrc} alt={item.companyName} fill className="dark:invert" />
    </div>
  );
}
