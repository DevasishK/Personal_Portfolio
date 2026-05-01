import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePerformancePrefs } from '../hooks/usePerformancePrefs.js'
import { useTimeSegment } from '../hooks/useTimeSegment.js'
import { THEMES } from '../theme/timeThemes.js'

export default function AmbientBackground({ children }) {
  const { segment, hour } = useTimeSegment()
  const { reducedMotion, liteEffects } = usePerformancePrefs()

  const theme = THEMES[segment] ?? THEMES.midday
  const positionX = useMemo(() => `${(Math.min(Math.max(hour, 0), 23) / 24) * 100}%`, [hour])
  const isNight = segment === 'night'

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Base UI layer (readability) */}
      <div
        className={[
          'absolute inset-0 z-0 transition-colors duration-300 dark:bg-[#020617]',
          // Light mode: premium ambient aura (not plain white/gray)
          '[background-color:#f6f4fb]',
          '[background-image:radial-gradient(circle_at_80%_50%,rgba(255,150,120,0.25),transparent_40%),radial-gradient(circle_at_75%_55%,rgba(255,120,200,0.22),transparent_45%),radial-gradient(circle_at_85%_50%,rgba(160,120,255,0.20),transparent_55%),linear-gradient(to_left,transparent_60%,#f6f4fb_100%)]',
          '[background-blend-mode:soft-light]',
          '[background-size:120%_120%]',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Ambient layer (subtle only; no full-page gradients) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {liteEffects ? null : (
          <motion.div
            className={[
              'absolute rounded-full blur-xl opacity-10',
              'h-[200px] w-[200px] md:h-[240px] md:w-[240px]',
              isNight ? 'bg-blue-200/30' : 'bg-yellow-300/40',
            ].join(' ')}
            style={{ left: positionX, top: theme.celestialTop, transform: 'translateX(-50%)' }}
            initial={reducedMotion ? false : { opacity: 0, x: -50 }}
            animate={reducedMotion ? { opacity: 0.1, left: positionX } : { opacity: 0.1, x: 0, left: positionX }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* App content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

