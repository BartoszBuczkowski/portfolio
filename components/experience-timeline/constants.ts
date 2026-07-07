import type { Variants } from "framer-motion";

export const itemVariants: Variants = {
  hidden: (side: "left" | "right") => ({
    x: side === "left" ? -24 : 24,
  }),
  visible: () => ({
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const timelineRowClassName =
  "group/timeline-row relative flex min-h-[100px] flex-col items-stretch md:flex-row md:items-center md:[&>.spacer]:block";

export const timelineItemDetailsClassName =
  "w-full py-4 md:w-[calc(50%-32px)] text-left pl-0 md:pl-0 md:pr-8 md:text-right";

export const caseStudiesClassName =
  "spacer flex w-full shrink-0 flex-col pt-2 pb-4 md:w-[calc(50%-32px)] md:items-start md:justify-start md:py-4 md:pt-0 md:pl-8";

export const timelineCaseStudiesClassName =
  "my-4 -mb-16 space-y-8 transition-all duration-300 cursor-pointer ml-6 mr-2 md:ml-14";

export const timelineCaseStudiesHeadingClassName =
  "mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground";

export const logoSlotClassName = "relative h-24 w-[min(100%,12rem)]";
