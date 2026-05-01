import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { QUESTION_POOL } from '../utils/vibeCheckQuestions.js'

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickUnique(arr, k) {
  return shuffle(arr).slice(0, k)
}

function selectQuestions(pool) {
  const totalCount = randInt(5, 7)
  const factCount = randInt(1, 2)

  const facts = pool.filter((q) => q.type === 'fact')
  const personality = pool.filter((q) => q.type === 'personality')

  const selectedFacts = pickUnique(facts, Math.min(factCount, facts.length))
  const selectedPersonality = pickUnique(personality, Math.min(totalCount - selectedFacts.length, personality.length))

  return shuffle([...selectedFacts, ...selectedPersonality])
}

function resultMessage(percent) {
  if (percent > 80) return 'You get me better than expected 😏'
  if (percent >= 80) return 'We’d probably get along way too well 😏'
  if (percent >= 60) return 'Solid vibe. Coffee is on you ☕'
  if (percent >= 40) return 'We’d argue… but it’d be fun 😄'
  return 'This might be chaotic… I’m curious 👀'
}

export default function VibeCheckQuiz() {
  const [screen, setScreen] = useState('start') // start | quiz | result
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [percent, setPercent] = useState(0)

  const current = questions[idx]
  const progressLabel = useMemo(() => {
    const total = questions.length
    if (!total) return ''
    return `Question ${Math.min(idx + 1, total)} of ${total}`
  }, [idx, questions.length])

  function start() {
    const selectedQuestions = selectQuestions(QUESTION_POOL)
    setQuestions(selectedQuestions)
    setIdx(0)
    setSelected(null)
    setScore(0)
    setMaxScore(selectedQuestions.reduce((sum, q) => sum + q.weight, 0))
    setPercent(0)
    setScreen('quiz')
  }

  function restart() {
    setScreen('start')
    setQuestions([])
    setIdx(0)
    setSelected(null)
    setScore(0)
    setMaxScore(0)
    setPercent(0)
  }

  function answer(opt) {
    if (!current) return
    if (selected) return
    setSelected(opt)

    const w = current.weight
    const add = opt === current.correct ? w : w * 0.5
    const nextScore = score + add

    const isLast = idx + 1 >= questions.length
    const nextPercent = maxScore ? Math.round((nextScore / maxScore) * 100) : 0

    setTimeout(() => {
      setScore(nextScore)
      setPercent(nextPercent)
      setSelected(null)
      if (isLast) {
        setScreen('result')
      } else {
        setIdx((i) => i + 1)
      }
    }, 220)
  }

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        {screen === 'start' ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">Vibe Check Quiz</div>
            <div className="mt-2 text-base text-[#5A5A7A] dark:text-zinc-300">Start the vibe check 😏</div>
            <button
              type="button"
              onClick={start}
              className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#C4B5FD] px-5 py-2 text-sm font-semibold text-[#2D2D2D] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#A78BFA] dark:bg-white/15 dark:text-white dark:hover:bg-white/20 sm:w-auto"
            >
              Start
            </button>
          </motion.div>
        ) : null}

        {screen === 'quiz' && current ? (
          <motion.div
            key={`q-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{progressLabel}</div>
            <div className="mt-3 text-balance text-xl font-semibold text-zinc-900 dark:text-white md:text-2xl">
              {current.question}
            </div>

            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {current.options.map((opt) => {
                const isSelected = selected === opt
                return (
                  <motion.button
                    key={opt}
                    type="button"
                    onClick={() => answer(opt)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={[
                      'min-h-11 w-full rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out dark:border-white/20 sm:w-auto',
                      isSelected ? 'bg-purple-300 text-white dark:bg-purple-600' : 'bg-white text-gray-800 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
                    ].join(' ')}
                  >
                    {opt}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ) : null}

        {screen === 'result' ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">Result</div>
            <div className="mt-3 text-3xl font-bold tracking-tight text-[#4B3F72] dark:text-white">
              You’re {percent}% my vibe 😄
            </div>
            <div className="mt-3 text-base text-[#5A5A7A] dark:text-zinc-300">{resultMessage(percent)}</div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={start}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#C4B5FD] px-5 py-2 text-sm font-semibold text-[#2D2D2D] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#A78BFA] dark:bg-white/15 dark:text-white dark:hover:bg-white/20 sm:w-auto"
              >
                Run it back
              </button>
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 ease-out hover:bg-gray-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:w-auto"
              >
                Close
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

