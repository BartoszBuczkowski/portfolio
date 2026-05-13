/**
 * Each inner array is one horizontal row of corner glitch labels (top above the marquee, bottom below).
 * Values are indices into the four-slot display tuple from {@link useActiveTech}.
 */
export const CORNER_GLITCH_SLOT_INDICES = [
  [0, 3],
  [2, 1],
] as const;
