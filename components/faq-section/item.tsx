"use client";

import { FaqSectionAnswer } from "./answer";
import { FaqSectionTrigger } from "./trigger";
import type { FaqSectionItemProps } from "./types";

export function FaqSectionItem({ item }: FaqSectionItemProps) {
  return (
    <div className="border-b border-border py-4 first:pt-4">
      <FaqSectionTrigger item={item} />
      <FaqSectionAnswer item={item} />
    </div>
  );
}
