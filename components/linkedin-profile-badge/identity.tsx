import { siteConfig } from "@/lib/site-config";
import { getTranslations } from "next-intl/server";

export async function LinkedInProfileBadgeIdentity() {
  const t = await getTranslations("LinkedInBadge");

  return (
    <div className="min-w-0 space-y-1">
      <p className="font-semibold tracking-tight text-foreground">{siteConfig.name}</p>
      <p className="text-sm leading-snug text-muted-foreground">{t("headline")}</p>
      <p className="text-xs text-muted-foreground">{t("location")}</p>
    </div>
  );
}
