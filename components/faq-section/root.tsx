"use client";

import { useCallback, useMemo, useState } from "react";
import { FaqSectionContext } from "./context";
import { FaqSectionDefaultLayout } from "./default-layout";
import type { FaqSectionContextValue, FaqSectionRootProps } from "./types";

export function FaqSectionRoot({ children }: FaqSectionRootProps) {
  const [expandedItemId, setExpandedItemId] = useState("faq-1");

  const toggle = useCallback((id: string) => {
    setExpandedItemId((current) => (current === id ? "" : id));
  }, []);

  const isExpanded = useCallback((id: string) => expandedItemId === id, [expandedItemId]);

  const contextValue = useMemo<FaqSectionContextValue>(
    () => ({
      state: { expandedItemId },
      actions: { toggle, isExpanded },
      meta: {},
    }),
    [expandedItemId, toggle, isExpanded],
  );

  return <FaqSectionContext value={contextValue}>{children ?? <FaqSectionDefaultLayout />}</FaqSectionContext>;
}
