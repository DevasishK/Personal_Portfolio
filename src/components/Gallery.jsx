import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

export default function Gallery({ items }) {
  const [active, setActive] = useState(null)

  return (
    <div>
      <div className="columns-2 gap-3 sm:columns-3">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-black/10 bg-white/50 backdrop-blur transition-all duration-300 ease-in-out hover:shadow-md dark:border-white/10 dark:bg-white/5"
            onClick={() => setActive(it)}
            aria-label={`Open ${it.title}`}
          >
            <img
              src={it.src}
              alt={it.title}
              loading="lazy"
              className="h-auto w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-2 text-left text-xs font-medium text-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
              {it.title}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl"
              initial={{ y: 18, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 18, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.src} alt={active.title} className="max-h-[72vh] w-full object-contain" />
              <div className="flex items-center justify-between gap-3 border-t border-white/10 p-3 text-sm text-white">
                <div className="truncate font-medium">{active.title}</div>
                <button type="button" className="btn-ghost border-white/15 bg-white/10 text-white hover:bg-white/15" onClick={() => setActive(null)}>
                  <X className="h-4 w-4" /> Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

