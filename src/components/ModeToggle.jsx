import { motion } from 'framer-motion'
import { Briefcase, Gamepad2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MODES, useMode } from '../context/ModeContext.jsx'
import clsx from 'clsx'

export default function ModeToggle({ className }) {
  const { mode, setMode } = useMode()
  const navigate = useNavigate()

  const current = mode ?? MODES.professional
  const options = [
    { id: MODES.professional, label: 'Professional', to: '/pro', Icon: Briefcase },
    { id: MODES.fun, label: 'Fun', to: '/fun', Icon: Gamepad2 },
  ]

  return (
    <div
      className={clsx(
        'relative flex h-11 w-[240px] items-center rounded-full bg-zinc-200 p-1 text-[13px] text-zinc-900 dark:bg-zinc-800 dark:text-white',
        className,
      )}
      role="tablist"
      aria-label="Mode"
    >
      {options.map((opt) => {
        const active = current === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            className={clsx(
              'relative z-10 flex h-9 w-1/2 items-center justify-center gap-2 rounded-full px-3 font-medium transition-colors duration-150',
              active ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 hover:opacity-80 dark:text-zinc-300',
            )}
            onClick={() => {
              setMode(opt.id)
              navigate(opt.to)
            }}
            role="tab"
            aria-selected={active}
          >
            <opt.Icon className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">{opt.label}</span>
          </button>
        )
      })}

      <motion.div
        className="absolute left-1 top-1 h-9 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm dark:bg-zinc-950"
        animate={{ x: current === MODES.fun ? '100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 650, damping: 44, mass: 0.7 }}
        aria-hidden="true"
      />
    </div>
  )
}

