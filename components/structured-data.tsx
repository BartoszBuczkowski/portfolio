import { buildStructuredData } from "@/lib/json-ld";
import { JsonLdScript } from "@/lib/json-ld-script";
import { getLocale, getTranslations } from "next-intl/server";

export async function StructuredData() {
  const locale = await getLocale();
  const tMeta = await getTranslations("Metadata");

  const data = buildStructuredData({
    locale,
    title: tMeta("title"),
    description: tMeta("description"),
  });

  return <JsonLdScript data={data} />;
}
