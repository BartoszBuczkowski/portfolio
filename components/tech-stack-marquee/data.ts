import type { TechStackItem } from "./types";

export const techStack: TechStackItem[] = [
  { label: "JavaScript", icon: "javascript.svg" },
  { label: "React", icon: "react.svg" },
  { label: "Next.js", icon: "next-js.svg" },
  { label: "Node.js", icon: "node-js.svg" },
  { label: "Express.js", icon: "express.svg" },
  { label: "NestJS", icon: "nest.svg" },
  { label: "GraphQL", icon: "graphql.svg" },
  { label: "TypeScript", icon: "typescript.svg" },
  { label: "Hasura", icon: "hasura.svg" },
  { label: "MongoDB", icon: "mongodb.svg" },
  { label: "Redux", icon: "redux.svg" },
  { label: "PostgreSQL", icon: "postgresql.svg" },
  { label: "Jest", icon: "jest.svg" },
  { label: "Cypress", icon: "cypress.svg" },
  { label: "Material UI", icon: "material-ui.svg" },
  { label: "Ant Design", icon: "ant-design.svg" },
  { label: "Styled Components", icon: "styled-components.svg" },
  { label: "Webpack", icon: "webpack.svg" },
  { label: "Rollup", icon: "rollup.svg" },
  { label: "Turborepo", icon: "vercel.svg" },
  { label: "Yarn Workspaces", icon: "yarn.svg" },
  { label: "React Native", icon: "react-native.svg" },
  { label: "Storybook", icon: "storybook.svg" },
  { label: "Biome", icon: "hasura.svg" },
  { label: "Git", icon: "git.svg" },
  { label: "GitHub Actions", icon: "github.svg" },
];

/**
 * Each inner array is one horizontal row of corner glitch labels (top above the marquee, bottom below).
 * Values are indices into the four-slot display tuple from useActiveTech.
 */
export const CORNER_GLITCH_SLOT_INDICES = [
  [0, 3],
  [2, 1],
] as const;

export const ACTIVE_TECH_INTERVAL_MS = 2000;

export const MARQUEE_CONTAINER_SELECTOR = ".tech-stack-fade-mask";
export const TECH_TILE_SELECTOR = "[data-tech-label]";
