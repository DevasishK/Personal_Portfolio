import clsx from 'clsx'
import { useMemo } from 'react'
import { usePerformancePrefs } from '../hooks/usePerformancePrefs.js'

const VIEWBOX = 760

const COLORS = {
  orange: '#ff7a18',
  pink: '#ff4ecd',
  purple: '#7c3aed',
}

const CENTER = { x: VIEWBOX / 2, y: VIEWBOX / 2 }

const ORBITS = [
  // Ring spacing tuned so labels (radially outside dots) rarely collide.
  { id: 'inner', radius: 122, dashDur: 44, rotateDur: 60, nodes: 3 },
  { id: 'middle', radius: 208, dashDur: 52, rotateDur: 72, nodes: 3 },
  { id: 'outer', radius: 278, dashDur: 58, rotateDur: 84, nodes: 4 },
]

function degToRad(deg) {
  return (deg * Math.PI) / 180
}

function polarToCartesian(cx, cy, r, deg) {
  const a = degToRad(deg)
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

/**
 * Place label *center* along the ray from canvas center → dot, outside the dot.
 * Avoids stacking when inner/outer nodes share almost the same angle (fixed offsets did that).
 */
function labelCenterFromDot(dotX, dotY, orbitId, labelPad) {
  const vx = dotX - CENTER.x
  const vy = dotY - CENTER.y
  const len = Math.hypot(vx, vy) || 1
  const ux = vx / len
  const uy = vy / len
  const pad =
    typeof labelPad === 'number'
      ? labelPad
      : orbitId === 'outer'
        ? 58
        : orbitId === 'middle'
          ? 46
          : 36
  return {
    x: dotX + ux * pad,
    y: dotY + uy * pad,
  }
}

function Label({
  label,
  micro,
  leftPct,
  topPct,
  active,
  dimOthers,
  level = 'background',
  tone = 'neutral',
}) {
  const baseText = 'text-zinc-900 dark:text-white'
  const dimText = dimOthers ? 'opacity-50 dark:opacity-50' : 'opacity-75 dark:opacity-75'

  const levelClasses =
    level === 'primary'
      ? 'text-lg font-semibold'
      : level === 'secondary'
        ? 'text-base font-medium'
        : 'text-sm font-medium'

  const highlightText =
    tone === 'orange'
      ? 'text-orange-500 dark:text-orange-300'
      : tone === 'pink'
        ? 'text-pink-500 dark:text-pink-300'
        : baseText

  const baseInactive =
    level === 'secondary'
      ? 'text-zinc-900/80 dark:text-white/80'
      : level === 'background'
        ? 'text-zinc-900/60 dark:text-white/50'
        : baseText

  return (
    <div
      className={clsx('group absolute select-none', 'pointer-events-auto', 'transition-all duration-300')}
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: active ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%)',
      }}
    >
      {/* Float animates translateY on inner wrapper so it doesn’t fight centered transform */}
      <div className="animate-floatSlow">
        <div className="min-w-0 max-w-[148px] sm:max-w-[156px]">
          <div
            className={clsx(
              'leading-snug transition-all duration-300',
              levelClasses,
              active ? baseText : baseInactive,
              active ? 'opacity-100' : dimText,
              active ? highlightText : null,
              'group-hover:opacity-100',
              'group-hover:drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)] dark:group-hover:drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]',
            )}
          >
            {label}
          </div>
          {micro ? (
            <div
              className={clsx(
                'mt-1 max-w-[220px] text-xs leading-snug',
                'text-zinc-900/80 dark:text-white/80',
                'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
              )}
            >
              {micro}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function ThoughtTrail({ activeId, className }) {
  const { reducedMotion, liteEffects } = usePerformancePrefs()
  const allowMotion = !reducedMotion && !liteEffects
  const activeSet = useMemo(() => {
    if (!activeId) return new Set()
    if (activeId === 'tea') return new Set(['tea', 'tea_date'])
    return new Set([activeId])
  }, [activeId])

  const dimOthers = Boolean(activeId)

  const layout = useMemo(() => {
    // Min ~48° between nodes that were colliding: inner 156° vs outer 166°; middle 92° vs outer 76°.
    const innerAngles = [-108, 42, 156]
    const middleAngles = [-58, 126, 238]
    // Outer index 2 = side_quests at 180° (9 o’clock).
    const outerAngles = [-18, 84, 180, 324]

    const R = { inner: ORBITS[0].radius, middle: ORBITS[1].radius, outer: ORBITS[2].radius }

    const nodes = [
      // INNER ORBIT (core identity)
      { id: 'curious', orbit: 'inner', r: R.inner, deg: innerAngles[0], label: 'curious mind, happy heart 🤔', level: 'primary', tone: 'orange' },
      { id: 'tea', orbit: 'inner', r: R.inner, deg: innerAngles[1], label: 'tea > coffee ☕', level: 'primary', tone: 'orange' },
      { id: 'tea_date', orbit: 'inner', r: R.inner, deg: innerAngles[2], label: 'so… tea date? 😉', level: 'primary', tone: 'orange' },

      // MIDDLE ORBIT (labelNudge: shift label box without moving the orbit dot)
      {
        id: 'music',
        orbit: 'middle',
        r: R.middle,
        deg: middleAngles[0],
        label: 'music > silence 🎧',
        level: 'secondary',
        tone: 'pink',
        labelNudge: { dx: -52, dy: 0 },
      },
      { id: 'build', orbit: 'middle', r: R.middle, deg: middleAngles[1], label: 'building cool things > anything 💻', level: 'secondary', tone: 'neutral' },
      { id: 'overthink', orbit: 'middle', r: R.middle, deg: middleAngles[2], label: 'overthinker by default 🧠', level: 'secondary', tone: 'neutral' },

      // OUTER ORBIT (📓 avoids rare Safari font/emoji render issues with 📝)
      { id: 'debug', orbit: 'outer', r: R.outer, deg: outerAngles[0], label: 'debug at 2AM hits different 🔥', level: 'primary', tone: 'orange' },
      { id: 'photos', orbit: 'outer', r: R.outer, deg: outerAngles[1], label: 'photos freeze good memories 📸', level: 'background', tone: 'neutral' },
      {
        id: 'side_quests',
        orbit: 'outer',
        r: R.outer,
        deg: outerAngles[2],
        label: 'side quests unlock joy 🎮',
        level: 'background',
        tone: 'neutral',
        labelPad: 40,
      },
      { id: 'doc', orbit: 'outer', r: R.outer, deg: outerAngles[3], label: 'documenting the chaos 📓', level: 'background', tone: 'neutral' },
    ]

    return nodes.map((n) => {
      const p = polarToCartesian(CENTER.x, CENTER.y, n.r, n.deg)
      let text = labelCenterFromDot(p.x, p.y, n.orbit, n.labelPad)
      if (n.labelNudge) {
        text = {
          x: text.x + n.labelNudge.dx,
          y: text.y + n.labelNudge.dy,
        }
      }
      // Room for label box (~±80px in viewBox units) when using translate(-50%,-50%).
      const marginPct = (88 / VIEWBOX) * 100
      const leftPctRaw = (text.x / VIEWBOX) * 100
      const topPctRaw = (text.y / VIEWBOX) * 100
      const leftPct = Math.min(100 - marginPct, Math.max(marginPct, leftPctRaw))
      const topPct = Math.min(100 - marginPct, Math.max(marginPct, topPctRaw))
      return {
        ...n,
        dot: p,
        text,
        leftPct,
        topPct,
      }
    })
  }, [])

  const activeGlow = useMemo(() => {
    if (!activeId) return new Set()
    if (activeId === 'tea') return new Set(['tea', 'tea_date'])
    return new Set([activeId])
  }, [activeId])

  return (
    <div className={clsx('relative h-full w-full', className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2={VIEWBOX} y2={VIEWBOX} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={COLORS.orange} />
            <stop offset="0.5" stopColor={COLORS.pink} />
            <stop offset="1" stopColor={COLORS.purple} />
          </linearGradient>
        </defs>

        {/* orbit paths (stable, centered) */}
        <g>
          {/* Inner */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={ORBITS[0].radius}
            stroke="url(#orbitGrad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.35"
            fill="none"
          >
            {allowMotion ? (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${CENTER.x} ${CENTER.y}`}
                to={`360 ${CENTER.x} ${CENTER.y}`}
                dur={`${ORBITS[0].rotateDur}s`}
                repeatCount="indefinite"
              />
            ) : null}
          </circle>
          {/* Middle */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={ORBITS[1].radius}
            stroke="url(#orbitGrad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.28"
            fill="none"
          >
            {allowMotion ? (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`360 ${CENTER.x} ${CENTER.y}`}
                to={`0 ${CENTER.x} ${CENTER.y}`}
                dur={`${ORBITS[1].rotateDur}s`}
                repeatCount="indefinite"
              />
            ) : null}
          </circle>
          {/* Outer */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={ORBITS[2].radius}
            stroke="url(#orbitGrad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.22"
            fill="none"
          >
            {allowMotion ? (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${CENTER.x} ${CENTER.y}`}
                to={`360 ${CENTER.x} ${CENTER.y}`}
                dur={`${ORBITS[2].rotateDur}s`}
                repeatCount="indefinite"
              />
            ) : null}
          </circle>
        </g>

        {/* subtle orbit highlights near active nodes */}
        {layout.map((n) => {
          if (!activeGlow.has(n.id)) return null
          return (
            <circle
              key={`active-orbit-${n.id}`}
              cx={CENTER.x}
              cy={CENTER.y}
              r={n.r}
              stroke="url(#orbitGrad)"
              strokeWidth="3.5"
              strokeDasharray="28 999"
              strokeDashoffset={-n.deg * 2.2}
              opacity="0.7"
              fill="none"
            />
          )
        })}

        {/* flow dots (one per orbit, stable rotation) */}
        {ORBITS.map((o, idx) => (
          <g key={`flow-${o.id}`} opacity="0.95">
            <g>
              <circle cx={CENTER.x + o.radius} cy={CENTER.y} r="6" fill="rgba(255,122,24,0.25)" />
              <circle cx={CENTER.x + o.radius} cy={CENTER.y} r="2.6" fill="rgba(255,122,24,0.95)" />
              {allowMotion ? (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`${idx % 2 ? 360 : 0} ${CENTER.x} ${CENTER.y}`}
                  to={`${idx % 2 ? 0 : 360} ${CENTER.x} ${CENTER.y}`}
                  dur={`${o.dashDur}s`}
                  repeatCount="indefinite"
                />
              ) : null}
            </g>
          </g>
        ))}

        {/* dot + connector line (SVG) */}
        {layout.map((n) => {
          const dotX = n.dot.x
          const dotY = n.dot.y
          const textX = n.text.x
          const textY = n.text.y
          const active = activeSet.has(n.id)
          return (
            <g key={`dot-${n.id}`} opacity={active ? 1 : dimOthers ? 0.55 : 0.72}>
              <line
                x1={dotX}
                y1={dotY}
                x2={textX}
                y2={textY}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
                strokeDasharray="2 6"
                opacity={active ? 0.75 : 0.35}
              />
              <circle
                cx={dotX}
                cy={dotY}
                r={active ? 5 : 4}
                fill={active ? 'rgba(255,122,24,0.95)' : 'rgba(255,122,24,0.55)'}
              />
              {active ? (
                <circle cx={dotX} cy={dotY} r="12" fill="rgba(255,122,24,0.16)" className="animate-glowPulse" />
              ) : null}
            </g>
          )
        })}

        {/* specks */}
        {Array.from({ length: liteEffects ? 8 : 18 }).map((_, i) => {
          const x = (i * 37) % VIEWBOX
          const y = (i * 91) % VIEWBOX
          const r = i % 3 === 0 ? 1.6 : 1.1
          return (
            <circle
              key={`speck-${i}`}
              cx={x}
              cy={y}
              r={r}
              fill="rgba(255,255,255,0.10)"
              className={allowMotion ? 'speck-twinkle' : undefined}
              opacity={0.35}
            />
          )
        })}
      </svg>

      {/* labels (HTML) */}
      {layout.map((n) => {
        const isTeaAlways = activeId === 'tea' && n.id === 'tea'
        return (
          <Label
            key={`label-${n.id}`}
            label={isTeaAlways ? 'tea > coffee ☕ (always)' : n.label}
            micro={null}
            leftPct={n.leftPct}
            topPct={n.topPct}
            active={activeSet.has(n.id)}
            dimOthers={dimOthers}
            level={n.level}
            tone={n.tone}
          />
        )
      })}

      {/* tea special: extra pulse near node */}
      {activeId === 'tea' ? (
        <div
          className="pointer-events-none absolute right-16 top-[380px] h-6 w-6 rounded-full bg-orange-400/25 blur-sm animate-ping"
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}

