import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import clsx from 'clsx'

export default function TiltCard({ className, children, onClick }) {
  const ref = useRef(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rx = useTransform(my, [-0.5, 0.5], [3, -3])
  const ry = useTransform(mx, [-0.5, 0.5], [-3, 3])

  const rotateX = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.6 })
  const rotateY = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.6 })

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    mx.set(px)
    my.set(py)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      className={clsx(
        'group relative w-full text-left',
        'transition-all duration-300 ease-in-out',
        className,
      )}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-2xl" />
      <div className="relative h-full [transform:translateZ(0px)]">{children}</div>
    </motion.button>
  )
}

