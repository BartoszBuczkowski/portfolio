import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ContactLink } from "@/components/HeroHeader";
import { MailIcon } from "lucide-react";

export function Hero({
  headline = "Crafting User-Centric Experiences.",
  email,
  availabilityText = "Available to work",
  avatarSrc,
  className,
  description = "I'm a software engineer with a passion for building user-centric experiences. I'm currently working as a software engineer at Google.",
}: {
  headline?: string;
  email?: string;
  availabilityText?: string;
  contactLinks?: ContactLink[];
  avatarSrc?: string | null;
  description?: string;
} & React.ComponentProps<"header">) {
  return (
    <header className={cn("relative flex w-full flex-col overflow-hidden bg-background px-6 py-20", className)}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Cover: smooth radial fade so grid is invisible at the edges (circle plane) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 80% 70% at 50% 45%,
            transparent 0%,
            transparent 35%,
            var(--background) 75%,
            var(--background) 100%
          )`,
        }}
      />

      {/* Main hero content: badge, avatar, headline, email */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          {availabilityText}
        </div>

        <div
          className={cn(
            "relative flex h-52 w-52 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-white/50 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5",
            "ring-2 ring-black/5 dark:ring-white/10",
          )}
        >
          {avatarSrc ? (
            <Image src={avatarSrc} alt="" className="h-full w-full object-cover" width={208} height={208} />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-accent-violet/20 via-accent-pink/20 to-accent-blue/20" aria-hidden />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl max-w-3xl">{headline}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
          {email && (
            <Button
              asChild
              className="bg-primary text-base font-medium text-primary-foreground shadow-md hover:bg-primary/90 self-center px-4 py-2"
            >
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2">
                <MailIcon className="size-4" />
                {email}
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
