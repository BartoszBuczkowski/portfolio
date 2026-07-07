import type { ReactNode } from "react";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqSectionState = {
  expandedItemId: string;
};

export type FaqSectionActions = {
  toggle: (id: string) => void;
  isExpanded: (id: string) => boolean;
};

export type FaqSectionMeta = Record<string, never>;

export type FaqSectionContextValue = {
  state: FaqSectionState;
  actions: FaqSectionActions;
  meta: FaqSectionMeta;
};

export type FaqSectionRootProps = {
  children?: ReactNode;
};

export type FaqSectionItemProps = {
  item: FaqItem;
};
