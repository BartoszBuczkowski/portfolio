import { JSX } from "react";

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
  icon: (props: { className?: string }) => JSX.Element;
  caseStudies?: CaseStudy[];
};

export type TimelineItemRowProps = {
  item: TimelineItem;
  index: number;
};
