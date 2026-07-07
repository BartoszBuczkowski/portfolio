import type { CaseStudy, TimelineItem } from "@/components/experience-timeline/types";

function toIsoDate(year: number, month = 1, day = 1): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function buildExperienceGraph(personId: string, experience: TimelineItem[]) {
  const roles = experience.map((item, index) => ({
    "@type": "OrganizationRole" as const,
    "@id": `${personId}#role-${index}`,
    roleName: item.roleTitle,
    description: item.description,
    startDate: toIsoDate(item.yearFrom),
    ...(item.yearTo ? { endDate: toIsoDate(item.yearTo, 12, 31) } : {}),
    worksFor: {
      "@type": "Organization" as const,
      name: item.companyName,
    },
    holder: { "@id": personId },
  }));

  const projects = experience.flatMap((item, roleIndex) =>
    (item.caseStudies ?? []).map((caseStudy: CaseStudy, projectIndex) => ({
      "@type": "CreativeWork" as const,
      "@id": `${personId}#project-${roleIndex}-${projectIndex}`,
      name: caseStudy.productName,
      description: `${caseStudy.problem} ${caseStudy.contribution}`,
      creator: { "@id": personId },
      keywords: item.technologies.join(", "),
    })),
  );

  return [...roles, ...projects];
}
