"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type ThinkingStage } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { cn } from "@/lib/utils";

function StageButton({
  stage,
  index,
  active,
  onSelect,
}: {
  stage: ThinkingStage;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li className="flex items-center gap-2 md:flex-col md:gap-3">
      {index > 0 ? (
        <span
          aria-hidden
          className="hidden h-px w-4 bg-border md:block md:h-6 md:w-px"
        />
      ) : null}
      {index > 0 ? (
        <span aria-hidden className="text-muted md:hidden">
          →
        </span>
      ) : null}
      <button
        type="button"
        data-cursor="hover"
        aria-pressed={active}
        onClick={onSelect}
        className={cn(
          "relative rounded-full border px-3.5 py-2 text-left text-sm font-semibold transition md:px-4",
          active
            ? "border-accent bg-accent text-ink shadow-[3px_3px_0_var(--shadow)]"
            : "border-border bg-surface text-ink hover:border-accent/60 hover:bg-accent-soft/50",
        )}
      >
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] opacity-70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-0.5 block">{stage.label}</span>
      </button>
    </li>
  );
}

function DetailPanel({ stage }: { stage: ThinkingStage }) {
  const reduced = useMotionSafe();
  const headingId = useId();

  return (
    <motion.article
      key={stage.id}
      role="region"
      aria-labelledby={headingId}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sketch-card mt-8 overflow-hidden"
    >
      <div className="border-b border-border bg-accent-soft/35 px-6 py-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
          Stage detail
        </p>
        <h3 id={headingId} className="mt-2 text-2xl font-bold tracking-tight text-ink">
          {stage.label}
        </h3>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-border p-6 md:border-b-0 md:border-r md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            What I focus on
          </p>
          <p className="mt-3 text-sm leading-7 text-foreground">{stage.focus}</p>
        </div>
        <div className="border-b border-border p-6 md:border-b-0 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Tools I use
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stage.tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-b border-border p-6 md:border-b-0 md:border-r md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Real example
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">{stage.example}</p>
        </div>
        <div className="bg-ink/[0.03] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Mistakes I avoid
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">{stage.avoid}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function HowIThink() {
  const stages = site.howIThink.stages;
  const [activeId, setActiveId] = useState(stages[0]?.id ?? "problem");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <section
      id="how-i-think"
      aria-labelledby="how-i-think-heading"
      className="py-16 md:py-24"
    >
      <div className="section-shell">
        <Reveal className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {site.howIThink.eyebrow}
          </p>
          <h2
            id="how-i-think-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            {site.howIThink.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {site.howIThink.description}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ol className="flex flex-wrap items-center gap-2 md:justify-between md:gap-1">
            {stages.map((stage, index) => (
              <StageButton
                key={stage.id}
                stage={stage}
                index={index}
                active={stage.id === activeId}
                onSelect={() => setActiveId(stage.id)}
              />
            ))}
          </ol>
        </Reveal>

        <AnimatePresence mode="wait">
          {active ? <DetailPanel key={active.id} stage={active} /> : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
