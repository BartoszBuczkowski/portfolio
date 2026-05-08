"use client";

import { cn } from "@/lib/utils";
import { TechBadge } from "../tech-badge";

type TechnologiesListProps = {
  technologies: string[];
  isLeft: boolean;
};

export function TechnologiesList({ technologies, isLeft }: TechnologiesListProps) {
  return (
    <ul className={cn("mt-3 flex flex-wrap gap-1.5", isLeft ? "md:justify-end" : "md:justify-start")}>
      {technologies.map((tech) => (
        <li key={tech}>
          <TechBadge label={tech} />
        </li>
      ))}
    </ul>
  );
}
