"use client";

import Image from "next/image";
import { logoSlotClassName } from "../constants";
import type { ExperienceTimelineItemLogoProps } from "../types";

export function ExperienceTimelineItemLogo({ item }: ExperienceTimelineItemLogoProps) {
  const dir = "/experience/brands/";
  const desktopIconSrc = dir + item.logoSrc + ".svg";
  const mobileIconSrc = dir + item.logoSrc + "-mobile.svg";

  return (
    <div className="mb-4 flex justify-start md:justify-end">
      <div className={logoSlotClassName}>
        <Image src={desktopIconSrc} alt={item.companyName} fill className="hidden md:block dark:invert" />
        <Image src={mobileIconSrc} alt={item.companyName} fill className="block md:hidden dark:invert" />
      </div>
    </div>
  );
}
