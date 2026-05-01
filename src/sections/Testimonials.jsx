import { Quote } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

export default function Testimonials({ items }) {
  return (
    <section id="testimonials" className="w-full py-16 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Testimonials</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              What people say
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">Feedback from people I’ve worked with.</p>
          </div>

          <div className="mt-10 divide-y divide-black/5 dark:divide-white/10">
            {items.map((t) => (
              <div key={t.quote} className="py-8">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                    <Quote className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-base leading-relaxed text-zinc-700 dark:text-zinc-200">“{t.quote}”</div>
                    <div className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</div>
                    <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

