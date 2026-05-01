import Reveal from '../components/Reveal.jsx'
import Timeline from '../components/Timeline.jsx'

export default function Education({ items }) {
  return (
    <section id="education" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Education</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Education
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">Academic background and focus.</p>
          </div>

          <div className="mt-10">
            <Timeline items={items} />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

