import { TechStackMarqueeStackTile } from "./stack-tile";
import type { TechStackMarqueeScrollRowProps } from "./types";

export function TechStackMarqueeScrollRow({ items, className }: TechStackMarqueeScrollRowProps) {
  return (
    <div className={className}>
      <div className="tech-stack-scroll flex w-max divide-x divide-muted dark:divide-muted/40">
        {items.map((item, index) => (
          <TechStackMarqueeStackTile key={`${item.label}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
