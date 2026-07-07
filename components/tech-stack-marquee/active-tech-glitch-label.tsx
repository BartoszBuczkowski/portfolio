import { cn } from "@/lib/utils";
import type { TechStackMarqueeGlitchLabelProps } from "./types";

export function TechStackMarqueeGlitchLabel({ tech }: TechStackMarqueeGlitchLabelProps) {
  return (
    <p
      data-text={tech?.label}
      className={cn(
        "text-muted-foreground my-4 inline-block w-min whitespace-nowrap align-top font-light leading-none tech-stack-glitch transition-opacity duration-300 ease-out text-shadow-sm shadow-muted-foreground/10",
        { "opacity-100": tech, "opacity-0": !tech },
      )}
    >
      {tech?.label}
    </p>
  );
}
