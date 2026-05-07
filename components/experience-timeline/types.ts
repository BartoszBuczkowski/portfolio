import { MotionValue, Variants } from "framer-motion";

export type TimelineItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
};

export interface TimelineItemRowProps {
  setItemRef: (el: HTMLLIElement | null) => void;
  item: TimelineItem;
  isLeft: boolean;
  lineHeight: MotionValue<number>;
  dotOffset: number;
  itemVariants: Variants;
}
