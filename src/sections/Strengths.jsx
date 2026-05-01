import Reveal from '../components/Reveal.jsx'

export default function Strengths({ items }) {
  return (
    <section id="strengths" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">What I Bring</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              What I Bring
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
              The strengths I bring into real-world engineering work.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {items.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-200">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900/70 dark:bg-white/70" aria-hidden="true" />
                <span className="text-base">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

