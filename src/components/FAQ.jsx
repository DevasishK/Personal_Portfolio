import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

export default function FAQ({ items, variant = 'professional' }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
      {items.map((it, idx) => {
        const isOpen = open === idx
        return (
          <div key={it.q} className="py-1">
            <button
              type="button"
              className={clsx(
                'flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left text-sm font-medium transition sm:px-4',
                variant === 'fun'
                  ? 'hover:bg-fuchsia-500/5 dark:hover:bg-fuchsia-500/10'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/50',
              )}
              onClick={() => setOpen((v) => (v === idx ? -1 : idx))}
            >
              <span>{it.q}</span>
              <ChevronDown className={clsx('h-4 w-4 transition', isOpen && 'rotate-180')} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden px-3 pb-3 sm:px-4"
                >
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">{it.a}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

