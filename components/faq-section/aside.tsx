"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function FaqSectionAside() {
  const t = useTranslations("FAQ");

  return (
    <div className="relative flex-1 h-152">
      <Image
        src="/profile/bartosz.jpg"
        alt={t("imageAlt")}
        width={1200}
        height={1794}
        className="md:absolute rounded-sm w-full h-full object-cover object-bottom iv"
      />

      <div className="absolute bottom-0 flex flex-col gap-4 p-10">
        <h2 className="text-5xl font-extrabold text-white">{t("title")}</h2>
        <p className="max-w-xl text-base text-muted dark:text-gray-300">{t("subtitle")}</p>
      </div>
    </div>
  );
}
