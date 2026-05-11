export type FormatPeriod = (
  yearFrom: number,
  yearTo: number | null,
  presentLabel: string,
) => string;

export const formatPeriod: FormatPeriod = (yearFrom, yearTo, presentLabel) => {
  if (yearTo === null) return `${yearFrom} — ${presentLabel}`;
  if (yearTo === yearFrom) return `${yearFrom}`;
  return `${yearFrom} — ${yearTo}`;
};
