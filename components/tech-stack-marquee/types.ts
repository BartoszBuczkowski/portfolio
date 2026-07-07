import type { ReactNode } from "react";

export type TechStackItem = {
  label: string;
  icon: string;
};

export type OptionalTechStackItem = TechStackItem | undefined;

export type ActiveTechTuple =
  | [OptionalTechStackItem, OptionalTechStackItem, OptionalTechStackItem, OptionalTechStackItem]
  | [];

export type TechStackMarqueeState = {
  activeTech: ActiveTechTuple;
  currentActiveTechIndex: number;
  activeTechLabel: string | undefined;
};

export type TechStackMarqueeActions = Record<string, never>;

export type TechStackMarqueeMeta = Record<string, never>;

export type TechStackMarqueeContextValue = {
  state: TechStackMarqueeState;
  actions: TechStackMarqueeActions;
  meta: TechStackMarqueeMeta;
};

export type TechStackMarqueeRootProps = {
  children?: ReactNode;
};

export type TechStackMarqueeChromeProps = {
  children: ReactNode;
};

export type TechStackMarqueeScrollRowsProps = {
  firstRowItems: TechStackItem[];
  secondRowItems: TechStackItem[];
};

export type TechStackMarqueeScrollRowProps = {
  items: TechStackItem[];
  className?: string;
};

export type TechStackMarqueeStackTileProps = {
  item: TechStackItem;
};

export type TechStackMarqueeGlitchLabelProps = {
  tech: OptionalTechStackItem;
};
