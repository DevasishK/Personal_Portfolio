import {
  Layers,
  Puzzle,
  Sparkles,
  Zap,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const ICONS = {
  Puzzle,
  Sparkles,
  Zap,
  Layers,
}

export default function WhyHireMe({ items }) {
  return (
    <section id="why-hire-me" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Why hire me</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              The kind of engineer you get on day one
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
              Strong fundamentals, clear communication, and pragmatic shipping.
            </p>
          </div>

          <div className="mt-10 divide-y divide-black/5 dark:divide-white/10">
            {items.map((it) => {
              const Icon = ICONS[it.icon] ?? Sparkles
              return (
                <div key={it.title} className="flex gap-4 py-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-zinc-900 dark:text-white">{it.title}</div>
                    <div className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{it.body}</div>
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

