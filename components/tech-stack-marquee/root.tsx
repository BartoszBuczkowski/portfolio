"use client";

import { useMemo } from "react";
import { TechStackMarqueeContext } from "./context";
import { TechStackMarqueeDefaultLayout } from "./default-layout";
import { useActiveTech } from "./hooks/use-active-tech";
import type { TechStackMarqueeContextValue, TechStackMarqueeRootProps } from "./types";

export function TechStackMarqueeRoot({ children }: TechStackMarqueeRootProps) {
  const activeTech = useActiveTech();
  const currentActiveTechIndex = activeTech.findIndex(Boolean);
  const activeTechLabel = currentActiveTechIndex === -1 ? undefined : activeTech[currentActiveTechIndex]?.label;

  const contextValue = useMemo<TechStackMarqueeContextValue>(
    () => ({
      state: { activeTech, currentActiveTechIndex, activeTechLabel },
      actions: {},
      meta: {},
    }),
    [activeTech, activeTechLabel, currentActiveTechIndex],
  );

  return <TechStackMarqueeContext value={contextValue}>{children ?? <TechStackMarqueeDefaultLayout />}</TechStackMarqueeContext>;
}
