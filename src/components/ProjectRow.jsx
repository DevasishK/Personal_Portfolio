import { ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'

export default function ProjectRow({ project, index, onCaseStudy }) {
  const reverse = index % 2 === 1

  return (
    <div
      className={clsx(
        'flex flex-col gap-8 py-10 md:items-center',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      <div className="md:w-[52%]">
        <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{project.title}</div>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{project.description}</p>

        {project.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {project.highlights?.length ? (
          <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" className="btn-ghost w-full sm:w-auto" onClick={() => onCaseStudy?.(project)}>
            View Case Study
          </button>
          <a
            className="btn-primary w-full sm:w-auto"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title}`}
          >
            Visit <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="md:w-[48%]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-zinc-100 via-white to-zinc-50 dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-white/10">
          <div className="absolute inset-0 grid place-items-center text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-300">
            Project image placeholder
          </div>
        </div>
      </div>
    </div>
  )
}

