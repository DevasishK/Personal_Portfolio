import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import StatusRequestModal from './StatusRequestModal.jsx'

const STATUSES = /** @type {const} */ ({
  Single: 'Single',
  InRelationship: 'InRelationship',
  Complicated: 'Complicated',
  Focused: 'Focused',
})

function getBadgeClasses(status) {
  switch (status) {
    case STATUSES.Single:
      return 'border border-amber-300/70 bg-amber-200 text-amber-950 dark:border-amber-300/20 dark:bg-amber-400/15 dark:text-amber-100'
    case STATUSES.InRelationship:
      return 'border border-rose-300/70 bg-rose-200 text-rose-950 dark:border-rose-300/20 dark:bg-rose-400/15 dark:text-rose-100'
    case STATUSES.Complicated:
      return 'border border-orange-300/70 bg-orange-200 text-orange-950 dark:border-orange-300/20 dark:bg-orange-400/15 dark:text-orange-100'
    case STATUSES.Focused:
      return 'border border-sky-300/70 bg-sky-200 text-sky-950 dark:border-sky-300/20 dark:bg-sky-400/15 dark:text-sky-100'
    default:
      return 'border border-black/10 bg-white/40 text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-white'
  }
}

function getLabel(status) {
  switch (status) {
    case STATUSES.Single:
      return 'Single 😄'
    case STATUSES.InRelationship:
      return 'In a relationship ❤️'
    case STATUSES.Complicated:
      return 'Complicated 😅'
    case STATUSES.Focused:
      return 'Focused on goals 🚀'
    default:
      return status
  }
}

export default function RelationshipStatusDisplay({ status = STATUSES.Single }) {
  const [open, setOpen] = useState(false)
  const label = useMemo(() => getLabel(status), [status])

  return (
    <div className="text-center">
      <div className="text-sm font-semibold text-zinc-900 dark:text-white">Relationship status</div>

      <div className="flex justify-center">
        <motion.button
          type="button"
          className={[
            'mt-4 px-8 py-4 rounded-full text-lg font-semibold shadow-lg',
            'bg-gradient-to-r from-yellow-200 to-orange-200 text-amber-950',
            'dark:bg-gradient-to-r dark:from-yellow-400/20 dark:to-orange-400/20 dark:text-amber-100',
            'transition-all duration-300 ease-in-out',
          ].join(' ')}
          onClick={() => setOpen(true)}
          key={status}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
        >
          {label}
        </motion.button>
      </div>

      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">Curious? Try changing it 😏</div>

      <StatusRequestModal open={open} onClose={() => setOpen(false)} currentStatus={status} />
    </div>
  )
}

export { STATUSES }

