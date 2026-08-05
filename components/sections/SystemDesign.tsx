"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type SystemDesignNode } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { cn } from "@/lib/utils";

export function SystemDesign() {
  const nodes = site.systemDesign.nodes;
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "client");
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];
  const reduced = useMotionSafe();
  const titleId = useId();
  const bottleneckCount = nodes.filter((n) => n.bottleneck).length;

  return (
    <section
      id="system-design"
      aria-labelledby={titleId}
      className="py-16 md:py-24"
    >
      <div className="section-shell">
        <Reveal className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {site.systemDesign.eyebrow}
          </p>
          <h2
            id={titleId}
            className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            {site.systemDesign.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {site.systemDesign.description}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="sketch-card overflow-hidden">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border bg-accent-soft/35 px-5 py-4 md:px-8 md:py-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  Case system
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight text-ink">
                  {site.systemDesign.product}
                </p>
                <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
                  {site.systemDesign.productNote}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-muted">
                  {nodes.length} nodes
                </span>
                <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-ink">
                  {bottleneckCount} bottleneck callouts
                </span>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
              <div className="relative border-b border-border p-5 md:p-8 lg:border-b-0 lg:border-r">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Request path — hover or click a node
                </p>

                {/* Desktop horizontal whiteboard */}
                <ol className="hidden md:flex md:flex-wrap md:items-center md:gap-x-1 md:gap-y-3">
                  {nodes.map((node, index) => (
                    <li key={node.id} className="flex items-center gap-1">
                      <NodeChip
                        node={node}
                        index={index}
                        active={node.id === activeId}
                        onSelect={() => setActiveId(node.id)}
                      />
                      {index < nodes.length - 1 ? (
                        <Connector reduced={reduced} delay={index * 0.28} horizontal />
                      ) : null}
                    </li>
                  ))}
                </ol>

                {/* Mobile vertical */}
                <ol className="flex flex-col items-stretch md:hidden">
                  {nodes.map((node, index) => (
                    <li key={node.id} className="flex flex-col items-center">
                      <NodeChip
                        node={node}
                        index={index}
                        active={node.id === activeId}
                        onSelect={() => setActiveId(node.id)}
                        fullWidth
                      />
                      {index < nodes.length - 1 ? (
                        <Connector reduced={reduced} delay={index * 0.28} />
                      ) : null}
                    </li>
                  ))}
                </ol>

                {!reduced ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 bottom-4 top-14 hidden overflow-hidden opacity-[0.07] lg:block"
                  >
                    <div className="whiteboard-grid h-full w-full" />
                  </div>
                ) : null}
              </div>

              <AnimatePresence mode="wait">
                {active ? (
                  <DetailPanel key={active.id} node={active} reduced={reduced} />
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NodeChip({
  node,
  index,
  active,
  onSelect,
  fullWidth,
}: {
  node: SystemDesignNode;
  index: number;
  active: boolean;
  onSelect: () => void;
  fullWidth?: boolean;
}) {
  const hasBottleneck = Boolean(node.bottleneck);

  return (
    <button
      type="button"
      data-cursor="hover"
      aria-pressed={active}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={cn(
        "relative z-10 rounded-xl border px-3.5 py-2.5 text-left transition",
        fullWidth ? "w-full" : "min-w-[7.5rem]",
        active
          ? "border-accent bg-accent text-ink shadow-[3px_3px_0_var(--shadow)]"
          : hasBottleneck
            ? "border-accent/50 bg-accent-soft/50 text-ink hover:border-accent"
            : "border-border bg-surface text-ink hover:border-accent/60 hover:bg-accent-soft/40",
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] opacity-70">
          {String(index + 1).padStart(2, "0")}
        </span>
        {hasBottleneck ? (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
              active ? "bg-ink/10 text-ink" : "bg-accent/25 text-ink",
            )}
          >
            risk
          </span>
        ) : null}
      </span>
      <span className="mt-0.5 block text-sm font-semibold leading-tight">{node.label}</span>
    </button>
  );
}

function Connector({
  reduced,
  delay,
  horizontal,
}: {
  reduced: boolean;
  delay: number;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <span aria-hidden className="relative mx-0.5 flex h-5 w-8 items-center">
        <span className="h-px w-full bg-border" />
        <span className="absolute right-0 text-[10px] text-muted">→</span>
        {!reduced ? (
          <motion.span
            className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
            animate={{ x: [0, 26], opacity: [0.15, 1, 0.15] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        ) : null}
      </span>
    );
  }

  return (
    <span aria-hidden className="relative my-1 flex h-9 w-px items-center justify-center">
      <span className="absolute inset-y-0 w-px bg-border" />
      <span className="absolute bottom-0 text-[10px] text-muted">↓</span>
      {!reduced ? (
        <motion.span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
          animate={{ y: [0, 28], opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      ) : null}
    </span>
  );
}

function DetailPanel({
  node,
  reduced,
}: {
  node: SystemDesignNode;
  reduced: boolean;
}) {
  return (
    <motion.aside
      role="region"
      aria-label={`${node.label} details`}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="bg-surface p-5 md:p-6"
    >
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
        Node detail
      </p>
      <h3 className="mt-2 text-xl font-bold tracking-tight text-ink">{node.label}</h3>

      <dl className="mt-5 space-y-4">
        <Field term="Purpose" body={node.purpose} />
        <Field term="Why it exists" body={node.why} />
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Technologies
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {node.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-accent-soft/40 px-2.5 py-1 text-xs font-medium text-ink"
              >
                {tech}
              </span>
            ))}
          </dd>
        </div>
        <div className="rounded-xl border border-border bg-accent-soft/30 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Scaling decision
          </dt>
          <dd className="mt-2 text-sm leading-6 text-ink">{node.scaling}</dd>
        </div>
        {node.bottleneck ? (
          <div className="rounded-xl border border-accent/45 bg-accent/10 px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              Bottleneck / risk
            </dt>
            <dd className="mt-2 text-sm leading-6 text-foreground">{node.bottleneck}</dd>
          </div>
        ) : null}
      </dl>
    </motion.aside>
  );
}

function Field({ term, body }: { term: string; body: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{term}</dt>
      <dd className="mt-2 text-sm leading-6 text-foreground">{body}</dd>
    </div>
  );
}
