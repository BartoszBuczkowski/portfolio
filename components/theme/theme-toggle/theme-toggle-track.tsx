"use client";

import { cn } from "@/lib/utils";

export function ThemeToggleTrack({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div role="group" className={cn("relative flex h-9 items-center justify-between rounded-full bg-muted px-1 py-1", className)}>
      {children}
    </div>
  );
}
