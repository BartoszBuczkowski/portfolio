import { techStack } from "./data";
import { StackTile } from "./stack-tile";
import { TechStackMarqueeWrapper } from "./wrapper";

export function TechStackMarquee() {
  const firstRow = techStack.filter((_, index) => index % 2 === 0);
  const secondRow = techStack.filter((_, index) => index % 2 === 1);
  const firstRowItems = [...firstRow, ...firstRow];
  const secondRowItems = [...secondRow, ...secondRow];

  return (
    <TechStackMarqueeWrapper>
      <div className="tech-stack-fade-mask overflow-hidden px-6">
        <div className="divide-y divide-muted">
          <div className="tech-stack-scroll flex w-max divide-x divide-muted">
            {firstRowItems.map((item, index) => (
              <StackTile key={`row-1-${item.label}-${index}`} item={item} />
            ))}
          </div>

          <div className="tech-stack-scroll flex w-max divide-x divide-muted">
            {secondRowItems.map((item, index) => (
              <StackTile key={`row-2-${item.label}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </TechStackMarqueeWrapper>
  );
}
