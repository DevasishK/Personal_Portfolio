import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ProjectVisual from '../components/projectVisuals/ProjectVisual.jsx'

function ProjectButtons({ codeUrl, demoUrl }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        className="btn-ghost w-full sm:w-auto"
        href={codeUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="View code"
        title="View code"
      >
        View Code <ArrowUpRight className="h-4 w-4" />
      </a>
      {demoUrl ? (
        <a
          className="btn-primary w-full sm:w-auto"
          href={demoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Live demo"
          title="Live demo"
        >
          Live Demo <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  )
}

function FeaturedProjectRow({ project, index }) {
  const reverse = index % 2 === 1

  return (
    <motion.div
      className={[
        'flex flex-col gap-10 py-10 md:items-center',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      ].join(' ')}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="md:w-[52%]">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {project.subtitle}
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
          {project.title}
        </div>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{project.description}</p>

        {project.highlights?.length ? (
          <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}

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

        <ProjectButtons codeUrl={project.codeUrl} demoUrl={project.demoUrl} />
      </div>

      <div className="md:w-[48%]">
        <ProjectVisual projectId={project.id} />
      </div>
    </motion.div>
  )
}

export default function ProjectsPro({ featured, other }) {
  return (
    <section id="projects" className="w-full py-16 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Projects</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Projects
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
              Featured work first, then a concise list of additional builds.
            </p>
          </div>

          <div className="mt-10">
            {featured.map((p, idx) => (
              <FeaturedProjectRow key={p.id} project={p} index={idx} />
            ))}
          </div>

          <div className="mt-12 border-t border-black/5 pt-12 dark:border-white/10">
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">Other projects</div>
            <div className="mt-6 divide-y divide-black/5 dark:divide-white/10">
              {other.map((p) => (
                <div key={p.title} className="py-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="text-base font-semibold text-zinc-900 dark:text-white">{p.title}</div>
                    {p.tech?.length ? (
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{p.tech.join(' • ')}</div>
                    ) : null}
                  </div>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{p.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

