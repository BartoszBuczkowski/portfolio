import { MotionValue, Variants } from "framer-motion";

export type TimelineItem = {
  yearFrom: number;
  yearTo: number | null;
  roleTitle: string;
  companyName: string;
  description: string;
  technologies: string[];
};

export interface TimelineItemRowProps {
  setItemRef: (el: HTMLLIElement | null) => void;
  item: TimelineItem;
  isLeft: boolean;
  lineHeight: MotionValue<number>;
  dotOffset: number;
  itemVariants: Variants;
  presentLabel: string;
}
