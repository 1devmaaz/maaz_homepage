import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CaseStudyTabs } from "@/components/projects/CaseStudyTabs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCreativeWork } from "@/lib/jsonld";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { site } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isExternal = Boolean(project.href?.startsWith("http"));

  return (
    <article className="py-16 md:py-24">
      <JsonLd data={buildCreativeWork(project)} />
      <div className="section-shell max-w-4xl">
        <Link
          href="/#portfolio"
          className="text-sm font-semibold underline underline-offset-4 transition hover:text-accent"
        >
          Back to portfolio
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            {project.role ? <span>{project.role}</span> : null}
            {project.role && project.year ? <span aria-hidden="true">·</span> : null}
            {project.year ? <span>{project.year}</span> : null}
            <span aria-hidden="true">·</span>
            <span className="font-medium text-accent">Case study</span>
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {isExternal && project.href ? (
              <Button href={project.href} variant="primary" target="_blank" rel="noreferrer">
                View project →
              </Button>
            ) : null}
            <Button href={`mailto:${site.email}`} variant="secondary">
              Discuss this project
            </Button>
          </div>
        </header>

        {project.image ? (
          <div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-2xl border border-border bg-surface shadow-[4px_4px_0_var(--shadow)]">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          <div className="mt-10 aspect-[2/1] rounded-2xl border border-border bg-gradient-to-br from-accent-soft via-surface to-border" />
        )}

        <CaseStudyTabs project={project} />

        <div className="mt-10 yellow-card p-6 md:p-8">
          <h2 className="text-lg font-bold text-ink">Quick snapshot</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{project.caseStudy.problem}</p>
          <p className="mt-4 text-sm font-semibold text-ink">→ {project.caseStudy.result}</p>
        </div>
      </div>
    </article>
  );
}
