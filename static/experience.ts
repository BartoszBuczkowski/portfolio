import type { TimelineItem } from "@/components/experience-timeline/types";
import { EdocsIcon } from "@/components/icons/edocs-icon";
import { LarasIcon } from "@/components/icons/laras-icon";
import { NetiIcon } from "@/components/icons/neti-icon";
import { OffIcon } from "@/components/icons/off-icon";
import { PunktaPlIcon } from "@/components/icons/punkta-icon";
import { ReasonappsIcon } from "@/components/icons/reasonapps-icon";
import { UnivioG4nIcon } from "@/components/icons/univio-g4n-icon";

type ExperienceTranslator = (key: string) => string;

export const getExperience = (t: ExperienceTranslator): TimelineItem[] => {
  return [
    {
      roleTitle: t(`items.laras.roleTitle`),
      companyName: t(`items.laras.companyName`),
      description: t(`items.laras.description`),
      yearFrom: 2018,
      yearTo: 2020,
      technologies: ["E-commerce", "Graphic Design", "Branding", "Marketing"],
      icon: LarasIcon,
    },
    {
      roleTitle: t(`items.reasonapps.roleTitle`),
      companyName: t(`items.reasonapps.companyName`),
      description: t(`items.reasonapps.description`),
      yearFrom: 2020,
      yearTo: 2021,
      technologies: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "React Query",
        "Apollo",
        "GraphQL",
        "Styled Components",
        "Storybook",
        "Tailwind CSS",
      ],
      icon: ReasonappsIcon,
    },
    {
      roleTitle: t(`items.edocs.roleTitle`),
      companyName: t(`items.edocs.companyName`),
      description: t(`items.edocs.description`),
      yearFrom: 2021,
      yearTo: 2021,
      technologies: ["React", "TypeScript", "Webpack", "Rollup", "Storybook", "Ant Design", "Monorepo"],
      icon: EdocsIcon,
    },
    {
      roleTitle: t(`items.global4net.roleTitle`),
      companyName: t(`items.global4net.companyName`),
      description: t(`items.global4net.description`),
      yearFrom: 2021,
      yearTo: 2022,
      technologies: ["React", "React Native", "TypeScript", "Redux", "JavaScript"],
      icon: UnivioG4nIcon,
    },
    {
      roleTitle: t(`items.punkta.roleTitle`),
      companyName: t(`items.punkta.companyName`),
      description: t(`items.punkta.description`),
      yearFrom: 2022,
      yearTo: 2025,
      technologies: ["React", "TypeScript", "Redux", "Material UI", "Rails", "Jest", "React Testing Library", "Monorepo", "JavaScript"],
      icon: PunktaPlIcon,
    },
    {
      roleTitle: t(`items.neti.roleTitle`),
      companyName: t(`items.neti.companyName`),
      description: t(`items.neti.description`),
      yearFrom: 2025,
      yearTo: 2026,
      technologies: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Web3",
        "Authentication",
        "Encryption",
        "Figma",
        "NestJS",
        "PostgreSQL",
        "Node.js",
      ],
      icon: NetiIcon,
    },
    {
      roleTitle: t(`items.off.roleTitle`),
      companyName: t(`items.off.companyName`),
      description: t(`items.off.description`),
      yearFrom: 2026,
      yearTo: null,
      technologies: ["Branding", "NestJS", "Hasura", "Monorepo"],
      icon: OffIcon,
    },
  ];
};
