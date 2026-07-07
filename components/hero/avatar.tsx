import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const avatarSrc = "/profile/avatar.jpg";

export async function HeroAvatar() {
  const t = await getTranslations("Hero");

  return (
    <div
      className={cn(
        "relative flex h-52 w-52 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-white/50 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5",
        "ring-2 ring-black/5 dark:ring-white/10",
      )}
    >
      <Image
        priority
        src={avatarSrc}
        alt={t("avatarAlt")}
        width={208}
        height={208}
        sizes="208px"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
