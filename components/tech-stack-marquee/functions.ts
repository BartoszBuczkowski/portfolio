import type { TechStackItem } from "./types";

type OptionalTechStackItem = TechStackItem | undefined;

const marqueeContainerSelector = ".tech-stack-fade-mask";
const techTileSelector = "[data-tech-label]";

function parseCssPx(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getVisibleTechLabels() {
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
