import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export type ContactLink = { label: string; href: string };

export function HeroHeader({
  name = "Your Name",
  location = "City, Country",
}: {
  name?: string;
  location?: string;
}) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
      <div>
        <p className="font-semibold tracking-tight text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">
          {location.toUpperCase()}
        </p>
      </div>

      <ThemeToggle />
    </div>
  );
}
