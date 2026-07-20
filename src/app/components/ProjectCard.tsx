import Link from 'next/link';
import type { ReactNode } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  eyebrow?: string;
  featured?: boolean;
  highlights?: string[];
  visual?: ReactNode;
  liveUrl?: string;
  githubUrl?: string;
  liveLabel?: string;
  githubLabel?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  techStack, 
  eyebrow,
  featured = false,
  highlights,
  visual,
  liveUrl, 
  githubUrl,
  liveLabel = 'Live',
  githubLabel = 'Code',
}: ProjectCardProps) {
  return (
    <article
      className={`h-full overflow-hidden border-2 border-[var(--border)] bg-[var(--surface-primary)] shadow-[6px_6px_0px_var(--shadow-color)] transition-all duration-200 ease-out hover:-translate-x-px hover:-translate-y-px hover:shadow-[7px_7px_0px_var(--shadow-color)] ${
        featured ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]' : ''
      }`}
    >
      {visual && (
        <div className="min-w-0 border-b-2 border-[var(--border)] bg-[var(--surface-tertiary)] p-3 sm:p-5 lg:border-r-2 lg:border-b-0">
          {visual}
        </div>
      )}

      <div className={`flex h-full min-w-0 flex-col ${featured ? 'p-6 sm:p-8' : 'p-6'}`}>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {eyebrow}
          </p>
        )}
        <h3 className={`font-display font-bold ${featured ? 'mb-3 text-2xl sm:text-3xl' : 'mb-2 text-xl'}`}>
          {title}
        </h3>
        <p className="mb-5 leading-relaxed text-[var(--text-muted)]">{description}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mb-5 grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-[0.45em] h-2 w-2 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mb-5 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="border-2 border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-1 text-sm font-medium"
            >
              {tech}
            </span>
          ))}
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
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--surface-primary)] px-3 py-2 font-semibold text-[var(--text-primary)] transition-colors duration-150 ease-out hover:bg-[var(--surface-inverse)] hover:text-[var(--text-inverse)]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              {githubLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
