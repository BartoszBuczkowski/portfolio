import type { FormatPeriod } from "./types";

export const formatPeriod: FormatPeriod = (yearFrom, yearTo, presentLabel) => {
  if (yearTo === null) return `${yearFrom} - ${presentLabel}`;
  if (yearTo === yearFrom) return `${yearFrom}`;
  return `${yearFrom} - ${yearTo}`;
};
