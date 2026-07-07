import { FooterContactCta } from "@/components/footer-contact-cta";
import { AvailabilityBadge } from "@/components/availability-badge";
import { getTranslations } from "next-intl/server";

export async function FooterCtaColumn() {
  const t = await getTranslations("Footer");

  return (
    <div className="w-full max-w-[440px] space-y-6">
      <AvailabilityBadge />
      <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
      <p className="text-sm leading-5 text-muted-foreground">{t("ctaDescription")}</p>
      <FooterContactCta />
    </div>
  );
}
