"use client";

import type { ReactNode } from "react";

import { ActiveTechLabelProvider } from "../active-tech-label-context";
import { CORNER_GLITCH_SLOT_INDICES } from "../corner-glitch-slots";
import type { ActiveTechTuple } from "../hooks/use-active-tech";
import { ActiveTechGlitchLabel } from "./active-tech-glitch-label";

type TechStackMarqueeChromeProps = {
  activeTech: ActiveTechTuple;
  currentActiveTechIndex: number;
  activeTechLabel: string | undefined;
  children: ReactNode;
};

export function TechStackMarqueeChrome({
  activeTech,
  currentActiveTechIndex,
  activeTechLabel,
  children,
}: TechStackMarqueeChromeProps) {
  const [topSlotIndices, bottomSlotIndices] = CORNER_GLITCH_SLOT_INDICES;

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl px-4" data-active-tech-index={currentActiveTechIndex}>
      <div className="flex h-16 justify-between">
        {topSlotIndices.map((slotIndex, index) => (
          <ActiveTechGlitchLabel key={`tech-before-${index}`} tech={activeTech[slotIndex]} />
        ))}
      </div>

      <ActiveTechLabelProvider value={activeTechLabel}>{children}</ActiveTechLabelProvider>

      <div className="flex h-16 justify-between">
        {bottomSlotIndices.map((slotIndex, index) => (
          <ActiveTechGlitchLabel key={`tech-after-${index}`} tech={activeTech[slotIndex]} />
        ))}
      </div>
    </section>
  );
}
