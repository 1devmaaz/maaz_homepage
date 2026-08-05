"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type Metric } from "@/data/site";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { cn } from "@/lib/utils";

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const [open, setOpen] = useState(false);
  const reduced = useMotionSafe();
  const descriptionId = useId();

  return (
    <Reveal delay={index * 60} className="h-full">
      <button
        type="button"
        data-cursor="hover"
        aria-expanded={open}
        aria-describedby={open ? descriptionId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group sketch-card relative flex h-full w-full flex-col items-start p-5 text-left transition duration-300 md:p-6",
          "hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--shadow)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          {metric.label}
        </p>
        <p className="mt-3 flex items-baseline gap-0.5 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          {metric.prefix ? <span className="text-accent">{metric.prefix}</span> : null}
          <CountUp value={metric.value} />
          {metric.suffix ? (
            <span className="text-2xl font-semibold text-accent md:text-3xl">
              {metric.suffix}
            </span>
          ) : null}
        </p>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.p
              id={descriptionId}
              key="desc"
              initial={reduced ? false : { opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={reduced ? undefined : { opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden text-sm leading-6 text-muted"
            >
              {metric.description}
            </motion.p>
          ) : (
            <span className="mt-3 text-xs text-muted/70 transition group-hover:text-muted">
              Hover for context
            </span>
          )}
        </AnimatePresence>
      </button>
    </Reveal>
  );
}

export function Metrics() {
  return (
    <section
      id="metrics"
      aria-labelledby="metrics-heading"
      className="border-y border-border/70 bg-surface/40 py-14 md:py-20"
    >
      <div className="section-shell">
        <Reveal className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            By the numbers
          </p>
          <h2
            id="metrics-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            Evidence of the craft
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            A quick pulse on how I ship, learn, and stay curious — hover any metric for the
            story behind it.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
