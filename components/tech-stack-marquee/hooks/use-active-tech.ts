import { useEffect, useState } from "react";

import { ACTIVE_TECH_INTERVAL_MS, techStack } from "../data";
import {
  getCandidateTechItems,
  getCurrentActiveDisplayIndex,
  getNextIndex,
  getPreviouslyActiveLabel,
  getRandomItem,
  getVisibleTechLabels,
} from "../functions";
import type { ActiveTechTuple } from "../types";

export function useActiveTech() {
  const [activeTech, setActiveTech] = useState<ActiveTechTuple>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => {
        const next: ActiveTechTuple = [undefined, undefined, undefined, undefined];
        const visibleTechLabels = getVisibleTechLabels();
        const visibleTechItems = techStack.filter((item) => visibleTechLabels.includes(item.label));

        if (!visibleTechItems.length) {
          return prev;
        }

        const currentActiveDisplayIndex = getCurrentActiveDisplayIndex(prev);
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
    }, ACTIVE_TECH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return activeTech;
}
