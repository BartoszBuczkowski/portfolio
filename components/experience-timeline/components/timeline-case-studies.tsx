"use client";

import { useTranslations } from "next-intl";
import type { CaseStudy } from "../types";

type TimelineCaseStudiesProps = {
  caseStudies: CaseStudy[];
  className?: string;
};

export function TimelineCaseStudies({ caseStudies }: TimelineCaseStudiesProps) {
  const t = useTranslations("Experience");

  return (
    <div className="my-4 mx-14">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("caseStudiesHeading")}</p>
      <ul className="flex flex-col gap-4">
        {caseStudies.map((cs, i) => (
          <li key={`${cs.productName}-${i}`}>
            <p className="text-sm font-medium text-foreground">{cs.productName}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/80">{t("caseStudy.problem")}: </span>
              {cs.problem}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/80">{t("caseStudy.contribution")}: </span>
              {cs.contribution}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
