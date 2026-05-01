import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'

function MiniNode({ title, subtitle, active }) {
  return (
    <div
      className={[
        'rounded-2xl border border-black/10 bg-white/60 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/10',
        'transition-opacity duration-200',
        active ? 'opacity-100' : 'opacity-70',
      ].join(' ')}
    >
      <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-100">{title}</div>
      <div className="mt-0.5 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">{subtitle}</div>
    </div>
  )
}

export default function PhishingUrlVisual({ reducedMotion, liteEffects }) {
  const [hovered, setHovered] = useState(false)

  const dur = useMemo(() => {
    if (reducedMotion || liteEffects) return null
    return hovered ? 2.6 : 3.8
  }, [hovered, liteEffects, reducedMotion])

  const allowMotion = !reducedMotion && !liteEffects

  return (
    <motion.div className="relative h-full w-full" onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
      {/* Top flow row */}
      <div className="absolute left-4 right-4 top-4 grid grid-cols-4 gap-3">
        <MiniNode title="URL Input" subtitle="Parse" active />
        <MiniNode title="Features" subtitle="Extract" active={hovered || !allowMotion} />
        <MiniNode title="Classifier" subtitle="Predict" active={hovered || !allowMotion} />
        <MiniNode title="Result" subtitle="Safe/Phish" active />
      </div>

      {/* Connector with moving dot */}
      <div className="absolute left-6 right-6 top-[48%] -translate-y-1/2">
        <div className="relative">
          <div className="h-px w-full bg-black/10 dark:bg-white/10" />
          {allowMotion ? (
            <motion.div
              className="absolute -top-1.5 h-3 w-3 rounded-full bg-orange-500/70 dark:bg-orange-300/70"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: dur ?? 3.8, repeat: Infinity, ease: 'linear' }}
              style={{ translateX: '-50%' }}
            />
          ) : null}
        </div>
      </div>

      {/* Bottom: verdict pills */}
      <div className="absolute left-4 right-4 top-[64%] -translate-y-1/2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-3 py-2 text-[11px] font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
          Safe
        </div>

        <motion.div
          className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-3 py-2 text-[11px] font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100"
          animate={allowMotion && hovered ? { opacity: [0.75, 1, 0.75] } : { opacity: 1 }}
          transition={allowMotion && hovered ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
        >
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-300" aria-hidden="true" />
          Phish
        </motion.div>
      </div>

      {/* Micro details */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
          93% Accuracy
          <div className="mt-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">SHAP Explainability</div>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-[11px] font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
          Feature-based detection
        </div>
      </div>
    </motion.div>
  )
}

