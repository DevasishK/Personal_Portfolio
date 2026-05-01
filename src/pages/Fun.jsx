import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import RelationshipStatusDisplay, { STATUSES } from '../components/RelationshipStatusDisplay.jsx'
import FloatingEmojiBurst from '../components/FloatingEmojiBurst.jsx'
import VibeCheckQuiz from '../components/VibeCheckQuiz.jsx'
import MusicVibeModal from '../components/MusicVibeModal.jsx'
import InteractiveTags from '../components/InteractiveTags.jsx'
import MindCloud from '../components/MindCloud.jsx'
import ThoughtTrail from '../components/ThoughtTrail.jsx'
import { MODES, useMode } from '../context/ModeContext.jsx'
import { funData } from '../utils/sampleData.js'
import { postMessage, useMessages } from '../services/api.js'
import { usePerformancePrefs } from '../hooks/usePerformancePrefs.js'

const GalleryLazy = lazy(() => import('../components/Gallery.jsx'))
const TimelineLazy = lazy(() => import('../components/Timeline.jsx'))
const FAQLazy = lazy(() => import('../components/FAQ.jsx'))

function SectionSkeleton({ className = 'h-64' }) {
  return <div className={`w-full animate-pulse rounded-2xl bg-black/5 dark:bg-white/10 ${className}`} />
}

function EasterEgg() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0) // 0 tap, 1 tap, 2 hold
  const [success, setSuccess] = useState(false)
  const [burst, setBurst] = useState(false)
  const controls = useAnimation()
  const [holding, setHolding] = useState(false)
  const holdTimerRef = useRef(null)
  const successRef = useRef(false)

  function wrong() {
    setStep(0)
    setHolding(false)
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    holdTimerRef.current = null
    controls.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.35, ease: 'easeOut' } })
  }

  function celebrate() {
    successRef.current = true
    setSuccess(true)
    setOpen(true)
    setBurst(true)
    setTimeout(() => setBurst(false), 1200)
  }

  return (
    <div>
      <div className="text-sm font-semibold text-zinc-900 dark:text-white">There’s something hidden here 👀</div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">It’s not in plain sight.</p>
      <motion.div animate={controls} className="inline-block">
        <motion.button
          type="button"
          className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 md:w-auto"
          onClick={() => {
            if (successRef.current) {
              setOpen((v) => !v)
              return
            }
            if (step === 0) setStep(1)
            else if (step === 1) setStep(2)
            else wrong()
          }}
          onPointerDown={() => {
            if (successRef.current) return
            if (step !== 2) return
            setHolding(true)
            holdTimerRef.current = setTimeout(() => {
              celebrate()
            }, 520)
          }}
          onPointerUp={() => {
            if (successRef.current) return
            if (step !== 2) return
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
            holdTimerRef.current = null
            setHolding(false)
            wrong()
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 0.98 }}
        >
          Try me
        </motion.button>
      </motion.div>
      {open ? (
        <motion.div
          className="mt-4 rounded-xl border border-black/10 bg-white/60 p-4 text-sm text-gray-800 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/90"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative">
            <FloatingEmojiBurst active={burst} />
            {success ? (
              <>
                <div className="font-semibold">Okay, that was hidden.</div>
                <div className="mt-1 text-sm text-gray-700 dark:text-white/80">You unlocked the secret. Respect.</div>
              </>
            ) : (
              <>
                <div className="font-semibold">Hint</div>
                <div className="mt-1 text-sm text-gray-700 dark:text-white/80">
                  Try: tap, tap, then hold.
                  {holding ? <span className="ml-2">…holding</span> : null}
                </div>
              </>
            )}
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}

function MessageWall() {
  const { messages, loading, refresh } = useMessages()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await postMessage({ name: name.trim() || 'Anonymous', message: message.trim() })
      setMessage('')
      setName('')
      await refresh()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">Message wall</div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Leave a note. (Backed by Supabase when configured.)</p>
        </div>
        <button
          type="button"
          className="min-h-10 w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 sm:w-auto"
          onClick={refresh}
        >
          Refresh
        </button>
      </div>

      <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-3">
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input sm:col-span-2"
          placeholder="Write something nice…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          disabled={submitting}
          className="min-h-10 rounded-lg bg-[#C4B5FD] px-5 py-2 text-sm font-semibold text-[#2D2D2D] transition-all duration-300 ease-in-out hover:bg-[#A78BFA] disabled:opacity-60 sm:col-span-3 dark:bg-white/15 dark:text-white dark:hover:bg-white/20"
          type="submit"
        >
          {submitting ? 'Posting…' : 'Post message'}
        </button>
      </form>

      <div className="mt-5 grid gap-2">
        {loading ? (
          <div className="text-sm text-gray-600 dark:text-gray-400">Loading…</div>
        ) : messages.length ? (
          messages.slice(0, 8).map((m) => (
            <motion.div
              key={m.id}
              className="rounded-xl border border-black/10 bg-white/60 p-4 text-sm text-gray-800 backdrop-blur transition-all duration-300 ease-in-out dark:border-white/10 dark:bg-white/5 dark:text-white/90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="font-medium">{m.name}</div>
              <div className="mt-1 text-gray-700 dark:text-white/80">{m.message}</div>
            </motion.div>
          ))
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-400">No messages yet. Be the first.</div>
        )}
      </div>
    </div>
  )
}

export default function Fun() {
  const { setMode } = useMode()
  const { liteEffects } = usePerformancePrefs()
  const [heroAction, setHeroAction] = useState(null)
  const [heroMessage, setHeroMessage] = useState(null)
  const [vibe, setVibe] = useState(null)
  const [activeTag, setActiveTag] = useState(null)
  const [musicOpen, setMusicOpen] = useState(false)
  const [highlightQuiz, setHighlightQuiz] = useState(false)
  const [showEasterEggHint, setShowEasterEggHint] = useState(false)
  const sideQuestTimersRef = useRef({ show: null, hide: null })

  const [revealFact, setRevealFact] = useState(null)

  useEffect(() => {
    setMode(MODES.fun)
  }, [setMode])

  // Manual single source of truth (you update this in code; it never auto-changes).
  const relationshipStatus = STATUSES.Single

  const data = funData

  const revealFacts = useMemo(
    () => [
      'I sometimes finish entire work in one night',
      'Music helps me think better',
      'I overthink… but it works',
      'I debug faster at night',
    ],
    [],
  )

  const heroFacts = useMemo(
    () => [
      'If a bug survives three fixes, it’s officially a feature.',
      'I collect screenshots of good UI like souvenirs.',
      'My “quick break” is usually a 40-minute side quest.',
      'I can’t walk past good lighting without taking a photo.',
    ],
    [],
  )

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function setAction(key) {
    setHeroAction(key)
    setActiveTag(key)
    if (key === 'music') {
      setHeroMessage(null)
      setVibe(null)
      setMusicOpen(true)
      return
    }
    if (key === 'tea') {
      setHeroMessage(null)
      setVibe('tea')
      return
    }
    if (key === 'side_quests') {
      setVibe(null)
      setHeroMessage('Side quest unlocked. Go find the hidden thing 👀')
      // Scroll first; show hint right after scroll starts to avoid jank.
      window.requestAnimationFrame(() => {
        scrollTo('playground')
        if (sideQuestTimersRef.current.show) window.clearTimeout(sideQuestTimersRef.current.show)
        if (sideQuestTimersRef.current.hide) window.clearTimeout(sideQuestTimersRef.current.hide)
        sideQuestTimersRef.current.show = window.setTimeout(() => setShowEasterEggHint(true), 140)
        sideQuestTimersRef.current.hide = window.setTimeout(() => setShowEasterEggHint(false), 2200)
      })
      return
    }
    if (key === 'photos') {
      setVibe(null)
      setHeroMessage('Taking you to the gallery ↓')
      scrollTo('gallery')
      return
    }
    if (key === 'curious') {
      setVibe(null)
      setHeroMessage(heroFacts[Math.floor(Math.random() * heroFacts.length)])
    }
  }

  function handleMusicClose() {
    setMusicOpen(false)
    setActiveTag(null)
  }

  const contextText = useMemo(() => {
    if (activeTag === 'tea') return 'so… is that a yes for a tea date? 😉'
    if (activeTag === 'curious') return 'Curious, huh? I like that.'
    if (activeTag === 'music') return 'If you’ve got taste… we’ll get along 🎧'
    if (activeTag === 'photos') return 'If you love photos, scroll down—there are some good ones.'
    if (activeTag === 'side_quests') return 'Side quests are where the fun hides.'
    return heroMessage
  }, [activeTag, heroMessage])

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero */}
        <section className="relative w-full">
          <div className="relative">
            {/* background + system layer */}
            <div className="relative grid min-h-screen grid-cols-12 items-center overflow-visible px-4 py-16 sm:px-6 md:px-10">
            {/* depth layers (theme-adaptive, no boxes) */}
            <div
              className="pointer-events-none absolute inset-0 bg-transparent dark:bg-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:22px_22px] dark:opacity-[0.06]"
              aria-hidden="true"
            />
            <div
              className={[
                'pointer-events-none absolute -right-24 top-12 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-orange-400/14 via-pink-400/10 to-purple-400/10 dark:from-orange-400/18 dark:via-pink-400/14 dark:to-purple-400/14',
                liteEffects ? 'opacity-35 blur-2xl' : 'blur-3xl',
              ].join(' ')}
              aria-hidden="true"
            />

            {/* left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative z-10 col-span-12 md:col-span-7"
            >
              <p className="mb-2 text-sm font-medium text-orange-500">Fun mode</p>

              <h1 className="text-6xl font-bold leading-tight text-zinc-900 dark:text-white md:text-7xl">
                Devasish Viswanadh Kolla <span className="text-2xl">😊</span>
              </h1>

              <p className="mt-4 max-w-xl text-lg text-zinc-700 dark:text-white/80">
                Not everything about me fits in a resume.
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">There’s more if you’re curious 👇</p>

              <div className="mt-7">
                <InteractiveTags activeId={activeTag} onSelect={setAction} />
              </div>

              {contextText ? (
                <motion.p
                  key={`${activeTag ?? 'none'}-${contextText}`}
                  className="mt-5 max-w-xl text-sm text-zinc-700 dark:text-white/80"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {contextText}
                </motion.p>
              ) : null}

              <p className="mt-8 text-sm text-zinc-500 dark:text-white/70">— Devasish, probably overthinking this UI 😅</p>
            </motion.div>

            {/* right visual system (bigger, no clipping) */}
            <div className="relative col-span-12 mt-12 flex justify-center overflow-visible md:col-span-5 md:mt-0 md:justify-center md:pr-10">
              <div className="relative mx-auto h-[660px] w-[660px] max-w-[92vw] overflow-visible md:mx-0 md:h-[700px] md:w-[700px]">
                <MindCloud imageSrc="/PHOTO-2026-05-02-02-26-40.jpg" fallbackText="DVK" />
                <ThoughtTrail activeId={activeTag} className="absolute inset-0" />
              </div>
            </div>
          </div>
          </div>

          {/* Quick info: visible on load (not below the fold) */}
          {data.personalInfo ? (
            <motion.div
              className="pointer-events-none absolute bottom-8 left-4 z-10 sm:left-6 md:left-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
            >
              <div className="pointer-events-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-700 dark:text-white/80">
                <span className="font-semibold text-zinc-900 dark:text-white">Quick info:</span>
                <span>🎧 {data.personalInfo.listening}</span>
                <span className="text-zinc-400 dark:text-white/50">•</span>
                <span>🍜 {data.personalInfo.food}</span>
                <span className="text-zinc-400 dark:text-white/50">•</span>
                <span>⚡ {data.personalInfo.funFact}</span>
              </div>
            </motion.div>
          ) : null}
        </section>

        {/* Gallery */}
        <section id="gallery" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            <div className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Gallery</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#4B3F72] dark:text-white md:text-4xl">
                Photo drops
              </h2>
              <p className="mt-3 text-base text-[#5A5A7A] dark:text-zinc-300 md:text-lg">A few moments I liked enough to keep.</p>
            </div>
            <div className="mt-10">
              <Suspense fallback={<SectionSkeleton className="h-80" />}>
                <GalleryLazy items={data.gallery} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Personality Playground */}
        <section id="playground" className="w-full border-t border-black/5 py-10 dark:border-white/10 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div
              className={[
                'relative overflow-hidden rounded-3xl border border-black/10 px-4 py-10 dark:border-white/10 sm:px-6 md:px-10 md:py-16',
                liteEffects
                  ? 'bg-white/70 dark:bg-white/5'
                  : 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/40 dark:via-black dark:to-blue-900/40',
              ].join(' ')}
            >
              <div className="pointer-events-none absolute inset-0">
                {liteEffects ? null : (
                  <>
                    <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-purple-300/16 blur-3xl" />
                    <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-pink-300/16 blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-300/16 blur-3xl" />
                  </>
                )}
              </div>

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#4B3F72] dark:text-white md:text-4xl">
                  Things you’ll only find here 😄
                </h2>
                <p className="mt-3 max-w-2xl text-base text-[#5A5A7A] dark:text-zinc-300 md:text-lg">
                  Not everything about me fits in a resume.
                </p>

                <div className="mt-10 grid gap-10 md:grid-cols-2">
                  <div className="space-y-8">
                    <div
                      className={[
                        'rounded-3xl transition-all duration-300 ease-out',
                        highlightQuiz
                          ? 'ring-2 ring-purple-400/50 ring-offset-2 ring-offset-white/40 dark:ring-purple-300/40 dark:ring-offset-black/20'
                          : '',
                      ].join(' ')}
                    >
                      <VibeCheckQuiz />
                    </div>
                    <AnimatePresence initial={false}>
                      {showEasterEggHint ? (
                        <motion.div
                          key="sidequest-hint"
                          className="rounded-2xl border border-black/10 bg-white/70 p-3 text-sm font-medium text-[#4B3F72] shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-zinc-200"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.99 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                          Side quest hint: tap, tap, then hold 😄
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <EasterEgg />
                  </div>
                  <div className="flex items-center justify-center">
                    <RelationshipStatusDisplay status={relationshipStatus} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            <div className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Timeline</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#4B3F72] dark:text-white md:text-4xl">
                Activities
              </h2>
              <p className="mt-3 text-base text-[#5A5A7A] dark:text-zinc-300 md:text-lg">
                A few highlights from my off-screen life.
              </p>
            </div>
            <div className="mt-10">
              <Suspense fallback={<SectionSkeleton className="h-72" />}>
                <TimelineLazy items={data.timeline} variant="fun" />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Story + achievements */}
        <section className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:px-10">
            <div>
              <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Story</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#4B3F72] dark:text-white md:text-4xl">
                Personal story
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#5A5A7A] dark:text-zinc-300">
                {data.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Achievements</div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#4B3F72] dark:text-white">Small wins</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.achievements.map((a) => (
                  <span
                    key={a.title}
                    className="inline-flex items-center rounded-full border border-black/10 bg-white/40 px-3 py-2 text-sm font-medium text-[#5A5A7A] backdrop-blur dark:border-white/10 dark:bg-black/20 dark:text-zinc-200"
                    title={a.note}
                  >
                    {a.title}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-sm text-[#5A5A7A] dark:text-zinc-300">
                Hover/tap a badge to see the note.
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            <div className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">FAQ</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#4B3F72] dark:text-white md:text-4xl">
                The questions friends ask
              </h2>
            </div>
            <div className="mt-8">
              <Suspense fallback={<SectionSkeleton className="h-72" />}>
                <FAQLazy items={data.faq} variant="fun" />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Message wall */}
        <section className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            <MessageWall />
          </div>
        </section>

        <motion.div
          className="py-10 text-center text-xs text-zinc-500 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>Built with logic, maintained with curiosity.</div>
          <div className="mt-1">Somewhere between debugging and overthinking.</div>
          <div className="mt-1">Not always productive, but always building something.</div>
        </motion.div>
      </div>

      {musicOpen ? <MusicVibeModal open={musicOpen} onClose={handleMusicClose} /> : null}
    </PageTransition>
  )
}

