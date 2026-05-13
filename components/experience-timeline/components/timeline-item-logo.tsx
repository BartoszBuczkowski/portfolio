"use client";

import Image from "next/image";
import { TimelineItem } from "../types";

type TimelineItemLogoProps = {
  item: TimelineItem;
};

const logoSlotClassName = "relative h-24 w-[min(100%,12rem)]";

export function TimelineItemLogo({ item }: TimelineItemLogoProps) {
  const dir = "/experience-brands/";
  const desktopIconSrc = dir + item.logoSrc + ".svg";
  const mobileIconSrc = dir + item.logoSrc + "-mobile.svg";

  return (
    <div className={logoSlotClassName}>
      <Image src={desktopIconSrc} alt={item.companyName} fill className="hidden md:block dark:invert" />
      <Image src={mobileIconSrc} alt={item.companyName} fill className="block md:hidden dark:invert" />
    </div>
  );
}
