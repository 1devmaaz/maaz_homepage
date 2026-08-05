"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/site";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "challenges", label: "Challenges" },
  { id: "lessons", label: "Lessons" },
  { id: "stack", label: "Tech Stack" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type CaseStudyTabsProps = {
  project: Project;
};

export function CaseStudyTabs({ project }: CaseStudyTabsProps) {
  const [tab, setTab] = useState<TabId>("overview");
  const reduced = useMotionSafe();
  const { caseStudy } = project;

  return (
    <section aria-labelledby="case-study-heading" className="mt-12">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
          Engineering story
        </p>
        <h2
          id="case-study-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl"
        >
          Mini case study
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="Case study sections"
        className="flex flex-wrap gap-2 border-b border-border pb-3"
      >
        {TABS.map((item) => {
          const selected = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-cursor="hover"
              aria-selected={selected}
              id={`case-tab-${item.id}`}
              aria-controls={`case-panel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
                selected
                  ? "bg-ink text-surface"
                  : "border border-border bg-surface text-muted hover:text-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-6 min-h-[12rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            role="tabpanel"
            id={`case-panel-${tab}`}
            aria-labelledby={`case-tab-${tab}`}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="sketch-card p-6 md:p-8"
          >
            {tab === "overview" ? (
              <div className="space-y-6">
                <Block title="Problem" body={caseStudy.problem} />
                <Block title="Result" body={caseStudy.result} />
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                    Highlights
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    {project.highlights.map((item) => (
                      <li key={item} className="border-b border-border/60 pb-2 last:border-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {tab === "architecture" ? (
              <div className="space-y-8">
                <ArchitectureDiagram
                  nodes={project.architecture}
                  summary={caseStudy.architecture}
                />
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                    Interesting decisions
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {caseStudy.decisions.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl border border-border bg-accent-soft/30 px-4 py-3 text-sm leading-6 text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {tab === "challenges" ? (
              <div className="space-y-6">
                <Block title="Challenge" body={caseStudy.challenge} />
                <Block title="Problem context" body={caseStudy.problem} />
              </div>
            ) : null}

            {tab === "lessons" ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  Lessons learned
                </h3>
                <ul className="mt-4 space-y-3">
                  {caseStudy.lessons.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-accent pl-4 text-sm leading-6 text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tab === "stack" ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  Tech stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-muted">{project.overview}</p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{title}</h3>
      <p className="mt-3 text-base leading-7 text-foreground">{body}</p>
    </div>
  );
}
