import Link from "next/link";
import { site } from "@/data/site";
import { SocialIcon } from "@/components/icons/SocialIcon";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-header text-white">
      <div className="section-shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold">Let&apos;s build something great.</p>
          <p className="mt-1 text-sm text-white/75">
            Open to freelance and collaboration opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="text-sm font-semibold text-accent-bright underline underline-offset-4 transition hover:text-white"
          >
            {site.email}
          </a>
          {site.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="rounded-full border border-white/15 p-2 text-white transition hover:border-accent-bright hover:text-accent-bright"
            >
              <SocialIcon name={social.icon} />
            </a>
          ))}
          <Link
            href="/blog"
            className="text-sm font-semibold lowercase text-white/90 transition hover:text-accent-bright"
          >
            blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
