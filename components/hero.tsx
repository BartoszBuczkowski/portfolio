import { AvailabilityBadge } from "@/components/availability-badge";
import { HeroBackground } from "@/components/hero-background";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const email = "bartosz.r.buczkowski@gmail.com";

export async function Hero() {
  const t = await getTranslations("Hero");
  const avatarSrc = "/avatar.jfif";
  const mailToLink = `mailto:${email}`;

  return (
    <header className="relative flex w-full flex-col overflow-hidden bg-background px-6 py-20">
      <HeroBackground />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <AvailabilityBadge />

        <div
          className={cn(
            "relative flex h-52 w-52 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-white/50 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5",
            "ring-2 ring-black/5 dark:ring-white/10",
          )}
        >
          <Image src={avatarSrc} alt={t("avatarAlt")} className="h-full w-full object-cover" width={208} height={208} />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl max-w-3xl">{t("headline")}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{t("description")}</p>

          <Button
            asChild
            className="bg-primary text-base font-medium text-primary-foreground shadow-md hover:bg-primary/90 self-center px-4 py-2"
          >
            <a href={mailToLink} className="inline-flex items-center gap-2">
              <MailIcon className="size-4" />
              {email}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
