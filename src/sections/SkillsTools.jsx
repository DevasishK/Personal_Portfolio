import Reveal from '../components/Reveal.jsx'

function Group({ label, items }) {
  return (
    <div>
      <div className="text-sm font-semibold text-zinc-900 dark:text-white">{label}</div>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900/70 dark:bg-white/70" aria-hidden="true" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SkillsTools({ data }) {
  return (
    <section id="skills" className="w-full py-16 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Skills &amp; Tools</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Skills &amp; Tools
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
              A grouped view of what I use to build, ship, and secure systems.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Group label="Programming" items={data.programming} />
            <Group label="Web & Development" items={data.web} />
            <Group label="Cybersecurity" items={data.cybersecurity} />
            <Group label="AI/ML" items={data.aiml} />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

