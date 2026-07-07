import { AvailabilityBadge } from "@/components/availability-badge";
import { HeroAvatar } from "./avatar";
import { HeroContent } from "./content";
import { HeroMailCta } from "./mail-cta";

export async function HeroDefaultLayout() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <AvailabilityBadge />

      <HeroAvatar />

      <div className="flex flex-col gap-6">
        <HeroContent />
        <HeroMailCta />
      </div>
    </div>
  );
}
