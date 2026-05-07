import type { TechStackItem } from "./types";

type OptionalTechStackItem = TechStackItem | undefined;

export function getNextIndex(currentActiveDisplayIndex: number) {
  if (currentActiveDisplayIndex === -1 || currentActiveDisplayIndex === 3) {
    return 0;
  }

  return currentActiveDisplayIndex + 1;
}

export function getPreviouslyActiveLabel(prev: OptionalTechStackItem[], currentActiveDisplayIndex: number) {
  if (currentActiveDisplayIndex === -1) {
    return undefined;
  }

  return prev[currentActiveDisplayIndex]?.label;
}

export function getCandidateTechItems(visibleTechItems: TechStackItem[], previouslyActiveLabel: string | undefined) {
  if (!previouslyActiveLabel) {
    return visibleTechItems;
  }

  return visibleTechItems.filter((item) => item.label !== previouslyActiveLabel);
}
