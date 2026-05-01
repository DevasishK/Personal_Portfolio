import clsx from 'clsx'
import { motion } from 'framer-motion'

const TAGS = [
  { id: 'curious', label: 'curious 🤔' },
  { id: 'music', label: 'music 🎧' },
  { id: 'tea', label: 'tea ☕' },
  { id: 'photos', label: 'photos 📸' },
  { id: 'side_quests', label: 'side quests 🎮' },
]

export default function InteractiveTags({ activeId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((t) => {
        const active = activeId === t.id
        return (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => onSelect?.(t.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
              'border-zinc-300 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-100',
              'dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:bg-white/10',
              active && [
                'scale-105',
                'border-orange-400/80 shadow-[0_0_0_4px_rgba(251,146,60,0.15)]',
                'dark:shadow-[0_0_0_4px_rgba(251,146,60,0.18)]',
              ],
            )}
          >
            {t.label}
          </motion.button>
        )
      })}
    </div>
  )
}

