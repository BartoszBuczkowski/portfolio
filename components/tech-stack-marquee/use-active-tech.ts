import { useEffect, useState } from "react";

import { techStack } from "./data";
import { getCandidateTechItems, getNextIndex, getPreviouslyActiveLabel, getVisibleTechLabels } from "./functions";
import type { TechStackItem } from "./types";

type OptionalTechStackItem = TechStackItem | undefined;
type ActiveTech = [OptionalTechStackItem, OptionalTechStackItem, OptionalTechStackItem, OptionalTechStackItem] | [];

const intervalMs = 2000;

function getRandomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function useActiveTech() {
  const [activeTech, setActiveTech] = useState<ActiveTech>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => {
        const next: ActiveTech = [undefined, undefined, undefined, undefined];
        const visibleTechLabels = getVisibleTechLabels();
        const visibleTechItems = techStack.filter((item) => visibleTechLabels.includes(item.label));

        if (!visibleTechItems.length) {
          return prev;
        }

        let currentActiveDisplayIndex = -1;

        for (let index = 3; index >= 0; index -= 1) {
          if (prev[index]) {
            currentActiveDisplayIndex = index;
            break;
          }
        }

        const nextIndex = getNextIndex(currentActiveDisplayIndex);
        const previouslyActiveLabel = getPreviouslyActiveLabel(prev, currentActiveDisplayIndex);
        const candidateTechItems = getCandidateTechItems(visibleTechItems, previouslyActiveLabel);

        if (!candidateTechItems.length) {
          return prev;
        }

        const randomTechToDisplay = getRandomItem(candidateTechItems);

        next[nextIndex] = randomTechToDisplay;

        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  return activeTech;
}
