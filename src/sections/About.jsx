import Reveal from '../components/Reveal.jsx'

export default function About({ data }) {
  return (
    <section id="about" className="w-full py-16 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">About</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              {data.title}
            </h2>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {data.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">Highlights</div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                {data.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900/70 dark:bg-white/70" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

