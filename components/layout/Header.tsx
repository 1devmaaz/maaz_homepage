"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { site } from "@/data/site";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";
import { useMotionSafe } from "@/components/motion/useMotionSafe";

const SECTION_IDS = [
  "home",
  "portfolio",
  "services",
  "approach",
  "about",
  "contact",
] as const;

function sectionFromHref(href: string) {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  return null;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const headerH = header ? header.getBoundingClientRect().height : 64;
  const top = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");
  const [logoSpin, setLogoSpin] = useState(0);
  const reduced = useMotionSafe();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    lastY.current = latest;
    if (latest < 48) {
      setHidden(false);
      return;
    }
    setHidden(latest > previous && latest > 80);
  });

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/8 bg-header/95 text-white backdrop-blur-md"
      animate={reduced ? undefined : { y: hidden && !open ? -110 : 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <motion.div
          animate={{ rotate: logoSpin }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
        >
          <Link
            href="/"
            aria-label={`${site.name} home`}
            data-cursor="hover"
            onClick={() => setLogoSpin((v) => v + 360)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-sm font-bold text-header"
          >
            M
          </Link>
        </motion.div>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
          {site.nav.map((item) => {
            const section = sectionFromHref(item.href);
            const isActive =
              section === active || (item.href === "/blog" && active === "blog");
            const className = cn(
              "relative text-sm lowercase tracking-wide transition",
              isActive ? "text-white" : "text-white/90 hover:text-white",
            );

            const underline = isActive ? (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-px bg-accent-bright"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null;

            if (item.href.includes("#")) {
              const id = sectionFromHref(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                  className={className}
                  onClick={(e) => {
                    if (isHome && id) {
                      e.preventDefault();
                      scrollToSection(id);
                    }
                  }}
                >
                  {item.label}
                  {underline}
                </a>
              );
            }

            return (
              <Link key={item.href} href={item.href} data-cursor="hover" className={className}>
                {item.label}
                {underline}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="hidden rounded-full border border-accent-bright/60 px-3 py-1.5 text-xs font-semibold text-accent-bright transition hover:bg-accent-bright hover:text-header lg:inline-flex"
          >
            Resume
          </a>
          <ThemeToggle />
          <div className="hidden items-center gap-3 md:flex">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-accent-bright hover:bg-white/8 hover:text-accent-bright"
              >
                <SocialIcon name={social.icon} className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>

          <button
            type="button"
            data-cursor="hover"
            className="rounded-full border border-white/20 px-3 py-2 text-sm font-medium md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="overflow-hidden border-t border-white/10 bg-header md:hidden"
          >
            <nav aria-label="Mobile" className="section-shell flex flex-col gap-4 py-4">
              {site.nav.map((item) =>
                item.href.includes("#") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm lowercase tracking-wide text-white/90"
                    onClick={(e) => {
                      const id = sectionFromHref(item.href);
                      if (isHome && id) {
                        e.preventDefault();
                        scrollToSection(id);
                      }
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm lowercase tracking-wide text-white/90"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-accent-bright"
                onClick={() => setOpen(false)}
              >
                Resume ↗
              </a>
              <div className="flex items-center gap-3 pt-2">
                {site.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-accent-bright hover:bg-white/8 hover:text-accent-bright"
                  >
                    <SocialIcon name={social.icon} className="h-[17px] w-[17px]" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
