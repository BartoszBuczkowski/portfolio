import {
  type LucideIcon,
  Boxes,
  Database,
  Figma,
  FlaskConical,
  FolderTree,
  KeyRound,
  Layers,
  Megaphone,
  Palette,
  Shield,
  ShoppingBag,
  Sparkles,
  Train,
  Wind,
} from "lucide-react";
import { techStack } from "@/components/tech-stack-marquee/data";
import type { TechIcon } from "../types";

const stackIconByLabel = new Map(techStack.map((item) => [item.label, item.icon]));

const lucideIconByLabel: Record<string, LucideIcon> = {
  "E-commerce": ShoppingBag,
  "Graphic Design": Palette,
  Branding: Sparkles,
  Marketing: Megaphone,
  "React Query": Database,
  "Tailwind CSS": Wind,
  Monorepo: FolderTree,
  Rails: Train,
  "React Testing Library": FlaskConical,
  Web3: Boxes,
  Authentication: KeyRound,
  Encryption: Shield,
  Figma: Figma,
};

export function resolveTechIcon(label: string): TechIcon | null {
  const stackIcon = stackIconByLabel.get(label);
  if (stackIcon) {
    return { kind: "image", src: `/tech/stack/${stackIcon}`, alt: `${label} icon` };
  }

  const fallback = lucideIconByLabel[label] ?? Layers;
  return { kind: "lucide", Icon: fallback };
}
