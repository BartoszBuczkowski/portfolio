import type { MotionValue, Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode, RefObject } from "react";

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

export type FormatPeriod = (yearFrom: number, yearTo: number | null, presentLabel: string) => string;

export type TechIcon = { kind: "image"; src: string; alt: string } | { kind: "lucide"; Icon: LucideIcon };

export type ExperienceTimelineState = {
  dotOffsets: number[];
  activeIndex: number;
  presentLabel: string;
};

export type ExperienceTimelineActions = {
  setItemRef: (index: number, el: HTMLLIElement | null) => void;
};

export type ExperienceTimelineMeta = {
  lineHeight: MotionValue<number>;
  indicatorTop: MotionValue<number>;
  itemVariants: Variants;
};

export type ExperienceTimelineContextValue = {
  state: ExperienceTimelineState;
  actions: ExperienceTimelineActions;
  meta: ExperienceTimelineMeta;
};

export type ExperienceTimelineItemState = {
  item: TimelineItem;
  index: number;
  isActive: boolean;
  period: string;
  isInView: boolean;
  dotScale: MotionValue<number>;
  dotOpacity: MotionValue<number>;
  contentOpacity: MotionValue<number>;
};

export type ExperienceTimelineItemContextValue = {
  state: ExperienceTimelineItemState;
};

export type ExperienceTimelineRootProps = {
  children?: ReactNode;
  className?: string;
};

export type ExperienceTimelineSectionProps = ComponentProps<"section">;

export type ExperienceTimelineDefaultLayoutProps = {
  sectionRef: RefObject<HTMLElement | null>;
  listRef: RefObject<HTMLUListElement | null>;
  className?: string;
};

export type ExperienceTimelineListProps = ComponentProps<"ul">;

export type ExperienceTimelineTrackProps = {
  children: ReactNode;
};

export type ExperienceTimelineItemProps = {
  item: TimelineItem;
  index: number;
};

export type ExperienceTimelineItemLogoProps = {
  item: TimelineItem;
};

export type ExperienceTimelineItemDetailsProps = {
  period: string;
  item: TimelineItem;
};

export type ExperienceTimelineItemDotProps = {
  dotScale: MotionValue<number>;
  dotOpacity: MotionValue<number>;
};

export type ExperienceTimelineTechnologiesProps = {
  technologies: string[];
};

export type ExperienceTimelineCaseStudiesProps = {
  caseStudies: CaseStudy[];
};

export type ExperienceTimelineCaseStudyContentProps = {
  title: string;
  value: string;
};

export type ExperienceTimelineCaseStudySlideProps = {
  activeIndex: number;
  direction: 1 | -1;
  children: ReactNode;
};

export type ExperienceTimelineCaseStudyDotsProps = {
  caseStudies: CaseStudy[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export type ExperienceTimelineCaseStudyNavProps = {
  isHovering: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export type TechBadgeProps = {
  label: string;
  className?: string;
};

export type UseExperienceTimelineMeasurementsParams = {
  sectionRef: RefObject<HTMLElement | null>;
  listRef: RefObject<HTMLUListElement | null>;
};

export type UseTimelineLayoutMeasurementsParams = {
  listRef: RefObject<HTMLUListElement | null>;
};

export type UseTimelineLineMotionParams = {
  sectionRef: RefObject<HTMLElement | null>;
  listHeight: number;
  dotOffsets: number[];
  activeIndex: number;
};

export type UseTimelineItemRowMotionParams = {
  setItemRef: (el: HTMLLIElement | null) => void;
  lineHeight: MotionValue<number>;
  dotOffset: number;
  isActive: boolean;
};

export type UseTimelineCaseStudiesParams = {
  caseStudies: CaseStudy[];
  isActive: boolean;
};
