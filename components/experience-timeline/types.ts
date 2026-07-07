export type CaseStudy = {
  productName: string;
  problem: string;
  contribution: string;
};

export type TimelineItem = {
  yearFrom: number;
  yearTo: number | null;
  roleTitle: string;
  companyName: string;
  description: string;
  technologies: string[];
  /** Public URL under `/experience/brands/` (e.g. `/experience/brands/laras.svg`). */
  logoSrc: string;
  caseStudies?: CaseStudy[];
};

export type TimelineItemRowProps = {
  item: TimelineItem;
  index: number;
};
