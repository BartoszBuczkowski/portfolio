import { TechStackMarqueeScrollRow } from "./scroll-row";
import type { TechStackMarqueeScrollRowsProps } from "./types";

export function TechStackMarqueeScrollRows({ firstRowItems, secondRowItems }: TechStackMarqueeScrollRowsProps) {
  return (
    <div className="tech-stack-fade-mask overflow-hidden px-6">
      <div className="divide-y divide-muted dark:divide-muted/40">
        <TechStackMarqueeScrollRow items={firstRowItems} />
        <TechStackMarqueeScrollRow items={secondRowItems} className="-ml-24" />
      </div>
    </div>
  );
}
