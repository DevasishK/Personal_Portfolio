import { motion } from 'framer-motion'
import { Lock, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'

function Node({ label, tone = 'neutral' }) {
  const toneCls =
    tone === 'orange'
      ? 'bg-orange-500/15 text-orange-700 dark:bg-orange-400/15 dark:text-orange-200'
      : tone === 'pink'
        ? 'bg-pink-500/12 text-pink-700 dark:bg-pink-400/12 dark:text-pink-200'
        : 'bg-zinc-900/5 text-zinc-700 dark:bg-white/10 dark:text-zinc-200'

  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-orange-500/60 dark:bg-orange-300/70" aria-hidden="true" />
      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${toneCls}`}>{label}</span>
    </div>
  )
}

export default function SecureFileLockerVisual({ reducedMotion, liteEffects }) {
  const [hovered, setHovered] = useState(false)

  const dur = useMemo(() => {
    if (reducedMotion || liteEffects) return null
    return hovered ? 1.9 : 2.8
  }, [hovered, liteEffects, reducedMotion])

  return (
    <motion.div
      className="relative h-full w-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Center lock + ring */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-24 w-24 place-items-center">
          {!reducedMotion && !liteEffects ? (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-orange-400/35 dark:border-orange-300/35"
                animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: hovered ? 1.6 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-pink-400/22 dark:border-pink-300/25"
                animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: hovered ? 1.9 : 2.7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full border border-orange-400/30 dark:border-orange-300/30" />
              <div className="absolute inset-2 rounded-full border border-pink-400/18 dark:border-pink-300/20" />
            </>
          )}

          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-black/10 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/10">
            <Lock className="h-7 w-7 text-zinc-900 dark:text-white" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Flow: File -> Encrypt -> Secure */}
      <div className="absolute left-5 right-5 top-[70%] -translate-y-1/2">
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <Node label="File" tone="neutral" />
            <div className="relative flex-1">
              <div className="h-px w-full bg-black/10 dark:bg-white/10" />
              {!reducedMotion && !liteEffects ? (
                <motion.div
                  className="absolute -top-1.5 h-3 w-3 rounded-full bg-orange-500/70 shadow-sm dark:bg-orange-300/70"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: dur ?? 2.8, repeat: Infinity, ease: 'linear' }}
                  style={{ translateX: '-50%' }}
                />
              ) : null}
            </div>
            <Node label="Encrypt" tone="orange" />
            <div className="relative flex-1">
              <div className="h-px w-full bg-black/10 dark:bg-white/10" />
              {!reducedMotion && !liteEffects ? (
                <motion.div
                  className="absolute -top-1.5 h-3 w-3 rounded-full bg-pink-500/65 shadow-sm dark:bg-pink-300/70"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: (dur ?? 2.8) * 1.05, repeat: Infinity, ease: 'linear', delay: 0.25 }}
                  style={{ translateX: '-50%' }}
                />
              ) : null}
            </div>
            <Node label="Secure" tone="pink" />
          </div>
        </div>
      </div>

      {/* Micro details */}
      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
        <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
          AES Encryption Active
          <div className="mt-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Key derivation + hashing</div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-[11px] font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
          Integrity Verified
        </div>
      </div>

      {/* Hover glow accent (opacity only) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      >
        <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-orange-400/10" />
        <div className="absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-pink-400/10" />
      </div>
    </motion.div>
  )
}

