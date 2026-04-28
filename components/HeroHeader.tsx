import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

export type ContactLink = { label: string; href: string };

export function HeroHeader() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
      <Logo />

      <ThemeToggle />
    </div>
  );
}
