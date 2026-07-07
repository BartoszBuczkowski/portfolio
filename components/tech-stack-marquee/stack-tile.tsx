"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useTechStackMarquee } from "./hooks/use-tech-stack-marquee";
import type { TechStackMarqueeStackTileProps } from "./types";

export function TechStackMarqueeStackTile({ item }: TechStackMarqueeStackTileProps) {
  const {
    state: { activeTechLabel },
  } = useTechStackMarquee();
  const src = `/tech/stack/${item.icon}`;
  const alt = `${item.label} icon`;
  const size = 34;
  const isActive = activeTechLabel === item.label;

  return (
    <div className="flex h-20 w-28 flex-col items-center justify-center gap-2 transition-colors">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        data-tech-label={item.label}
        className={cn("size-8 cursor-pointer transition-all duration-300 dark:invert", {
          "scale-130 opacity-95": isActive,
          "opacity-20": !isActive,
        })}
      />
    </div>
  );
}
