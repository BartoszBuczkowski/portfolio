"use client";

import { TechStackMarqueeChrome } from "./chrome";
import { techStack } from "./data";
import { buildMarqueeScrollRows } from "./functions";
import { TechStackMarqueeScrollRows } from "./scroll-rows";

export function TechStackMarqueeDefaultLayout() {
  const rows = buildMarqueeScrollRows(techStack);

  return (
    <TechStackMarqueeChrome>
      <TechStackMarqueeScrollRows firstRowItems={rows.firstRowItems} secondRowItems={rows.secondRowItems} />
    </TechStackMarqueeChrome>
  );
}
