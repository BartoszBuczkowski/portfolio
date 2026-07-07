import { TechStackMarquee } from "@/components/tech-stack-marquee";
import { getTranslations } from "next-intl/server";

export async function TechStackSection() {
  const t = await getTranslations("TechStack");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-10">
      <div className="mx-auto mb-6 max-w-2xl space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{t("intro")}</p>
      </div>
      <TechStackMarquee />
    </div>
  );
}
