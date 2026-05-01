import Reveal from '../components/Reveal.jsx'

function List({ title, items }) {
  return (
    <div>
      <div className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</div>
      <div className="mt-4 divide-y divide-black/5 dark:divide-white/10">
        {items.map((c) => (
          <div key={c.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <div className="text-base font-semibold text-zinc-900 dark:text-white">{c.title}</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{c.issuer}</div>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{c.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Certifications({ data }) {
  const completed = Array.isArray(data) ? data : data?.completed ?? []
  const inProgress = Array.isArray(data) ? [] : data?.inProgress ?? []

  return (
    <section id="certifications" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Certifications</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Proof points
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">Continuous learning and credentials.</p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <List title="Completed" items={completed} />
            {inProgress.length ? <List title="In progress" items={inProgress} /> : null}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

