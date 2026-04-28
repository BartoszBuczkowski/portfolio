"use client";

import { useEffect, useRef, useState } from "react";
import { type Variants, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
};

const defaultItems: TimelineItem[] = [
  {
    id: "1",
    title: "Senior JavaScript Developer",
    company: "Company Name",
    period: "2022 – Present",
    description:
      "Lead frontend architecture, React/Next.js applications, and mentoring.",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Previous Company",
    period: "2019 – 2022",
    description:
      "Built responsive UIs, component libraries, and integrated REST APIs.",
  },
  {
    id: "3",
    title: "Junior Developer",
    company: "First Role",
    period: "2017 – 2019",
    description:
      "Started with vanilla JS and gradually adopted modern frameworks.",
  },
];

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

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function ExperienceTimeline({
  items = defaultItems,
  className,
}: {
  items?: TimelineItem[];
} & React.ComponentProps<"section">) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);

  const measureDotOffsets = () => {
    const list = listRef.current;
    if (!list) return;
    const offsets = itemRefs.current.map((item) =>
      item ? item.offsetTop + item.offsetHeight / 2 : 0
    );
    setDotOffsets(offsets);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const updateLine = () => {
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY;
      const vh = window.innerHeight * 0.5;
      const sectionTop = rect.top + scrollY - vh;
      const sectionBottom = rect.bottom + scrollY - vh;
      const total = Math.max(sectionBottom - sectionTop, 1);
      const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / total));
      setLineHeight(progress * list.offsetHeight);
    };
    const ro = new ResizeObserver(updateLine);
    ro.observe(list);
    const itemResizeObserver = new ResizeObserver(measureDotOffsets);
    itemRefs.current.forEach((item) => {
      if (item) itemResizeObserver.observe(item);
    });

    measureDotOffsets();
    updateLine();
    window.addEventListener("scroll", updateLine, { passive: true });
    window.addEventListener("resize", measureDotOffsets);
    return () => {
      window.removeEventListener("scroll", updateLine);
      window.removeEventListener("resize", measureDotOffsets);
      ro.disconnect();
      itemResizeObserver.disconnect();
    };
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={cn("relative py-24 px-4 md:px-6", className)}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 md:mb-20 text-center text-3xl font-semibold tracking-tight text-foreground">
          Experience
        </h2>

        <div className="relative">
          {/* Line – drawn by scroll / indicator */}
          <div
            className="absolute top-0 left-4 w-px bg-linear-to-b from-accent-violet/50 via-accent-blue/60 to-accent-pink/50 transition-[height] duration-150 ease-out md:left-1/2 md:-translate-x-1/2"
            style={{ height: Math.max(lineHeight, 0) }}
            aria-hidden
          />

          {/* End indicator – always at the current end of the line */}
          <div
            className="pointer-events-none absolute left-0 z-20 h-3 w-full"
            style={{ top: Math.max(lineHeight - 6, -6) }}
          >
            <div
              className="absolute left-4 h-3 w-3 shrink-0 rounded-full border-2 border-background shadow-[0_0_12px_var(--glow-violet)] md:left-1/2 md:-translate-x-1/2"
              style={{ backgroundColor: "var(--accent-violet)" }}
              aria-hidden
            />
          </div>

          <ul ref={listRef} className="relative -mt-3 flex flex-col gap-12 pl-12 md:pl-0 md:-mt-3">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItemRow
                  key={item.id}
                  setItemRef={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  item={item}
                  isLeft={isLeft}
                  isRevealed={lineHeight >= (dotOffsets[i] ?? Number.POSITIVE_INFINITY) - 2}
                  itemVariants={itemVariants}
                  dotVariants={dotVariants}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TimelineItemRow({
  setItemRef,
  item,
  isLeft,
  isRevealed,
  itemVariants,
  dotVariants,
}: {
  setItemRef: (el: HTMLLIElement | null) => void;
  item: TimelineItem;
  isLeft: boolean;
  isRevealed: boolean;
  itemVariants: Variants;
  dotVariants: Variants;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-60px 0px -80px 0px" });

  const handleItemRef = (el: HTMLLIElement | null) => {
    itemRef.current = el;
    setItemRef(el);
  };

  return (
    <motion.li
      ref={handleItemRef}
      className={cn(
        "relative flex min-h-[100px] items-center",
        "md:flex-row md:[&>.spacer]:block",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      custom={isLeft ? "left" : "right"}
    >
      {/* Content – responsive: always right on small, alternating on md+ */}
      <div
        className={cn(
          "w-full py-4 md:w-[calc(50%-32px)]",
          "text-left pl-0",
          "md:pl-0 md:pr-0",
          isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
        )}
      >
        <p
          className="mb-1 text-sm font-medium"
          style={{ color: "var(--accent-violet)" }}
        >
          {item.period}
        </p>
        <h3 className="text-lg font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="mb-2 text-sm text-muted-foreground">
          {item.company}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>

      {/* Dot – aligned to line (left on small, center on md+) */}
      <div
        className={cn(
          "absolute left-[-32px] top-1/2 z-10 -translate-y-1/2 md:left-1/2"
        )}
      >
        <motion.div
          className="h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background shadow-[0_0_12px_var(--glow-violet)]"
          style={{ backgroundColor: "var(--accent-violet)" }}
          variants={dotVariants}
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
        />
      </div>

      {/* Spacer for desktop alternating layout */}
      <div className="hidden w-[calc(50%-32px)] spacer" />
    </motion.li>
  );
}
