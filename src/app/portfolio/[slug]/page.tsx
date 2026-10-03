import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import ProductDemo from "../../components/ProductDemo";
import { getPortfolioProject, portfolioProjects } from "../projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    return { title: "Project not found · Kyle Morimoto" };
  }

  return {
    title: `${project.title} · Kyle Morimoto`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)] py-10 text-[var(--text-primary)]">
      <div className="mx-auto w-[90%] md:w-[85%]">
        <header className="mb-12 flex items-start justify-between gap-8">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              {project.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl crt-cursor">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
              {project.description}
            </p>
          </div>
          <Link
            href="/portfolio"
            aria-label="Back to projects"
            className="relative inline-flex shrink-0 items-center border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out before:pointer-events-none before:absolute before:-inset-2 before:content-[''] hover:translate-x-px hover:translate-y-px hover:bg-[var(--surface-secondary)] hover:shadow-[3px_3px_0px_var(--shadow-color)]"
          >
            ←<span className="hidden sm:inline"> Projects</span>
          </Link>
        </header>

        <main
          className={
            project.gameplay || project.sections?.length
              ? "grid max-w-4xl gap-10 sm:gap-12"
              : "grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]"
          }
        >
          <section className="border-2 border-[var(--border)] bg-[var(--surface-primary)] p-6 shadow-[6px_6px_0px_var(--shadow-color)] sm:p-8">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Product overview
            </h2>
            <div className="mt-6 grid gap-5 leading-relaxed text-[var(--text-muted)]">
              {project.overview.map((paragraph, index) => (
                <Fragment key={paragraph}>
                  <p className="max-w-[65ch]">{paragraph}</p>
                  {project.overviewImage?.afterParagraph === index + 1 && (
                    <figure className="mx-auto my-1 w-full max-w-xs">
                      <Image
                        src={project.overviewImage.src}
                        width={project.overviewImage.width}
                        height={project.overviewImage.height}
                        alt={project.overviewImage.alt}
                        sizes="(max-width: 400px) 75vw, 320px"
                        className="h-auto w-full"
                      />
                      <figcaption className="mt-3 text-center text-sm leading-relaxed text-[var(--text-muted)]">
                        {project.overviewImage.caption}
                      </figcaption>
                    </figure>
                  )}
                </Fragment>
              ))}
            </div>
          </section>

          {project.sections?.map((section) => (
            <section key={section.heading} className="min-w-0 px-6 sm:px-8">
              <h2 className="max-w-[30ch] font-display text-2xl font-bold leading-tight sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-6 grid max-w-[65ch] gap-5 leading-[1.8] text-[var(--text-muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.demo && (
                <ProductDemo {...section.demo} className="mt-8" />
              )}
              {section.image && (
                <figure className="mt-8">
                  <Image
                    src={section.image.src}
                    width={section.image.width}
                    height={section.image.height}
                    alt={section.image.alt}
                    sizes="(max-width: 768px) 90vw, 832px"
                    className="h-auto w-full"
                  />
                  <figcaption className="mt-3 max-w-[65ch] text-sm leading-relaxed text-[var(--text-muted)]">
                    {section.image.caption}
                  </figcaption>
                </figure>
              )}
            </section>
          ))}

          {project.gameplay && (
            <section aria-labelledby="gameplay-heading" className="px-6 sm:px-8">
              <h2
                id="gameplay-heading"
                className="max-w-[30ch] font-display text-2xl font-bold leading-tight sm:text-3xl"
              >
                {project.gameplay.heading}
              </h2>
              <div className="mt-6 grid max-w-[65ch] gap-5 leading-[1.8] text-[var(--text-muted)]">
                {project.gameplay.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.demo && <ProductDemo {...project.demo} />}

          <aside className="flex flex-col border-2 border-[var(--border)] bg-[var(--surface-secondary)] p-6 shadow-[6px_6px_0px_var(--shadow-color)] sm:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Built with
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((technology) => (
                <span
                  key={technology}
                  className="border-2 border-[var(--border)] bg-[var(--surface-primary)] px-2 py-1 text-sm font-medium"
                >
                  {technology}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center self-start border-2 border-[var(--border)] bg-[var(--surface-inverse)] px-3 py-2 font-semibold text-[var(--text-inverse)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:-translate-x-px hover:-translate-y-px hover:bg-[var(--surface-primary)] hover:text-[var(--text-primary)] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
              >
                {project.liveLabel} <span aria-hidden="true">↗</span>
              </Link>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
}
