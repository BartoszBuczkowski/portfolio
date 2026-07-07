export function getItemCenterOffset(item: HTMLLIElement | null): number {
  if (!item) return 0;
  return item.offsetTop + item.offsetHeight / 2;
}

export function measureDotOffsets(items: Array<HTMLLIElement | null>): number[] {
  return items.map(getItemCenterOffset);
}

export function measureActiveIndex(items: Array<HTMLLIElement | null>): number {
  const viewportCenterY = window.innerHeight / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  items.forEach((item, index) => {
    if (!item) return;

    const rect = item.getBoundingClientRect();
    const itemCenterY = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenterY - viewportCenterY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

export type ComputeLineHeightParams = {
  scrollProgress: number;
  listHeight: number;
  dotOffsets: number[];
  activeIndex: number;
  isScrollTrackingEnabled: boolean;
};

export function computeLineHeight({
  scrollProgress,
  listHeight,
  dotOffsets,
  activeIndex,
  isScrollTrackingEnabled,
}: ComputeLineHeightParams): number {
  const rawHeight = scrollProgress * listHeight;
  const clampedRawHeight = Math.min(Math.max(rawHeight, 0), listHeight);
  const activeCheckpointOffset = dotOffsets[activeIndex] ?? 0;

  if (isScrollTrackingEnabled) {
    return clampedRawHeight;
  }

  return Math.min(Math.max(Math.max(clampedRawHeight, activeCheckpointOffset), 0), listHeight);
}
