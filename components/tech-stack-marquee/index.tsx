import { StackTile } from "./components/stack-tile";
import { TechStackMarqueeWrapper } from "./components/wrapper";
import { techStack } from "./data";

export function TechStackMarquee() {
  const firstRow = techStack.filter((_, index) => index % 2 === 0);
  const secondRow = techStack.filter((_, index) => index % 2 === 1);
  const normalizedSecondRow = secondRow.length === firstRow.length ? secondRow : [...secondRow, secondRow[0]];
  const firstRowItems = [...firstRow, ...firstRow];
  const secondRowItems = [...normalizedSecondRow, ...normalizedSecondRow];

  return (
    <TechStackMarqueeWrapper>
      <div className="tech-stack-fade-mask overflow-hidden px-6">
        <div className="divide-y divide-muted dark:divide-muted/40">
          <div className="tech-stack-scroll flex w-max divide-x divide-muted dark:divide-muted/40">
            {firstRowItems.map((item, index) => (
              <StackTile key={`row-1-${item.label}-${index}`} item={item} />
            ))}
          </div>

          <div className="-ml-24">
            <div className="tech-stack-scroll flex w-max divide-x divide-muted dark:divide-muted/40">
              {secondRowItems.map((item, index) => (
                <StackTile key={`row-2-${item.label}-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TechStackMarqueeWrapper>
  );
}
