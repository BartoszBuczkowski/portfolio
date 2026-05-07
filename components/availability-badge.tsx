export function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
      <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
      Open to work
    </div>
  );
}
