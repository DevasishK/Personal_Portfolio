import {
  Code,
  Gauge,
  GitBranch,
  Search,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const ICONS = {
  Search,
  GitBranch,
  Code,
  Gauge,
}

export default function HowIWork({ steps }) {
  return (
    <section id="how-i-work" className="w-full py-16 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">How I work</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              A predictable process
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
              Keeps quality high and surprises low.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {steps.map((s, idx) => {
              const Icon = ICONS[s.icon] ?? Search
              return (
                <div key={s.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white">Step {idx + 1}</div>
                    <div className="mt-1 text-base font-semibold text-zinc-900 dark:text-white">{s.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{s.body}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

