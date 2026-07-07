import { getTranslations } from "next-intl/server";

export async function HeroContent() {
  const t = await getTranslations("Hero");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl max-w-3xl">{t("headline")}</h1>
      <p className="text-lg text-muted-foreground max-w-3xl">{t("description")}</p>
    </div>
  );
}
