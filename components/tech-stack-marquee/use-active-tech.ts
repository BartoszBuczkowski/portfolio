import { useEffect, useState } from "react";

import { techStack } from "./data";
import { getCandidateTechItems, getNextIndex, getPreviouslyActiveLabel } from "./functions";
import type { TechStackItem } from "./types";

type OptionalTechStackItem = TechStackItem | undefined;
type ActiveTech = [OptionalTechStackItem, OptionalTechStackItem, OptionalTechStackItem, OptionalTechStackItem] | [];

const intervalMs = 2000;
const marqueeContainerSelector = ".tech-stack-fade-mask";
const techTileSelector = "[data-tech-label]";

function getRandomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function parseCssPx(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getVisibleTechLabels() {
  const container = document.querySelector(marqueeContainerSelector);

  if (!container) {
    return [];
  }

  const containerRect = container.getBoundingClientRect();
  const containerStyles = getComputedStyle(container);
  const containerLeft = containerRect.left + parseCssPx(containerStyles.paddingLeft);
  const containerRight = containerRect.right - parseCssPx(containerStyles.paddingRight);
  const techTiles = Array.from(document.querySelectorAll<HTMLElement>(techTileSelector));
  const visibleLabels = new Set<string>();

  techTiles.forEach((tile) => {
    const label = tile.dataset.techLabel;

    if (!label) {
      return;
    }

    const tileRect = tile.getBoundingClientRect();
    const tileStyles = getComputedStyle(tile);
    const tileOuterLeft = tileRect.left - parseCssPx(tileStyles.marginLeft);
    const tileOuterRight = tileRect.right + parseCssPx(tileStyles.marginRight);
    const centerX = (tileOuterLeft + tileOuterRight) / 2;
    const centerY = (tileRect.top + tileRect.bottom) / 2;
    const isVisibleInsideContainer =
      centerX >= containerLeft && centerX <= containerRight && centerY >= containerRect.top && centerY <= containerRect.bottom;

    if (isVisibleInsideContainer) {
      visibleLabels.add(label);
    }
  });

  return Array.from(visibleLabels);
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
