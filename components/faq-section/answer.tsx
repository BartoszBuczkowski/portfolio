"use client";

import { cn } from "@/lib/utils";
import type { FaqSectionItemProps } from "./types";
import { useFaqSection } from "./use-faq-section";

export function FaqSectionAnswer({ item }: FaqSectionItemProps) {
  const { actions } = useFaqSection();
  const expanded = actions.isExpanded(item.id);

  return (
    <div
      className={cn("pt-3 transition-all duration-600 overflow-hidden", {
        "max-h-0": !expanded,
        "max-h-64": expanded,
      })}
    >
      <p className="text-sm leading-5 text-muted-foreground ml-3 mr-6">{item.answer}</p>
    </div>
  );
}
