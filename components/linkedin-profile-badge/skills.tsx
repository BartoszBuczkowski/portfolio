const SKILLS = ["TypeScript", "Node.js", "React"] as const;

export function LinkedInProfileBadgeSkills() {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {SKILLS.map((skill) => (
        <li
          key={skill}
          className="rounded-sm border border-border bg-muted/30 px-2 py-0.5 text-xs font-medium text-foreground/80"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}
