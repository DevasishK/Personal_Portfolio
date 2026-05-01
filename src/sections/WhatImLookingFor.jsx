import Reveal from '../components/Reveal.jsx'

export default function WhatImLookingFor({ data }) {
  return (
    <section id="looking-for" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Looking for</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              What I’m looking for
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
              Roles, problems, and direction that fit my strengths.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">Roles</div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {data.roles.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-900/70 dark:bg-white/70" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">Interests</div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {data.interests.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-900/70 dark:bg-white/70" aria-hidden="true" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">Career direction</div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{data.direction}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

