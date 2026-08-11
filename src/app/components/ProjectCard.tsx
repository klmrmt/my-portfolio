import Link from 'next/link';
import type { ReactNode } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  eyebrow?: string;
  featured?: boolean;
  spotlight?: boolean;
  highlights?: string[];
  visual?: ReactNode;
  liveUrl?: string;
  liveLabel?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  techStack, 
  eyebrow,
  featured = false,
  spotlight = false,
  highlights,
  visual,
  liveUrl, 
  liveLabel = 'Live',
}: ProjectCardProps) {
  return (
    <article
      className={`h-full overflow-hidden border-[var(--border)] transition-all duration-200 ease-out hover:-translate-x-px hover:-translate-y-px ${
        spotlight
          ? 'border-[3px] bg-[var(--surface-secondary)] shadow-[8px_8px_0px_var(--shadow-color)] hover:shadow-[9px_9px_0px_var(--shadow-color)]'
          : 'border-2 bg-[var(--surface-primary)] shadow-[6px_6px_0px_var(--shadow-color)] hover:shadow-[7px_7px_0px_var(--shadow-color)]'
      } ${
        featured ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]' : ''
      }`}
    >
      {visual && (
        <div className="min-w-0 border-b-2 border-[var(--border)] bg-[var(--surface-tertiary)] p-3 sm:p-5 lg:border-r-2 lg:border-b-0">
          {visual}
        </div>
      )}

      <div className={`flex h-full min-w-0 flex-col ${featured || spotlight ? 'p-6 sm:p-8' : 'p-6'}`}>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {eyebrow}
          </p>
        )}
        <h3 className={`font-display font-bold ${featured || spotlight ? 'mb-3 text-2xl sm:text-3xl' : 'mb-2 text-xl'}`}>
          {title}
        </h3>
        <p className={`mb-5 max-w-[68ch] leading-relaxed text-[var(--text-muted)] ${spotlight ? 'text-lg' : ''}`}>
          {description}
        </p>

        {highlights && highlights.length > 0 && (
          <div className="mb-5">
            <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Built around
            </p>
            <ul className={`grid gap-x-5 gap-y-2 text-sm ${
              spotlight
                ? 'sm:grid-cols-2 lg:grid-cols-4'
                : featured
                  ? 'sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'
                  : ''
            }`}>
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-[0.45em] h-2 w-2 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-5">
          <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Built with
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="border-2 border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-1 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--surface-inverse)] px-3 py-2 font-semibold text-[var(--text-inverse)] transition-colors duration-150 ease-out hover:bg-[var(--surface-primary)] hover:text-[var(--text-primary)]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              {liveLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
