import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { professionalData } from '../utils/sampleData.js'

export default function Hero({ variant = 'professional' }) {
  const data = professionalData

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-gradient-to-b from-white to-zinc-50 p-6 shadow-md transition-all duration-300 ease-in-out dark:border-white/10 dark:from-neutral-900 dark:to-black sm:p-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
      </div>

      <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="chip border-white/10 bg-white/60 dark:bg-white/5">
            {variant === 'professional' ? 'Professional mode' : 'Mode'}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <motion.h1
              className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {data.name}
            </motion.h1>
            {variant === 'professional' && data.currentStatus ? (
              <motion.span
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
              >
                {data.currentStatus}
              </motion.span>
            ) : null}
          </div>
          <motion.p
            className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            {data.tagline}
          </motion.p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <MapPin className="h-4 w-4" />
            {data.location}
          </div>
        </div>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        >
          {data.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/70 bg-white/60 px-4 py-2 text-sm font-semibold text-zinc-900 transition-all duration-300 ease-in-out hover:bg-zinc-900 hover:text-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black"
              target="_blank"
              rel="noreferrer"
            >
              {l.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

