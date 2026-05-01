import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { MODES, useMode } from '../context/ModeContext.jsx'
import { useEffect, useMemo, useRef, useState } from 'react'

const TRANSITION = { duration: 0.4, ease: 'easeInOut' }

function SideContent({ side, onCta }) {
  const content = useMemo(() => {
    if (side === MODES.professional) {
      return {
        label: 'For Recruiters',
        heading: 'Professional',
        desc: 'Projects, experience, resume, and a structured overview.',
        cta: 'Explore Professional',
      }
    }
    return {
      label: 'For Friends',
      heading: 'Fun',
      desc: 'Gallery, personality, interactions, and creative side.',
      cta: 'Enter Fun Side',
    }
  }, [side])

  const isPro = side === MODES.professional

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-start justify-center px-4 py-6 md:px-16 md:py-0"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
    >
      <motion.div
        className={[
          'inline-flex items-center rounded-full px-4 py-2 text-base font-semibold backdrop-blur',
          isPro
            ? 'border border-black/10 bg-white/70 text-zinc-900 dark:border-white/15 dark:bg-black/40 dark:text-white'
            : 'border border-black/10 bg-white/70 text-zinc-900 dark:border-white/15 dark:bg-black/40 dark:text-white',
        ].join(' ')}
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
      >
        {content.label}
      </motion.div>

      <motion.h1
        className={[
          'mt-4 text-balance heading-hero text-readable-shadow',
          'text-zinc-900 dark:text-white',
        ].join(' ')}
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1 } } }}
      >
        {content.heading}
      </motion.h1>

      <motion.p
        className={[
          'mt-3 max-w-xl text-pretty subtext-hero',
          'text-zinc-700 dark:text-zinc-300',
        ].join(' ')}
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.2 } } }}
      >
        {content.desc}
      </motion.p>

      <motion.button
        type="button"
        onClick={onCta}
        className={[
          'mt-6 inline-flex min-h-10 w-full items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300 ease-in-out focus:outline-none sm:w-auto',
          'hover:scale-105 hover:shadow-md',
          isPro
            ? 'bg-gray-900 text-white focus:ring-2 focus:ring-gray-900/20 dark:bg-white dark:text-black dark:focus:ring-white/30'
            : 'bg-[#C4B5FD] text-[#2D2D2D] hover:bg-[#A78BFA] focus:ring-2 focus:ring-purple-500/20 dark:bg-white/15 dark:text-white dark:hover:bg-white/20 dark:focus:ring-white/20',
        ].join(' ')}
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.3 } } }}
        whileTap={{ scale: 0.98 }}
      >
        {content.cta}
      </motion.button>
    </motion.div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  useMode()
  const [hovered, setHovered] = useState(null) // 'professional' | 'fun' | null
  const [selected, setSelected] = useState(null) // 'professional' | 'fun' | null
  const timeoutsRef = useRef([])

  function clearAllTimeouts() {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
  }

  function go(side) {
    // If a previous attempt set `selected` but navigation didn't happen,
    // allow clicks to re-trigger navigation immediately.
    if (selected) {
      clearAllTimeouts()
      navigate(side === MODES.professional ? '/pro' : '/fun')
      return
    }

    setHovered(null)
    setSelected(side)

    // Let the expand animation complete, then navigate.
    const t = setTimeout(() => {
      navigate(side === MODES.professional ? '/pro' : '/fun')
    }, 420)
    timeoutsRef.current.push(t)
  }

  useEffect(() => {
    return () => clearAllTimeouts()
  }, [])

  // Note: landing should not auto-redirect based on saved mode;
  // it should always let the user choose.

  return (
    <PageTransition>
      <div className="min-h-screen w-full flex overflow-hidden">
        <div className="flex min-h-screen w-full flex-col overflow-hidden md:flex-row">
          {/* Professional (left) */}
          <motion.section
            className="relative flex h-[50vh] w-full cursor-pointer select-none overflow-hidden bg-[#F7F7FB] transition-all duration-300 ease-in-out dark:bg-[#1E1E24] md:h-auto md:w-1/2"
            onMouseEnter={() => !selected && setHovered(MODES.professional)}
            onMouseLeave={() => !selected && setHovered(null)}
            onClick={() => go(MODES.professional)}
            animate={{
              flexGrow: selected
                ? selected === MODES.professional
                  ? 1
                  : 0
                : hovered === MODES.professional
                  ? 1.9
                  : hovered === MODES.fun
                    ? 0.9
                    : 1,
              opacity: selected && selected !== MODES.professional ? 0 : 1,
              scale: !selected && hovered === MODES.professional ? 1.02 : 1,
            }}
            transition={TRANSITION}
            style={{ flexBasis: 0 }}
          >
            {selected && selected !== MODES.professional ? (
              <div className="absolute inset-0 z-20 cursor-default" aria-hidden="true" />
            ) : null}
            <motion.div
              className="pointer-events-none absolute inset-0 ring-1 ring-black/10 dark:ring-white/10"
              animate={{ opacity: !selected && hovered === MODES.professional ? 1 : 0.35 }}
              transition={TRANSITION}
              aria-hidden="true"
            />
            {/* subtle grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.15]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,45,45,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,45,45,0.35)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.30)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.30)_1px,transparent_1px)]" />
            </div>

            <SideContent side={MODES.professional} onCta={() => go(MODES.professional)} />
          </motion.section>

          {/* Fun (right) */}
          <motion.section
            className="relative flex h-[50vh] w-full cursor-pointer select-none overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#FDE2F3] to-[#E0F2FE] transition-all duration-300 ease-in-out dark:from-[#2A1E3F] dark:via-[#3A2A4F] dark:to-[#1E2A3F] md:h-auto md:w-1/2"
            onMouseEnter={() => !selected && setHovered(MODES.fun)}
            onMouseLeave={() => !selected && setHovered(null)}
            onClick={() => go(MODES.fun)}
            animate={{
              flexGrow: selected
                ? selected === MODES.fun
                  ? 1
                  : 0
                : hovered === MODES.fun
                  ? 1.9
                  : hovered === MODES.professional
                    ? 0.9
                    : 1,
              opacity: selected && selected !== MODES.fun ? 0 : 1,
              scale: !selected && hovered === MODES.fun ? 1.02 : 1,
            }}
            transition={TRANSITION}
            style={{ flexBasis: 0 }}
          >
            {selected && selected !== MODES.fun ? (
              <div className="absolute inset-0 z-20 cursor-default" aria-hidden="true" />
            ) : null}
            <motion.div
              className="pointer-events-none absolute inset-0 ring-1 ring-black/10 dark:ring-white/10"
              animate={{ opacity: !selected && hovered === MODES.fun ? 1 : 0.45 }}
              transition={TRANSITION}
              aria-hidden="true"
            />
            {/* soft blur + pastel blobs */}
            <div className="pointer-events-none absolute inset-0 backdrop-blur-xl">
              <motion.div
                className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-purple-300/25 blur-3xl dark:bg-purple-400/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-400/10"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <SideContent side={MODES.fun} onCta={() => go(MODES.fun)} />
          </motion.section>
        </div>
      </div>
    </PageTransition>
  )
}

