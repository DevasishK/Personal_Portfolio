import { ExternalLink } from 'lucide-react'
import clsx from 'clsx'

export default function ProjectCard({ project, variant = 'professional', onCaseStudy }) {
  return (
    <div
      className={clsx(
        'card card-hover group block p-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40',
        variant === 'fun' && 'border-fuchsia-200/60 dark:border-fuchsia-900/40',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold tracking-tight">{project.title}</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{project.description}</div>
        </div>
        <a
          href={project.href}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-900 text-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 dark:bg-white dark:text-zinc-900"
          aria-label={`Open ${project.title}`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags?.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      {project.highlights?.length ? (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}

      {variant === 'professional' ? (
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => onCaseStudy?.(project)}
          >
            View Case Study
          </button>
          <div className="text-xs text-gray-600 dark:text-gray-400">Problem → Approach → Learnings</div>
        </div>
      ) : null}
    </div>
  )
}

