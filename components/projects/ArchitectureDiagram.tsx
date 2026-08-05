"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ArchitectureNode } from "@/data/site";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { cn } from "@/lib/utils";

type ArchitectureDiagramProps = {
  nodes: ArchitectureNode[];
  summary?: string;
};

export function ArchitectureDiagram({ nodes, summary }: ArchitectureDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(nodes[0]?.id ?? null);
  const reduced = useMotionSafe();
  const titleId = useId();
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];

  if (!nodes.length) return null;

  return (
    <div className="space-y-6">
      {summary ? (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Architecture
          </h3>
          <p className="mt-3 text-base leading-7 text-foreground">{summary}</p>
        </div>
      ) : null}

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
          Live system view
        </p>
        <h3 id={titleId} className="mt-2 text-lg font-bold tracking-tight text-ink">
          Request path
        </h3>
        <p className="mt-1 text-sm text-muted">
          Hover or focus a node to inspect purpose, responsibilities, and communication.
        </p>
      </div>

      <div
        className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-start"
        aria-labelledby={titleId}
      >
        <ol className="relative flex flex-col items-stretch gap-0">
          {nodes.map((node, index) => {
            const selected = active?.id === node.id;
            const isLast = index === nodes.length - 1;

            return (
              <li key={node.id} className="relative flex flex-col items-center">
                <button
                  type="button"
                  data-cursor="hover"
                  aria-pressed={selected}
                  onMouseEnter={() => setActiveId(node.id)}
                  onFocus={() => setActiveId(node.id)}
                  onClick={() => setActiveId(node.id)}
                  className={cn(
                    "relative z-10 w-full rounded-xl border px-4 py-3 text-left transition",
                    selected
                      ? "border-accent bg-accent text-ink shadow-[3px_3px_0_var(--shadow)]"
                      : "border-border bg-surface text-ink hover:border-accent/60 hover:bg-accent-soft/40",
                  )}
                >
                  {!reduced ? (
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-xl",
                        selected && "arch-node-pulse",
                      )}
                    />
                  ) : null}
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] opacity-70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold">{node.label}</span>
                </button>

                {!isLast ? (
                  <div
                    aria-hidden
                    className="relative my-1 flex h-10 w-px items-center justify-center"
                  >
                    <span className="absolute inset-y-0 w-px bg-border" />
                    <span className="absolute bottom-0 text-[10px] leading-none text-muted">↓</span>
                    {!reduced ? (
                      <motion.span
                        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                        animate={{ y: [0, 32], opacity: [0.2, 1, 0.2] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.35,
                        }}
                      />
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              role="region"
              aria-live="polite"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-accent-soft/25 p-5 md:p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                Component detail
              </p>
              <h4 className="mt-2 text-xl font-bold tracking-tight text-ink">{active.label}</h4>

              <dl className="mt-5 space-y-4">
                <Detail term="Purpose" description={active.purpose} />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Responsibilities
                  </dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5 text-sm leading-6 text-foreground">
                      {active.responsibilities.map((item) => (
                        <li key={item} className="border-l-2 border-accent pl-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Technologies
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {active.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
                <Detail term="Communication" description={active.communication} />
              </dl>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Detail({ term, description }: { term: string; description: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{term}</dt>
      <dd className="mt-2 text-sm leading-6 text-foreground">{description}</dd>
    </div>
  );
}
