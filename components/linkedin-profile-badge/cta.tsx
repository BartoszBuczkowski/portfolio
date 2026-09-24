import { getLinkedInUrl } from "@/lib/site-config";
import { ArrowUpRight, LinkedinIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function LinkedInProfileBadgeCta() {
  const t = await getTranslations("LinkedInBadge");
  const href = getLinkedInUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-sm bg-[#0A66C2]/20 text-[#0A66C2] w-full"
    >
      <LinkedinIcon className="size-4" aria-hidden />
      <span className="flex-1 text-left text-sm">{t("cta")}</span>
      <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
    </a>
  );
}
