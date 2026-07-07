import { getTranslations } from "next-intl/server";

export async function HeroContent() {
  const t = await getTranslations("Hero");

  return (
    <div className="flex flex-col gap-3">
      <h1 className="flex max-w-3xl flex-col gap-1">
        <span className="block text-base font-normal text-muted-foreground md:text-lg">{t("headlineName")}</span>
        <span className="block text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {t("headlineRoleBefore")}
          <span className="whitespace-nowrap">{t("headlineRoleCore")}</span>
          {t("headlineRoleAfter")}
        </span>
      </h1>
      <p className="max-w-3xl text-lg text-muted-foreground">{t("description")}</p>
    </div>
  );
}
