import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, title, children, maxWidthClass = 'max-w-2xl' }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const content = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          {/* modal */}
          <motion.div
            className={[
              'relative z-10 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 text-zinc-900 backdrop-blur-2xl',
              // Use CSS for idle float so exit can complete/unmount reliably.
              'animate-floatSlow',
              'max-h-[85vh] overflow-y-auto',
              'dark:bg-white/5 dark:text-white',
              maxWidthClass,
            ].join(' ')}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute -inset-8 rounded-[32px] bg-gradient-to-br from-orange-400/25 via-pink-400/20 to-purple-400/20 blur-3xl"
              aria-hidden="true"
            />
            <button
              type="button"
              className="absolute right-4 top-4 text-white/70 transition-all duration-200 hover:text-white"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="relative">
              {title ? <div className="pr-10 text-lg font-semibold text-white">{title}</div> : null}
              <div className={title ? 'mt-4' : ''}>{children}</div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  if (typeof document !== 'undefined') return createPortal(content, document.body)
  return content
}

