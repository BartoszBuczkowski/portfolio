import { FaqSectionAnswer } from "./answer";
import { FaqSectionAside } from "./aside";
import { FaqSectionItem } from "./item";
import { FaqSectionList } from "./list";
import { FaqSectionRoot } from "./root";
import { FaqSectionTrigger } from "./trigger";

export const FaqSection = Object.assign(FaqSectionRoot, {
  Aside: FaqSectionAside,
  List: FaqSectionList,
  Item: FaqSectionItem,
  Trigger: FaqSectionTrigger,
  Answer: FaqSectionAnswer,
});

export type { FaqItem } from "./types";
