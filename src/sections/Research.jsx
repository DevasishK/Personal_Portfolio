import Reveal from '../components/Reveal.jsx'

export default function Research({ items }) {
  return (
    <section id="research" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Research &amp; Work in Progress
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Research &amp; Work in Progress
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">Current topics I’m exploring.</p>
          </div>

          <ul className="mt-10 space-y-3 text-base text-zinc-700 dark:text-zinc-200">
            {items.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900/70 dark:bg-white/70" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

