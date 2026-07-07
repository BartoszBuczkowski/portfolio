"use client";

import { Dialog } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { SiteNavMobileMenuContext } from "../context";
import type { SiteNavMobileMenuContextValue } from "../types";

type SiteNavMobileMenuRootProps = {
  children: React.ReactNode;
};

export function SiteNavMobileMenuRoot({ children }: SiteNavMobileMenuRootProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const contextValue = useMemo<SiteNavMobileMenuContextValue>(
    () => ({
      actions: {
        close: () => setMobileOpen(false),
      },
    }),
    [],
  );

  return (
    <SiteNavMobileMenuContext value={contextValue}>
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        {children}
      </Dialog>
    </SiteNavMobileMenuContext>
  );
}
