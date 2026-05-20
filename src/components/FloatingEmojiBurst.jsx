import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function buildItems(count, emojis) {
  return Array.from({ length: count }).map((_, i) => {
    const emoji = emojis[i % emojis.length]
    const left = Math.round(Math.random() * 80 + 10)
    const delay = Math.random() * 0.15
    const x = Math.round((Math.random() - 0.5) * 120)
    const y = Math.round(80 + Math.random() * 80)
    const rotate = Math.round((Math.random() - 0.5) * 40)
    return { id: `${i}-${left}-${delay}`, emoji, left, delay, x, y, rotate }
  })
}

export default function FloatingEmojiBurst({ active, count = 10, emojis = ['💛', '✨', '💖', '💌'] }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!active) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomize burst layout when it starts
    setItems(buildItems(count, emojis))
  }, [active, count, emojis])

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute bottom-6 text-lg"
          style={{ left: `${it.left}%` }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 0], y: -it.y, x: it.x, rotate: it.rotate, scale: [0.9, 1.1, 1] }}
          transition={{ duration: 1.1, delay: it.delay, ease: 'easeOut' }}
        >
          {it.emoji}
        </motion.div>
      ))}
    </div>
  )
}
