"use client";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { TechStackItem } from "./types";
import { useActiveTechLabel } from "./wrapper";

type StackTileProps = {
  item: TechStackItem;
};

export function StackTile({ item }: StackTileProps) {
  const src = `/stack/${item.icon}`;
  const alt = `${item.label} icon`;
  const size = 34;
  const activeTechLabel = useActiveTechLabel();
  const isActive = activeTechLabel === item.label;

  return (
    <div className="flex h-20 w-28 flex-col items-center justify-center gap-2 bg-card/70 transition-colors">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        data-tech-label={item.label}
        className={cn(
          "size-8 cursor-pointer transition-all duration-300",
          isActive ? "scale-120 opacity-95 dark:opacity-95" : "opacity-20 dark:opacity-35",
        )}
      />
    </div>
  );
}
