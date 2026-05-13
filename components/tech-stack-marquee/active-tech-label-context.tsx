"use client";

import { createContext, useContext, type ReactNode } from "react";

export type ActiveTechLabelContextValue = string | undefined;

const ActiveTechLabelContext = createContext<ActiveTechLabelContextValue>(undefined);

export function ActiveTechLabelProvider({
  value,
  children,
}: {
  value: ActiveTechLabelContextValue;
  children: ReactNode;
}) {
  return <ActiveTechLabelContext.Provider value={value}>{children}</ActiveTechLabelContext.Provider>;
}

export function useActiveTechLabel() {
  return useContext(ActiveTechLabelContext);
}
