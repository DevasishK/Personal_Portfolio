import { motion } from 'framer-motion'
import { CheckCircle2, Gauge } from 'lucide-react'
import { useMemo, useState } from 'react'

function FlowNode({ label }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 px-3 py-2 text-[11px] font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
      {label}
    </div>
  )
}

export default function LoanRiskVisual({ reducedMotion, liteEffects }) {
  const [hovered, setHovered] = useState(false)
  const allowMotion = !reducedMotion && !liteEffects

  const needleDur = useMemo(() => {
    if (!allowMotion) return null
    return hovered ? 1.8 : 2.6
  }, [allowMotion, hovered])

  const barDur = useMemo(() => {
    if (!allowMotion) return null
    return hovered ? 1.5 : 2.1
  }, [allowMotion, hovered])

  return (
    <motion.div className="relative h-full w-full" onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
      {/* Flow row */}
      <div className="absolute left-4 right-4 top-5 flex items-center justify-between gap-3">
        <FlowNode label="Applicant" />
        <div className="flex-1">
          <div className="h-px w-full bg-black/10 dark:bg-white/10" />
        </div>
        <FlowNode label="Risk Score" />
        <div className="flex-1">
          <div className="h-px w-full bg-black/10 dark:bg-white/10" />
        </div>
        <FlowNode label="Decision" />
      </div>

      {/* Gauge */}
      <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-28 w-56 place-items-center rounded-3xl border border-black/10 bg-white/60 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/10">
          <div className="absolute left-4 top-3 flex items-center gap-2 text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            Risk gauge
          </div>

          <div className="relative mt-3 h-16 w-44">
            {/* base arc (static) */}
            <div className="absolute left-1/2 top-8 h-10 w-44 -translate-x-1/2 rounded-[999px] border border-black/10 dark:border-white/10" />

            {/* needle (rotate transform) */}
            <motion.div
              className="absolute left-1/2 top-8 h-1 w-16 origin-left rounded-full bg-orange-500/70 dark:bg-orange-300/70"
              initial={false}
              animate={
                allowMotion
                  ? { rotate: [-30, 18, -10] }
                  : { rotate: 10 }
              }
              transition={
                allowMotion
                  ? { duration: needleDur ?? 2.6, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.2 }
              }
              style={{ translateX: '0%' }}
            />

            {/* center pin */}
            <div className="absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900/40 dark:bg-white/40" />
          </div>

          {/* score bar (scaleX transform) */}
          <div className="mt-2 w-full">
            <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10" />
            <motion.div
              className="-mt-2 h-2 w-full origin-left rounded-full bg-gradient-to-r from-emerald-400/55 via-orange-400/55 to-pink-400/50"
              initial={false}
              animate={allowMotion ? { scaleX: [0.35, 0.82, 0.55] } : { scaleX: 0.62 }}
              transition={allowMotion ? { duration: barDur ?? 2.1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            />
          </div>
        </div>
      </div>

      {/* Micro details */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
          SHAP + LIME
          <div className="mt-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Explainable risk scoring</div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-[11px] font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
          Risk Classified
        </div>
      </div>
    </motion.div>
  )
}

