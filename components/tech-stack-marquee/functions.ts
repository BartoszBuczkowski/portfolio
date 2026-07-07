import { MARQUEE_CONTAINER_SELECTOR, TECH_TILE_SELECTOR } from "./data";
import type { ActiveTechTuple, OptionalTechStackItem, TechStackItem } from "./types";

function parseCssPx(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getVisibleTechLabels() {
  const container = document.querySelector(MARQUEE_CONTAINER_SELECTOR);

  if (!container) {
    return [];
  }

  const containerRect = container.getBoundingClientRect();
  const containerStyles = getComputedStyle(container);
  const containerLeft = containerRect.left + parseCssPx(containerStyles.paddingLeft);
  const containerRight = containerRect.right - parseCssPx(containerStyles.paddingRight);
  const techTiles = Array.from(document.querySelectorAll<HTMLElement>(TECH_TILE_SELECTOR));
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

export function getRandomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getCurrentActiveDisplayIndex(prev: ActiveTechTuple) {
  for (let index = 3; index >= 0; index -= 1) {
    if (prev[index]) {
      return index;
    }
  }

  return -1;
}

export function splitTechStackIntoRows(items: TechStackItem[]) {
  const firstRow = items.filter((_, index) => index % 2 === 0);
  const secondRow = items.filter((_, index) => index % 2 === 1);

  return { firstRow, secondRow };
}

export function normalizeMarqueeRow(row: TechStackItem[], referenceLength: number) {
  return row.length === referenceLength ? row : [...row, row[0]];
}

export function duplicateForInfiniteScroll(row: TechStackItem[]) {
  return [...row, ...row];
}

export function buildMarqueeScrollRows(items: TechStackItem[]) {
  const { firstRow, secondRow } = splitTechStackIntoRows(items);
  const normalizedSecondRow = normalizeMarqueeRow(secondRow, firstRow.length);

  return {
    firstRowItems: duplicateForInfiniteScroll(firstRow),
    secondRowItems: duplicateForInfiniteScroll(normalizedSecondRow),
  };
}
