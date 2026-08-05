"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { site, type TimelineMilestone } from "@/data/site";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { cn } from "@/lib/utils";

const milestones = site.timeline.milestones;
const CHAPTER_COUNT = milestones.length;
/** Extra viewport-heights of scroll runway per chapter after the first. */
const VH_PER_CHAPTER = 0.95;

function StaticTimeline() {
  return (
    <section
      id="journey"
      aria-labelledby="timeline-heading"
      className="border-y border-border/60 bg-surface/30 py-16 md:py-24"
    >
      <div className="section-shell">
        <Header />
        <ol className="relative mt-12 space-y-8 border-l border-accent/40 pl-8">
          {milestones.map((milestone) => (
            <li key={milestone.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.15rem] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-accent"
              />
              <MilestoneBody milestone={milestone} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Header({ compact }: { compact?: boolean }) {
  return (
    <div className={cn("max-w-2xl", compact && "max-w-xl")}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        {site.timeline.eyebrow}
      </p>
      <h2
        id="timeline-heading"
        className={cn(
          "mt-2 font-bold tracking-tight text-ink",
          compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl",
        )}
      >
        {site.timeline.title}
      </h2>
      {!compact ? (
        <p className="mt-3 text-base leading-7 text-muted">
          {site.timeline.description}
        </p>
      ) : (
        <p className="mt-2 text-sm leading-6 text-muted">
          Scroll to move through each chapter of the journey.
        </p>
      )}
    </div>
  );
}

function MilestoneBody({
  milestone,
  className,
}: {
  milestone: TimelineMilestone;
  className?: string;
}) {
  return (
    <article className={cn("sketch-card p-6 md:p-8", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        {milestone.year}
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {milestone.title}
      </h3>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        {milestone.description}
      </p>
      <div className="mt-5 rounded-xl border border-border/80 bg-accent-soft/40 px-4 py-3 md:px-5 md:py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Lesson learned
        </p>
        <p className="mt-1.5 text-sm leading-6 text-ink md:text-base">
          {milestone.lesson}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {milestone.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function ChapterScene({
  milestone,
  index,
  progress,
  active,
}: {
  milestone: TimelineMilestone;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const isFirst = index === 0;
  const isLast = index === CHAPTER_COUNT - 1;
  const start = index / CHAPTER_COUNT;
  const end = (index + 1) / CHAPTER_COUNT;
  const holdStart = start + (end - start) * 0.14;
  const holdEnd = isLast ? 1 : start + (end - start) * 0.78;

  const opacity = useTransform(
    progress,
    isFirst
      ? [start, holdEnd, end]
      : isLast
        ? [start, holdStart, 1]
        : [start, holdStart, holdEnd, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    isFirst
      ? [start, holdEnd, end]
      : isLast
        ? [start, holdStart, 1]
        : [start, holdStart, holdEnd, end],
    isFirst ? [0, 0, -40] : isLast ? [48, 0, 0] : [48, 0, 0, -40],
  );

  const scale = useTransform(
    progress,
    isFirst
      ? [start, holdEnd, end]
      : isLast
        ? [start, holdStart, 1]
        : [start, holdStart, holdEnd, end],
    isFirst ? [1, 1, 0.97] : isLast ? [0.94, 1, 1] : [0.94, 1, 1, 0.97],
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{
        opacity,
        y,
        scale,
        pointerEvents: active ? "auto" : "none",
        zIndex: active ? 20 : 1,
      }}
    >
      <div className="w-full max-w-xl px-1">
        <MilestoneBody milestone={milestone} />
      </div>
    </motion.div>
  );
}

function ProgressRail({
  progress,
  activeIndex,
}: {
  progress: MotionValue<number>;
  activeIndex: number;
}) {
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="relative flex h-full min-h-[16rem] w-10 flex-col items-center md:w-12"
      aria-hidden
    >
      <div className="absolute inset-y-3 w-px bg-border" />
      <motion.div
        className="absolute top-3 w-px origin-top bg-accent"
        style={{
          height: fill,
          boxShadow: "0 0 16px color-mix(in srgb, var(--accent) 45%, transparent)",
        }}
      />
      <ol className="relative z-10 flex h-full flex-col justify-between py-1">
        {milestones.map((milestone, index) => {
          const state =
            index < activeIndex
              ? "done"
              : index === activeIndex
                ? "current"
                : "future";

          return (
            <li key={milestone.id} className="flex justify-center">
              <motion.span
                className={cn(
                  "block rounded-full border-2",
                  state === "future" ? "border-border bg-surface" : "border-accent bg-accent",
                )}
                animate={
                  state === "current"
                    ? {
                        scale: 1.28,
                        opacity: 1,
                        boxShadow:
                          "0 0 0 6px color-mix(in srgb, var(--accent) 22%, transparent)",
                      }
                    : state === "done"
                      ? {
                          scale: 1,
                          opacity: 1,
                          boxShadow:
                            "0 0 12px color-mix(in srgb, var(--accent) 40%, transparent)",
                        }
                      : {
                          scale: 0.82,
                          opacity: 0.4,
                          boxShadow: "0 0 0 0 transparent",
                        }
                }
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                style={{ width: 14, height: 14 }}
                title={milestone.year}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function YearBadge({ activeIndex }: { activeIndex: number }) {
  const milestone = milestones[activeIndex] ?? milestones[0];

  return (
    <div className="font-mono">
      <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Chapter year</p>
      <motion.p
        key={milestone.year + milestone.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="mt-1 text-4xl font-bold tracking-tight text-accent md:text-5xl"
      >
        {milestone.year}
      </motion.p>
      <p className="mt-2 text-xs text-muted">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(CHAPTER_COUNT).padStart(2, "0")}
      </p>
    </div>
  );
}

export function Timeline() {
  const reduced = useMotionSafe();
  if (reduced) return <StaticTimeline />;
  return <ScrollNarrativeTimeline />;
}

function ScrollNarrativeTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 64,
    damping: 22,
    mass: 0.35,
    restDelta: 0.0005,
  });

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(
      CHAPTER_COUNT - 1,
      Math.max(0, Math.floor(value * CHAPTER_COUNT)),
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const trackHeight = useMemo(
    () => `calc(100svh + ${(CHAPTER_COUNT - 1) * VH_PER_CHAPTER} * 100svh)`,
    [],
  );

  const ambient = useTransform(
    progress,
    [0, 0.5, 1],
    [
      "color-mix(in srgb, var(--accent-soft) 35%, transparent)",
      "color-mix(in srgb, var(--accent-soft) 55%, transparent)",
      "color-mix(in srgb, var(--accent) 18%, transparent)",
    ],
  );

  return (
    <section
      id="journey"
      aria-labelledby="timeline-heading"
      className="relative border-y border-border/60 bg-surface/20"
    >
      <div ref={trackRef} className="relative" style={{ height: trackHeight }}>
        <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full blur-3xl"
            style={{ background: ambient }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full blur-3xl"
            style={{ background: ambient, opacity: 0.7 }}
          />

          <div className="section-shell relative flex h-full flex-col py-6 md:py-8">
            <Header compact />

            <div className="mt-6 grid min-h-0 flex-1 grid-cols-[auto_minmax(0,1fr)] gap-4 md:mt-8 md:grid-cols-[7rem_auto_minmax(0,1fr)] md:gap-8 lg:gap-12">
              <div className="hidden md:flex md:flex-col md:justify-center">
                <YearBadge activeIndex={activeIndex} />
              </div>

              <ProgressRail progress={progress} activeIndex={activeIndex} />

              <div className="relative min-h-0">
                <div className="absolute left-0 top-0 z-30 md:hidden">
                  <YearBadge activeIndex={activeIndex} />
                </div>

                <div className="relative h-full pt-16 md:pt-0">
                  {milestones.map((milestone, index) => (
                    <ChapterScene
                      key={milestone.id}
                      milestone={milestone}
                      index={index}
                      progress={progress}
                      active={index === activeIndex}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted/80 md:mt-2">
              Scroll to continue the story
            </p>
          </div>
        </div>
      </div>

      <ol className="sr-only">
        {milestones.map((milestone) => (
          <li key={milestone.id}>
            {milestone.year}: {milestone.title}. {milestone.description} Lesson:{" "}
            {milestone.lesson}
          </li>
        ))}
      </ol>
    </section>
  );
}
