"use client";

import { useExperienceTimelineScroll } from "@/components/experience-timeline/experience-timeline-scroll-context";
import { ExperienceTimelineScrollProvider } from "@/components/experience-timeline/experience-timeline-scroll-provider";
import type { TimelineItem } from "@/components/experience-timeline/types";
import { cn } from "@/lib/utils";
import { getExperience } from "@/static/experience";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimelineItemRow } from "./timeline-item-row";

const itemVariants: Variants = {
  hidden: (side: "left" | "right") => ({
    x: side === "left" ? -24 : 24,
  }),
  visible: () => ({
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function ExperienceTimelineSection({
  className,
  title,
  experience,
}: {
  className?: string;
  title: string;
  experience: TimelineItem[];
}) {
  const { sectionRef, listRef, lineHeight, indicatorTop } = useExperienceTimelineScroll();

  return (
    <section ref={sectionRef} id="experience" className={cn("relative py-24 px-4 md:px-6", className)}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 md:mb-20 text-center text-3xl font-semibold tracking-tight text-foreground">{title}</h2>

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
            {experience.map((item, i) => (
              <TimelineItemRow key={`${item.companyName}-${item.yearFrom}`} index={i} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ExperienceTimeline({ className }: React.ComponentProps<"section">) {
  const t = useTranslations("Experience");
  const experience = getExperience(t);
  const presentLabel = t("timeline.present");

  return (
    <ExperienceTimelineScrollProvider presentLabel={presentLabel} itemVariants={itemVariants}>
      <ExperienceTimelineSection className={className} title={t("title")} experience={experience} />
    </ExperienceTimelineScrollProvider>
  );
}
