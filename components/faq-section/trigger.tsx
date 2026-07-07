"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { FaqSectionItemProps } from "./types";
import { useFaqSection } from "./use-faq-section";

export function FaqSectionTrigger({ item }: FaqSectionItemProps) {
  const { actions } = useFaqSection();
  const expanded = actions.isExpanded(item.id);
  const questionId = `${item.id}-question`;
  const answerId = `${item.id}-answer`;

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-full justify-between py-0"
      aria-expanded={expanded}
      aria-controls={answerId}
      onClick={() => actions.toggle(item.id)}
    >
      <h3
        id={questionId}
        className="max-w-full text-base leading-6 font-medium text-foreground whitespace-break-spaces text-left"
      >
        {item.question}
      </h3>

      <ChevronDown
        aria-hidden
        className={cn("size-5 shrink-0 text-muted-foreground transition-transform", {
          "rotate-180": expanded,
        })}
      />
    </Button>
  );
}
