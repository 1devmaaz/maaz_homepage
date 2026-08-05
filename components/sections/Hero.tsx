"use client";

import { motion } from "framer-motion";
import { HeroPillarCard } from "@/components/hero/HeroPillarCard";
import { HeroPortraitStage } from "@/components/hero/HeroPortraitStage";
import { Button } from "@/components/ui/Button";
import { Spotlight } from "@/components/motion/Spotlight";
import { Reveal, Stagger, staggerItem } from "@/components/motion/Reveal";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { site } from "@/data/site";

const pillars = site.hero.pillars.map((pillar) => {
  if (pillar.label === "Learn") {
    return {
      ...pillar,
      src: "/hero/learn.svg",
      srcDark: "/hero/sketch_learn_dark_not_hovered.png",
      colorSrc: "/hero/color_learn.png",
      colorSrcDark: "/hero/colorful_learn_dark.png",
      width: 96,
      height: 94,
    };
  }
  if (pillar.label === "Innovate") {
    return {
      ...pillar,
      src: "/hero/innovate.svg",
      srcDark: "/hero/sketch_innovate_dark_not_hovered.png",
      colorSrc: "/hero/color_innovate.svg",
      width: 53,
      height: 101,
    };
  }
  return {
    ...pillar,
    src: "/hero/build.svg",
    srcDark: "/hero/sketch_build_dark_not_hovered.png",
    colorSrc: "/hero/color_build.png",
    width: 85,
    height: 79,
  };
});

const particles = [
  { left: "12%", top: "62%", size: 4, duration: 9, delay: 0 },
  { left: "28%", top: "78%", size: 3, duration: 11, delay: 1.2 },
  { left: "68%", top: "70%", size: 5, duration: 10, delay: 0.6 },
  { left: "84%", top: "55%", size: 3, duration: 12, delay: 2 },
  { left: "52%", top: "88%", size: 4, duration: 9.5, delay: 1.5 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useMotionSafe();

  return (
    <section
      id="home"
      className="hero-section relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        {!reduced
          ? particles.map((p) => (
              <span
                key={`${p.left}-${p.top}`}
                className="hero-particle"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))
          : null}
      </div>

      <Spotlight className="relative z-10" size={480}>
        <div className="section-shell">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-12">
            <div className="max-w-xl">
              <motion.p
                className="text-base text-muted md:text-lg"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease }}
              >
                Hello! I&apos;m{" "}
                <span className="font-semibold text-accent">{site.name}</span>
              </motion.p>

              <motion.h1
                className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl xl:text-[3.5rem] xl:leading-[1.08]"
                initial={reduced ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease }}
              >
                Developer crafting clean digital products
              </motion.h1>

              <motion.p
                className="mt-5 max-w-md text-base leading-7 text-muted md:text-[1.05rem] md:leading-8"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease }}
              >
                {site.hero.intro}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28, ease }}
              >
                <Button href={`mailto:${site.email}`} variant="secondary">
                  Discuss a project →
                </Button>
                <Button href="#portfolio" variant="primary">
                  View my work
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <HeroPortraitStage />
            </motion.div>
          </div>

          <div className="mt-16 md:mt-24">
            <Reveal className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  How I work
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {site.hero.pillars.map((pillar) => pillar.label).join(". ")}.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
                Three principles behind every project — hover each card to see it come alive.
              </p>
            </Reveal>

            <Stagger className="grid gap-4 md:grid-cols-3" stagger={0.1}>
              {pillars.map((pillar) => (
                <motion.div key={pillar.label} variants={staggerItem} className="h-full">
                  <HeroPillarCard {...pillar} />
                </motion.div>
              ))}
            </Stagger>
          </div>

          <a
            href="#portfolio"
            data-cursor="hover"
            className="hero-scroll-cue mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-muted transition hover:text-ink"
            aria-label="Scroll to projects"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]">Scroll</span>
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-border pt-1.5">
              <span className="h-1.5 w-1 rounded-full bg-accent" />
            </span>
          </a>
        </div>
      </Spotlight>
    </section>
  );
}
