import { getTranslations } from "next-intl/server";

export async function FooterCopyright() {
  const t = await getTranslations("Footer");

  return (
    <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">{t("copyright")}</p>
    </div>
  );
}
