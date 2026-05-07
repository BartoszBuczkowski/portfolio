import { cn } from "@/lib/utils";
import Image from "next/image";
import { resolveTechIcon } from "./tech-icon";

type TechBadgeProps = {
  label: string;
  className?: string;
};

export function TechBadge({ label, className }: TechBadgeProps) {
  const icon = resolveTechIcon(label);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm",
        "bg-muted/20 border border-muted",
        "px-2.5 py-1 text-xs font-medium text-foreground/80",
        className,
      )}
    >
      {icon?.kind === "image" && <Image src={icon.src} alt={icon.alt} width={14} height={14} className="size-3.5 shrink-0 dark:invert" />}
      {icon?.kind === "lucide" && <icon.Icon className="size-3.5 shrink-0" aria-hidden />}
      <span>{label}</span>
    </span>
  );
}
