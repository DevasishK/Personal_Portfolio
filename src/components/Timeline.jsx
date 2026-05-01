import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function Timeline({ items, variant = 'professional' }) {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-[2px] bg-zinc-200 dark:bg-neutral-700" aria-hidden="true" />

      <motion.ol
        className="relative space-y-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {items.map((it, idx) => (
          <motion.li key={`${it.title}-${idx}`} className="relative flex gap-4 pl-1" variants={item}>
            <div className="relative flex w-8 justify-center">
              <span
                className={clsx(
                  'mt-1.5 h-3 w-3 rounded-full',
                  variant === 'fun'
                    ? 'bg-gradient-to-br from-fuchsia-500 to-indigo-500'
                    : 'bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]',
                )}
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <div className="text-sm font-semibold">{it.title}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{it.date}</div>
              </div>
              <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{it.subtitle}</div>
              {it.detail ? <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{it.detail}</div> : null}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}

