import { ExperienceTimelineCaseStudies } from "./case-studies/case-studies";
import { ExperienceTimelineDefaultLayout } from "./default-layout";
import { ExperienceTimelineItem } from "./item/item";
import { ExperienceTimelineItemDetails } from "./item/details";
import { ExperienceTimelineItemDot } from "./item/dot";
import { ExperienceTimelineItemLogo } from "./item/logo";
import { ExperienceTimelineTechnologies } from "./item/technologies";
import { ExperienceTimelineRoot } from "./root";
import { ExperienceTimelineIndicator } from "./timeline/indicator";
import { ExperienceTimelineLine } from "./timeline/line";
import { ExperienceTimelineList } from "./timeline/list";
import { ExperienceTimelineSection } from "./timeline/section";
import { ExperienceTimelineTitle } from "./timeline/title";
import { ExperienceTimelineTrack } from "./timeline/track";

export const ExperienceTimeline = Object.assign(ExperienceTimelineRoot, {
  Section: ExperienceTimelineSection,
  Title: ExperienceTimelineTitle,
  Track: ExperienceTimelineTrack,
  Line: ExperienceTimelineLine,
  Indicator: ExperienceTimelineIndicator,
  List: ExperienceTimelineList,
  Item: ExperienceTimelineItem,
  ItemLogo: ExperienceTimelineItemLogo,
  ItemDetails: ExperienceTimelineItemDetails,
  ItemDot: ExperienceTimelineItemDot,
  Technologies: ExperienceTimelineTechnologies,
  CaseStudies: ExperienceTimelineCaseStudies,
  DefaultLayout: ExperienceTimelineDefaultLayout,
});

export type { CaseStudy, TimelineItem } from "./types";
