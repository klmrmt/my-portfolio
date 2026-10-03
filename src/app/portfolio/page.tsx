import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import { portfolioProjects } from "./projects";

export const metadata: Metadata = {
  title: "Kyle’s project board · Kyle Morimoto",
  description: "Games, tools, and experiments I've designed and built.",
};

export default function Portfolio() {
  const projectCount = portfolioProjects.length;
  const countLabel = `${String(projectCount).padStart(2, "0")} projects`;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-[77rem] px-5 sm:px-10 lg:px-14">
        <header className="flex min-h-[5.5rem] items-center justify-between gap-5 border-b-2 border-[var(--border)] sm:min-h-28">
          <Link
            href="/"
            aria-label="Kyle Morimoto — home"
            className="inline-flex min-h-11 items-center font-display text-[1.8125rem] font-extrabold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Kyle M<span className="text-[var(--accent)]" aria-hidden="true">_</span>
          </Link>
          <p className="font-mono text-right text-[0.5625rem] leading-relaxed text-[var(--text-muted)] sm:text-[0.6875rem]">
            Software engineer
            <br />
            Personal projects &amp; experiments
          </p>
        </header>

        <main className="pt-10 pb-12 sm:pt-16 sm:pb-20">
          <div className="mb-8 grid items-end gap-5 sm:mb-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
            <div>
              <p className="mb-4 font-mono text-[0.625rem] leading-relaxed uppercase tracking-[0.12em] text-[var(--accent)] sm:text-[0.6875rem]">
                A small catalogue of things I&apos;ve made
              </p>
              <h1 className="crt-cursor mb-5 font-display text-[clamp(2.25rem,4.8vw,3.875rem)] font-extrabold leading-[1.08] tracking-[-0.045em] [overflow-wrap:anywhere]">
                Kyle&apos;s project board.
              </h1>
              <p className="max-w-[65ch] text-sm leading-relaxed text-[var(--text-muted)] sm:text-[0.9375rem]">
                Games, tools, and experiments I&apos;ve designed and built.
              </p>
            </div>
            <p className="pb-1 font-mono text-[0.6875rem] whitespace-nowrap text-[var(--text-muted)]">
              <span className="mr-2 text-[var(--accent)]">
                {String(projectCount).padStart(2, "0")}
              </span>
              projects
            </p>
          </div>

          <section aria-labelledby="project-index-heading">
            <div className="flex flex-wrap justify-between gap-3 border-t border-t-[var(--border)] border-b border-b-[color-mix(in_srgb,var(--border)_25%,var(--background))] py-4 font-mono text-[0.625rem] uppercase tracking-[0.1em]">
              <h2 id="project-index-heading">The project index</h2>
              <span className="text-[var(--text-muted)]" aria-hidden="true">
                No. 001–{String(projectCount).padStart(3, "0")}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  index={index}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  category={project.eyebrow.split(" · ")[0]}
                />
              ))}
            </div>
          </section>
        </main>

        <footer className="flex flex-wrap justify-between gap-4 border-t border-[var(--border)] pt-6 pb-20 font-mono text-[0.625rem] leading-relaxed text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} Kyle Morimoto</span>
          <span className="text-[var(--accent)]">End of index / {countLabel}</span>
        </footer>
      </div>
    </div>
  );
}
