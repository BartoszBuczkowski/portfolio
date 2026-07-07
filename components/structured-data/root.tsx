import { buildStructuredData } from "@/lib/json-ld";
import { JsonLdScript } from "@/lib/json-ld-script";
import { getExperience } from "@/static/experience";
import { getLocale, getTranslations } from "next-intl/server";

export async function StructuredDataRoot() {
  const locale = await getLocale();
  const tMeta = await getTranslations("Metadata");
  const tExperience = await getTranslations("Experience");
  const experience = getExperience(tExperience);

  const data = buildStructuredData({
    locale,
    title: tMeta("title"),
    description: tMeta("description"),
    jobTitle: tMeta("jobTitle"),
    experience,
  });

  return <JsonLdScript data={data} />;
}
