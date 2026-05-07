import { AvailabilityBadge } from "@/components/availability-badge";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative isolate overflow-hidden bg-muted/50 dark:bg-black/5 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-8 items-start">
            <Logo />
            <AvailabilityBadge />
          </div>

          <div className="w-full max-w-[440px] space-y-6">
            <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="text-sm leading-5 text-muted-foreground">{t("ctaDescription")}</p>
            <form className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="footer-email" className="sr-only">
                {t("emailLabel")}
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className={cn(
                  "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-accent-foreground/5",
                )}
              />
              <Button type="button" variant="default">
                {t("sendEmail")}
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
