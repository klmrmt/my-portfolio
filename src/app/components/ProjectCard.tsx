import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  index: number;
  title: string;
  description: string;
  category: string;
}

export default function ProjectCard({
  slug,
  index,
  title,
  description,
  category,
}: ProjectCardProps) {
  return (
    <article className="flex h-full min-h-[18.5rem] min-w-0 flex-col border-2 border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-primary)_35%,var(--background))] px-6 pt-6 shadow-[4px_4px_0px_var(--shadow-color)] transition-[translate,box-shadow] duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--shadow-color)] focus-within:shadow-[6px_6px_0px_var(--shadow-color)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 sm:min-h-[21.5rem]">
      <div className="mb-5 flex items-start justify-between gap-3 font-mono text-xs leading-relaxed">
        <span className="shrink-0 text-xs text-[var(--accent)]" aria-hidden="true">
          {String(index + 1).padStart(3, "0")}
        </span>
        <span className="text-right text-[var(--text-muted)]">{category}</span>
      </div>

      <h3 className="mb-4 font-display text-[1.625rem] font-extrabold leading-[1.15] tracking-[-0.025em] [overflow-wrap:anywhere] sm:min-h-[3.75rem]">
        {title}
      </h3>
      <p className="mb-7 max-w-[65ch] text-base leading-relaxed text-[var(--text-muted)]">
        {description}
      </p>

      <Link
        href={`/portfolio/${slug}`}
        aria-label={`Read more about ${title}`}
        className="mt-auto flex min-h-[3.625rem] items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--border)_25%,var(--background))] py-3 font-mono text-sm font-medium transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        Read more
        <span className="text-xl text-[var(--accent)]" aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
