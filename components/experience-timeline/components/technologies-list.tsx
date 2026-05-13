"use client";

import { TechBadge } from "../tech-badge";

type TechnologiesListProps = {
  technologies: string[];
};

export function TechnologiesList({ technologies }: TechnologiesListProps) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5 md:justify-end">
      {technologies.map((tech) => (
        <li key={tech}>
          <TechBadge label={tech} />
        </li>
      ))}
    </ul>
  );
}
