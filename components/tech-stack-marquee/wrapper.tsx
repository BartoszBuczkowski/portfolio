"use client";

import { createContext, useContext, type ReactNode } from "react";

import { cn } from "@/lib/utils";
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
    <p
      data-text={tech?.label}
      className={cn(
        "text-muted-foreground my-4 inline-block w-min whitespace-nowrap align-top font-light leading-none tech-stack-glitch transition-opacity duration-300 ease-out text-shadow-sm shadow-muted-foreground/10",
        { "opacity-100": tech, "opacity-0": !tech },
      )}
    >
      {tech?.label}
    </p>
  );
}

export function TechStackMarqueeWrapper({ children }: TechStackMarqueeWrapperProps) {
  const activeTech = useActiveTech();
  const currentActiveTechIndex = activeTech.findIndex(Boolean);
  const activeTechLabel = currentActiveTechIndex === -1 ? undefined : activeTech[currentActiveTechIndex]?.label;

  const firstRow = [activeTech[0], activeTech[3]];
  const secondRow = [activeTech[2], activeTech[1]];

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl px-4" data-active-tech-index={currentActiveTechIndex}>
      <div className="flex justify-between h-16">
        {firstRow.map((tech, index) => (
          <TechStackItem key={`tech-before-${index}`} tech={tech} />
        ))}
      </div>

      <ActiveTechLabelContext.Provider value={activeTechLabel}>{children}</ActiveTechLabelContext.Provider>

      <div className="flex justify-between h-16">
        {secondRow.map((tech, index) => (
          <TechStackItem key={`tech-after-${index}`} tech={tech} />
        ))}
      </div>
    </section>
  );
}
