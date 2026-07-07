import { HeroBackground } from "./background";
import { HeroDefaultLayout } from "./default-layout";

export async function HeroRoot() {
  return (
    <header className="relative flex w-full flex-col overflow-hidden bg-background px-6 py-20">
      <HeroBackground />
      <HeroDefaultLayout />
    </header>
  );
}
