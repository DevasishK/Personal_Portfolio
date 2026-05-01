import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'

export default function ImpactMetrics({ metrics }) {
  return (
    <section id="impact" className="w-full py-16 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Impact</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Output signals
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">Quick, measurable proof points.</p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, idx) => (
              <motion.div
                key={m.label}
                className="border-l border-black/10 pl-4 dark:border-white/15"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.28, ease: 'easeOut', delay: idx * 0.05 }}
              >
                <div className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{m.value}</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

