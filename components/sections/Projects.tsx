"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof site.projects)[number];
  index: number;
}) {
  const reduced = useMotionSafe();
  const cardRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--accent) 28%, transparent), transparent 55%)`;

  function onMove(event: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <Reveal delay={index * 90} className="h-full">
      <TiltCard className="h-full">
        <article
          ref={cardRef}
          data-cursor="hover"
          onMouseMove={onMove}
          className={cn(
            "group sketch-card relative flex h-full flex-col overflow-hidden p-6 transition-[box-shadow] duration-300",
            "hover:shadow-[6px_6px_0_var(--shadow)]",
          )}
        >
          {!reduced ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: glow }}
            />
          ) : null}

          <div className="relative z-10 mb-6 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent-soft via-surface to-border">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition duration-500 ease-out group-hover:scale-105"
              />
            ) : null}
          </div>
          <h3 className="relative z-10 text-xl font-bold">{project.title}</h3>
          <p className="relative z-10 mt-3 flex-1 text-sm leading-6 text-muted">
            {project.description}
          </p>
          <div className="relative z-10 mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.22}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-semibold underline underline-offset-4 transition hover:text-accent"
                  >
                    Case study
                  </Link>
            </Magnetic>
            {project.href?.startsWith("http") ? (
              <Magnetic strength={0.22}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-muted underline underline-offset-4 transition hover:text-ink"
                >
                  View project
                </a>
              </Magnetic>
            ) : (
              <span className="text-sm font-medium text-muted/70">
                View project — coming soon
              </span>
            )}
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="section-shell">
        <div className="grid gap-6 md:grid-cols-3">
          {site.projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
