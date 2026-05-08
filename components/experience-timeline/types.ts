import { MotionValue, Variants } from "framer-motion";
import { JSX } from "react";

export type TimelineItem = {
  yearFrom: number;
  yearTo: number | null;
  roleTitle: string;
  companyName: string;
  description: string;
  technologies: string[];
  icon: (props: { className?: string }) => JSX.Element;
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
