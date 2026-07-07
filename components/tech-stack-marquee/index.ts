import { TechStackMarqueeGlitchLabel } from "./active-tech-glitch-label";
import { TechStackMarqueeChrome } from "./chrome";
import { TechStackMarqueeDefaultLayout } from "./default-layout";
import { TechStackMarqueeRoot } from "./root";
import { TechStackMarqueeScrollRow } from "./scroll-row";
import { TechStackMarqueeScrollRows } from "./scroll-rows";
import { TechStackMarqueeStackTile } from "./stack-tile";

export const TechStackMarquee = Object.assign(TechStackMarqueeRoot, {
  Chrome: TechStackMarqueeChrome,
  ScrollRows: TechStackMarqueeScrollRows,
  ScrollRow: TechStackMarqueeScrollRow,
  StackTile: TechStackMarqueeStackTile,
  GlitchLabel: TechStackMarqueeGlitchLabel,
  DefaultLayout: TechStackMarqueeDefaultLayout,
});

export type { TechStackItem } from "./types";
