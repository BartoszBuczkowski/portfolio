"use client";

import type { ReactNode } from "react";

import { useActiveTech } from "../hooks/use-active-tech";
import { TechStackMarqueeChrome } from "./tech-stack-marquee-chrome";

interface TechStackMarqueeWrapperProps {
  children: ReactNode;
}

export function TechStackMarqueeWrapper({ children }: TechStackMarqueeWrapperProps) {
  const activeTech = useActiveTech();
  const currentActiveTechIndex = activeTech.findIndex(Boolean);
  const activeTechLabel = currentActiveTechIndex === -1 ? undefined : activeTech[currentActiveTechIndex]?.label;

  return (
    <TechStackMarqueeChrome
      activeTech={activeTech}
      currentActiveTechIndex={currentActiveTechIndex}
      activeTechLabel={activeTechLabel}
    >
      {children}
    </TechStackMarqueeChrome>
  );
}
