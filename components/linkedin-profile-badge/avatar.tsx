import { getTranslations } from "next-intl/server";
import Image from "next/image";

const avatarSrc = "/profile/avatar.jpg";

export async function LinkedInProfileBadgeAvatar() {
  const t = await getTranslations("LinkedInBadge");

  return (
    <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-[#0A66C2]/35 ring-offset-2 ring-offset-card dark:ring-[#0A66C2]/50">
      <Image
        src={avatarSrc}
        alt={t("avatarAlt")}
        width={64}
        height={64}
        sizes="64px"
        className="size-full object-cover"
      />
    </div>
  );
}
