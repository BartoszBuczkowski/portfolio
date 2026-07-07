"use client";

import { useTranslations } from "next-intl";
import { FaqSectionItem } from "./item";
import type { FaqItem } from "./types";

export function FaqSectionList() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as FaqItem[];

  return (
    <div className="flex-1">
      <div className="flex flex-col">
        {items.map((item) => (
          <FaqSectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
