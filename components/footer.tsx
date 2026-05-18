import { FooterContactCta } from "@/components/footer-contact-cta";
import { getTranslations } from "next-intl/server";
import { AvailabilityBadge } from "./availability-badge";
import { LinkedInProfileBadge } from "./linkedin-profile-badge";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative isolate overflow-hidden bg-muted/50 dark:bg-black/5 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-8 items-start">
            <LinkedInProfileBadge />
          </div>

          <div className="w-full max-w-[440px] space-y-6">
            <AvailabilityBadge />
            <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="text-sm leading-5 text-muted-foreground">{t("ctaDescription")}</p>
            <FooterContactCta
              emailLabel={t("emailLabel")}
              emailPlaceholder={t("emailPlaceholder")}
              sendEmail={t("sendEmail")}
              dialogTitle={t("dialogTitle")}
              invalidEmail={t("invalidEmail")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
