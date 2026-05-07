"use client";

import { createContext, useContext, type ReactNode } from "react";

import { TechStackItem } from "./types";
import { useActiveTech } from "./use-active-tech";

interface TechStackMarqueeWrapperProps {
  children: ReactNode;
}

type ActiveTechLabelContextValue = string | undefined;
const ActiveTechLabelContext = createContext<ActiveTechLabelContextValue>(undefined);

export function useActiveTechLabel() {
  return useContext(ActiveTechLabelContext);
}

interface TechStackItemProps {
  tech: TechStackItem | undefined;
}

function TechStackItem({ tech }: TechStackItemProps) {
  return (
    <p className="my-4 inline-block w-min whitespace-nowrap align-top font-light leading-none animate-horizontal-pixel-smear">
      {tech?.label}
    </p>
  );
}

export function TechStackMarqueeWrapper({
  children,
}: TechStackMarqueeWrapperProps) {
  const activeTech = useActiveTech();
  const currentActiveTechIndex = activeTech.findIndex(Boolean);
  const activeTechLabel =
    currentActiveTechIndex === -1 ? undefined : activeTech[currentActiveTechIndex]?.label;

  return (
    <section
      className="mx-auto mt-10 w-full max-w-5xl px-4"
      data-active-tech-index={currentActiveTechIndex}
    >
      <div className="flex justify-between">
        {activeTech.map((tech, index) => (
          <TechStackItem key={`tech-${index}`} tech={tech} />
        ))}
      </div>

      <ActiveTechLabelContext.Provider value={activeTechLabel}>
        {children}
      </ActiveTechLabelContext.Provider>
    </section>
  );
}
