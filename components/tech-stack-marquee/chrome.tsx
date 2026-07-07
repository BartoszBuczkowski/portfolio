"use client";

import { TechStackMarqueeGlitchLabel } from "./active-tech-glitch-label";
import { CORNER_GLITCH_SLOT_INDICES } from "./data";
import { useTechStackMarquee } from "./hooks/use-tech-stack-marquee";
import type { TechStackMarqueeChromeProps } from "./types";

export function TechStackMarqueeChrome({ children }: TechStackMarqueeChromeProps) {
  const { state } = useTechStackMarquee();
  const [topSlotIndices, bottomSlotIndices] = CORNER_GLITCH_SLOT_INDICES;

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl px-4" data-active-tech-index={state.currentActiveTechIndex}>
      <div className="flex h-16 justify-between">
        {topSlotIndices.map((slotIndex, index) => (
          <TechStackMarqueeGlitchLabel key={`tech-before-${index}`} tech={state.activeTech[slotIndex]} />
        ))}
      </div>

      {children}

      <div className="flex h-16 justify-between">
        {bottomSlotIndices.map((slotIndex, index) => (
          <TechStackMarqueeGlitchLabel key={`tech-after-${index}`} tech={state.activeTech[slotIndex]} />
        ))}
      </div>
    </section>
  );
}
