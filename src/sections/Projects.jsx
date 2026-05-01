import Reveal from '../components/Reveal.jsx'
import ProjectRow from '../components/ProjectRow.jsx'

export default function Projects({ data, onCaseStudy }) {
  return (
    <section id="projects" className="w-full py-16 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Projects</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Selected work
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">A few projects with product thinking.</p>
          </div>

          <div className="mt-8 divide-y divide-black/5 dark:divide-white/10">
            {data.map((p, idx) => (
              <ProjectRow key={p.id} project={p} index={idx} onCaseStudy={onCaseStudy} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

