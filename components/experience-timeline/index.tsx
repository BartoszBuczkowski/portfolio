"use client";

import { useExperienceTimelineMeasurements } from "@/components/experience-timeline/hooks/use-experience-timeline-measurements";
import { cn } from "@/lib/utils";
import { getExperience } from "@/static/experience";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimelineItemRow } from "./timeline-item-row";

const itemVariants: Variants = {
  hidden: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -24 : 24,
  }),
  visible: () => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function ExperienceTimeline({ className }: React.ComponentProps<"section">) {
  const { sectionRef, listRef, dotOffsets, lineHeight, indicatorTop, setItemRef } = useExperienceTimelineMeasurements();

  const t = useTranslations("Experience");
  const experience = getExperience(t);

  return (
    <section ref={sectionRef} id="experience" className={cn("relative py-24 px-4 md:px-6", className)}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 md:mb-20 text-center text-3xl font-semibold tracking-tight text-foreground">{t("title")}</h2>

        <div className="relative">
          <motion.div
            className="absolute top-0 left-4 w-px bg-linear-to-b from-foreground/20 via-foreground/50 to-foreground/20 transition-[height] duration-150 ease-out md:left-1/2 md:-translate-x-1/2"
            style={{ height: lineHeight }}
            aria-hidden
          />

          <motion.div className="pointer-events-none absolute left-0 z-20 h-3 w-full" style={{ top: indicatorTop }}>
            <div
              className="absolute left-4 h-3 w-3 shrink-0 -translate-x-1/2 rounded-full border-2 border-background bg-foreground md:left-1/2"
              aria-hidden
            />
          </motion.div>

          <ul ref={listRef} className="relative -mt-3 flex flex-col gap-12 pl-12 md:pl-0 md:-mt-3">
            {experience.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItemRow
                  key={`${item.companyName}-${item.yearFrom}`}
                  setItemRef={(el) => setItemRef(i, el)}
                  item={item}
                  isLeft={isLeft}
                  lineHeight={lineHeight}
                  dotOffset={dotOffsets[i] ?? 0}
                  itemVariants={itemVariants}
                  presentLabel={t("timeline.present")}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
