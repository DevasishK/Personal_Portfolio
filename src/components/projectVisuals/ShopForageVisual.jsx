import { motion } from 'framer-motion'
import { Check, ShoppingCart } from 'lucide-react'
import { useMemo, useState } from 'react'

function StepPill({ label, active }) {
  return (
    <div
      className={[
        'rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-opacity duration-200',
        active ? 'opacity-100' : 'opacity-55',
        'bg-zinc-900/5 text-zinc-700 dark:bg-white/10 dark:text-zinc-200',
      ].join(' ')}
    >
      {label}
    </div>
  )
}

export default function ShopForageVisual({ reducedMotion, liteEffects }) {
  const [hovered, setHovered] = useState(false)

  const cycleDur = useMemo(() => {
    if (reducedMotion || liteEffects) return null
    return hovered ? 2.4 : 3.6
  }, [hovered, liteEffects, reducedMotion])

  return (
    <motion.div className="relative h-full w-full" onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
      {/* Mini UI (product card) */}
      <div className="absolute left-4 top-4 w-[46%] rounded-2xl border border-black/10 bg-white/65 p-3 shadow-sm dark:border-white/10 dark:bg-white/10">
        <div className="h-16 rounded-xl bg-gradient-to-br from-zinc-100 to-white dark:from-white/10 dark:to-white/5" />
        <div className="mt-3 space-y-2">
          <div className="h-2 w-3/4 rounded bg-black/10 dark:bg-white/10" />
          <div className="h-2 w-1/2 rounded bg-black/10 dark:bg-white/10" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="h-2 w-10 rounded bg-orange-500/25 dark:bg-orange-300/25" />
          <div className="rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-semibold text-white dark:bg-white dark:text-zinc-900">
            Add to cart
          </div>
        </div>
      </div>

      {/* Flow steps header */}
      <div className="absolute left-4 right-4 top-[52%] -translate-y-1/2">
        <div className="flex items-center justify-between gap-2">
          <StepPill label="Product" active />
          <StepPill label="Cart" active={!reducedMotion && !liteEffects ? hovered : true} />
          <StepPill label="Payment" active={!reducedMotion && !liteEffects ? hovered : true} />
        </div>
      </div>

      {/* Flow nodes + moving highlight */}
      <div className="absolute left-4 right-4 top-[68%] -translate-y-1/2">
        <div className="relative flex items-center justify-between gap-3">
          {/* Product node */}
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/10">
            <div className="h-6 w-6 rounded-lg bg-orange-500/22 dark:bg-orange-300/20" />
          </div>

          <div className="relative flex-1">
            <div className="h-px w-full bg-black/10 dark:bg-white/10" />
            {!reducedMotion && !liteEffects ? (
              <motion.div
                className="absolute -top-1.5 h-3 w-3 rounded-full bg-orange-500/70 dark:bg-orange-300/70"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: cycleDur ?? 3.6, repeat: Infinity, ease: 'linear' }}
                style={{ translateX: '-50%' }}
              />
            ) : null}
          </div>

          {/* Cart node */}
          <motion.div
            className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/10"
            animate={!reducedMotion && !liteEffects && hovered ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={!reducedMotion && !liteEffects && hovered ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
          >
            <ShoppingCart className="h-5 w-5 text-zinc-900 dark:text-white" aria-hidden="true" />
          </motion.div>

          <div className="relative flex-1">
            <div className="h-px w-full bg-black/10 dark:bg-white/10" />
            {!reducedMotion && !liteEffects ? (
              <motion.div
                className="absolute -top-1.5 h-3 w-3 rounded-full bg-pink-500/65 dark:bg-pink-300/70"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: (cycleDur ?? 3.6) * 1.03, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                style={{ translateX: '-50%' }}
              />
            ) : null}
          </div>

          {/* Payment success node */}
          <motion.div
            className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/10"
            animate={!reducedMotion && !liteEffects && hovered ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
            transition={!reducedMotion && !liteEffects && hovered ? { duration: 1.0, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
          >
            <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/18 dark:bg-emerald-300/14">
              <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-200" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Micro text */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
          Browse → Cart → Checkout
          <div className="mt-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Smooth full-stack flow</div>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-[11px] font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100">
          Payment ✔
        </div>
      </div>
    </motion.div>
  )
}

